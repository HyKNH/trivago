"use client";
import {useEffect, useState, useMemo} from "react";
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { DateRangePicker, Image, Input, Card, Divider, Button, Spacer } from "@nextui-org/react";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";


type Hotel = {
  _id: string;
  title: string;
  location: string;
  amenities: string[];
  image: string;
  price: number;
  rating: number;
  roomType: string;
};

type Range = { start: DateValue; end: DateValue };

/**
 * # Module: Reservation 
 *
 * ## Date:
 * November 25, 2024
 *
 * ## Programmer:
 * Joshua guzman
 *
 * ## Description:
 * `Reservation` is a page that will have a form and details for hotel this page is for users to fill out form and 
 * then submit form and if successful make reservation for user
 *
 * ## Important Functions:
 * - **Reservation** (default export):
 *   - **Input**: None
 *   - **Output**: JSX.Element
 *   - **Description**:
 *     Creates a responsive layout with two main sections:
 *     1. A **form section**:
 *        - requires: date, First name, Last name, email, phone number, card infomation.
 *     2. A **Pricing details**:
 *        - Displays the price per night, tax, then total for stay .
 *
 * ## Data Structures:
 * - **Dictionary**: 
 *   - objects in js implement dictionaries.
 *    - payload 
 *    - form
 *
 * ## Algorithms Used:
 * - **Luhn**:
 *   - takes digits doubles every ohther except last digit then adds them and if sum is a multiple of 10 then card valid
 *   - **Reason**: choose it as its a common algorithm used in the industry for checking user card input
 */

export default function Reservation() {
  const [cardNumber, setCardNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [hotel, setHotel] = useState<Hotel | undefined>(undefined)
  const [dateRange, setDateRange] = useState<Range | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const router = useRouter();
  // Memoized array of stars based on the hotel's rating.
  const stars = useMemo(() => Array(hotel?.rating || 0).fill(<RiStarSFill className="text-yellow-400" />), [hotel?.rating]);
  // separates digits into groups of 4 for user 
  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); 
    if (input.length <= 16) {
      input = input.replace(/(\d{4})(?=\d)/g, '$1 '); 
    } 
    setCardNumber(input);
    setMessage("");
  };
 //adds the "/"" to date after user type in the fist two number
  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }

    setExpirationDate(value);
  };
  // format the phone number to 111 1111 111
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1 $2');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1 $2 $3');
    }

    setPhoneNumber(value);
  };
// use effect to get hotel info
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const reservationId = params.get('hotelId'); 
  
      const fetchroom = async () => {
        try {
          if (reservationId) {
            const response = await axios.get(`/api/reservationRoute?id=${reservationId}`);
            const data = response.data;
            setHotel(data.hotel);
          } else {
            console.error("Reservation ID not found in the URL");
          }
        } catch (e) {
          console.error("Error fetching hotels:", e);
        }
      };
  
      fetchroom();
    }
  }, []);
// fucntion that implements luhn algorithm
  const isValidCardNumber = (cardNumber: string): boolean => {
    const digits = cardNumber.split("").map(Number);
    const temp = digits
    .map((e,i,arr) => (i % 2 === 0 && i !== arr.length-1) ? e * 2 : e)
    .reduce((a,e) => (e > 9) ? (Math.floor(e/10) + e%10) + a: e +a)
    return temp % 10 === 0;
  };
//handler function for form submmision
  const submitForm =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if user is logged in if not send to log in page
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login');
      return;
    }

    const cardNumberWithoutSpaces = cardNumber.split(' ').join('');//remove white space from card input
    //check  user input using luhn algo
    if (isValidCardNumber(cardNumberWithoutSpaces)) {
      const formData = new FormData(e.target as HTMLFormElement);// get form inputs 
      const payload = Object.fromEntries(formData) as Record<string, string |undefined>;//create payload object to hold reservation details

      const conFirNum = Math.floor(Math.random() * 90000) + 10000;//generate confimation number
      payload.confirmationNumber = conFirNum.toString() //convert to string as payload is of type string
      payload.hotelId = hotel?._id;// add hotel id to payload
      // change dats to ISO(Year, month, day , hour,min, sec, ms)
      if (dateRange) {
        payload.checkInDate = dateRange.start.toDate(getLocalTimeZone()).toISOString();
        payload.checkOutDate = dateRange.end.toDate(getLocalTimeZone()).toISOString();
      }
       // http post req to make reservation for user 
     try {
        const response = await axios.post(
          "/api/reservationRoute",
          payload,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log(response);
      } catch (e) {
        console.log("error:", e);
      }

     router.push(`/confirmation?confirmationNumber=${conFirNum}`);
    } else {
      setMessage("Invalid Card Number");
      setShowMessage(true);
      return;
    }
  }
// a useMemo for dynamically changing the price for stay
  const calculateNumOfNights = useMemo(() => {
    if (dateRange) {
      const { start, end } = dateRange;
      const diffTime = end.toDate(getLocalTimeZone()).getTime() - start.toDate(getLocalTimeZone()).getTime();
      const daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return daysDiff > 0 ? daysDiff : 1;
    }
    return 1;
  }, [dateRange]);
  //calulate tax
  const totalBeforeTax = useMemo(() => {
    return calculateNumOfNights * (hotel?.price || 1);
  },[calculateNumOfNights, hotel?.price]);
// calculated tax to dispaly 
  const taxes = useMemo (() => {
    const totaltax = totalBeforeTax * 0.12;
    return Math.floor(totaltax)
  },[totalBeforeTax]);
//calculate total with taxes 
  const completeTotal = useMemo(() => {
    const total = totalBeforeTax + taxes;
    return Math.floor(total);
  },[totalBeforeTax, taxes]);

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-8">
    {/* Left Section - Reservation Form */}
    <div className="w-full md:w-2/4 px-6">
      <h1 className="mb-3 text-2xl font-bold">Reserve your Room</h1>
      <form className="space-y-9" onSubmit={submitForm}>
        <h2>Date for reservation</h2>
        <DateRangePicker
          isRequired
          label="Select check-in and check-out dates"
          value={dateRange}
          minValue={today(getLocalTimeZone())}
          onChange={(range) => setDateRange(range ? { start: range.start, end: range.end } : null)}
        />
        <h2>Name for reservation</h2>
        <Input
          isRequired
          label="First Name"
          type="text"
          placeholder="ex: John"
          required
          labelPlacement="outside"
          size="md"
          name="firstName"
        />
        <Input
          isRequired
          label="Last Name"
          type="text"
          placeholder="ex: Doe"
          required
          labelPlacement="outside"
          name="lastName"
        />
        <h2>Contact info</h2>
        <Input
          isRequired
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          fullWidth
          aria-label="Email"
          labelPlacement="outside"
          name="email"
        />
        <Input
          isRequired
          type="tel"
          label="Phone Number"
          placeholder="Enter your phone number"
          labelPlacement="outside"
          required
          value={phoneNumber}
          onChange={handlePhoneInputChange}
          maxLength={12}
          startContent={<span>+1</span>}
          name="telephone"
        />
        <h2>Payment</h2>
        <Input
          isRequired
          label="Card Number"
          type="text"
          placeholder="ex: 4342 5624 1234 9087"
          required
          labelPlacement="outside"
          size="md"
          value={cardNumber}
          onChange={handleCardInput}
          maxLength={19}
        />
        {showMessage && <div className="text-red-500">{message}</div>}
        <div className="flex gap-2">
          <Input
            isRequired
            label="Expiration Date"
            labelPlacement="outside"
            placeholder="MM/YY"
            required
            size="md"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            maxLength={5}
            className="w-1/2"
          />
          <Input
            isRequired
            label="CVV"
            labelPlacement="outside"
            placeholder="132"
            required
            size="md"
            className="w-1/2"
            maxLength={3}
          />
        </div>
          <Button type="submit" color="success" variant="bordered">
            Complete Reservation
          </Button>
      </form>
      <Spacer y={8}></Spacer>
    </div>
  
    {/* Right Section - Hotel Information and Price */}
    <div className="w-full md:w-2/4 px-6 mt-6 md:mt-0">
      <div className="shadow-xl mb-5">
        <Card>
          <Image
            width="100%"
            height={300}
            src={hotel?.image}
            alt="Hotel Verma"
          />
        </Card>
      </div>
      <Divider className="my-4" />
      <h1 className="mt-2 text-4xl">{hotel?.title}</h1>
      <h2>{hotel?.location}</h2>
      <h3>{hotel?.roomType}</h3>
      <h3>{hotel?.amenities.join(", ")}</h3>
      <div className="flex pt-3 pl-1">
        {stars.map((star, index) => (
          <div key={index}>{star}</div>
        ))}
      </div>
  
      <div className="border w-full mt-6 p-5 rounded-md shadow-xl">
        <h1 className="text-xl font-semibold">Price Details</h1>
        <div className="flex justify-between mt-5">
          <h2>Number of Nights: {calculateNumOfNights}</h2>
          <h2>${totalBeforeTax}</h2>
        </div>
        <h3>{hotel?.price} per night</h3>
        <div className="flex justify-between mt-5">
          <h2>Taxes and Fees:</h2>
          <h2>${taxes}</h2>
        </div>
        <hr className="w-full mt-5" />
        <div className="flex justify-between mt-5">
          <h1>Total:</h1>
          <h1 className="text-red-600">${completeTotal}</h1>
        </div>
      </div>
    </div>
  </div>
  );
}