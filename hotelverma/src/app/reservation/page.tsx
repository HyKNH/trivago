"use client";
import {useEffect, useState, useMemo} from "react";
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { DateRangePicker, Image, Input, Card, Divider, Button, Spacer } from "@nextui-org/react";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";

const BIN = ['434256', '481592', '483312'];

type Hotel = {
  _id: string;
  title: string;
  location: string;
  amenities: string[];
  image: string;
  price: number;
  rating: number;
};

type Range = { start: DateValue; end: DateValue };

export default function Reservation() {
  const [cardNumber, setCardNumber] = useState(""); // User card input
  const [message, setMessage] = useState(""); // Message to display
  const [showMessage, setShowMessage] = useState(false); // When to display message
  const [hotel, setHotel] = useState<Hotel | undefined>(undefined)
  const [dateRange, setDateRange] = useState<Range | null>(null);
  const router = useRouter();

  const stars = useMemo(() => Array(hotel?.rating || 0).fill(<RiStarSFill className="text-yellow-400" />), [hotel?.rating]);


  // Function to handle card input
  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
    setMessage(""); // Reset message while typing
  };

  // Function to get the right room
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const reservationId = params.get('hotelId'); // Get 'id' query parameter from the URL
  
      const fetchroom = async () => {
        try {
          if (reservationId) {
            const response = await axios.get(`/reservation/api?id=${reservationId}`);
            const data = response.data;
            setHotel(data.hotel);
            console.log("Fetched hotel data:", data.hotel); // Log fetched data directly
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

  // Function to handle form submission
  const submitForm =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from reloading the page

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login');
      return;
    }

    const firstSixDigits = cardNumber.slice(0, 6);
    if (BIN.includes(firstSixDigits)) {
      const formData = new FormData(e.target as HTMLFormElement);
      const payload = Object.fromEntries(formData) as Record<string, string |undefined>;

      const conFirNum = Math.floor(Math.random() * 90000) + 10000;
      payload.confirmationNumber = conFirNum.toString()
      payload.hotelId = hotel?._id;

      if (dateRange) {
        payload.checkInDate = dateRange.start.toDate(getLocalTimeZone()).toISOString();
        payload.checkOutDate = dateRange.end.toDate(getLocalTimeZone()).toISOString();
      }
      try {
        const response = await axios.post(
          "/reservation/api",
          payload,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        console.log(response);
      } catch (e) {
        console.log("error:", e);
      }

      router.push(`/confirmation?confirmationNumber=${conFirNum}`);
    } else {
      setMessage("Sorry BIN number is invalid");
      setShowMessage(true);
      return;
    }
  }

  const calculateNumOfNights = useMemo(() => {
    if (dateRange) {
      const { start, end } = dateRange;
      const diffTime = end.toDate(getLocalTimeZone()).getTime() - start.toDate(getLocalTimeZone()).getTime();
      const daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return daysDiff > 0 ? daysDiff : 1;
    }
    return 1;
  }, [dateRange]);
  
  const totalBeforeTax = useMemo(() => {
    return calculateNumOfNights * (hotel?.price || 1);
  },[calculateNumOfNights, hotel?.price]);

  const taxes = useMemo (() => {
    const totaltax = totalBeforeTax * 0.12;
    return Math.floor(totaltax)
  },[totalBeforeTax]);

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
          startContent={<span>+1</span>}
          name="telephone"
        />
        <h2>Payment</h2>
        <Input
          isRequired
          label="Card Number"
          type="text"
          placeholder="ex: 4342562412349087"
          required
          labelPlacement="outside"
          size="md"
          value={cardNumber}
          onChange={handleCardInput}
          maxLength={16}
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
      <h3>{hotel?.amenities.join(", ")}</h3>
      <div className="flex pt-3 pl-3">
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
          <h1>${completeTotal}</h1>
        </div>
      </div>
    </div>
  </div>
  );
}