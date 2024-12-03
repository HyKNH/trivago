"use client";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import {useEffect, useState, useMemo} from "react";
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { DateRangePicker } from "@nextui-org/react";
import { DateValue } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";

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
      return totalBeforeTax * 0.12;
  },[totalBeforeTax]);

    const completeTotal = useMemo(() => {
      return totalBeforeTax + taxes;
    },[totalBeforeTax, taxes]);

  return (
      <div className="px-6">
        <div className="shadow-xl">
          <Image
              width="full"
              height={300}
              src={hotel?.image}
              alt="Hotel Verma"
          />
        </div>
        <hr className="w-full border-black mt-5" />
        <h1 className="mt-2 text-4xl">{hotel?.title}</h1>
        <h2>{hotel?.location}</h2>
        <h3>{hotel?.amenities.join(", ")}</h3>
        <div className="flex pt-3 pl-3">
          {stars.map((star, index) => (
              <div key={index}>{star}</div>
          ))}
        </div>
        <div className="pt-5 flex flex-wrap">
          <h1 className="mb-3 text-2xl w-full">Secure your Room</h1>
          <form className="space-y-9 px-20 w-2/4" onSubmit={submitForm}>
            <h2>Date for reservation</h2>
            <DateRangePicker
              label="Select your dates"
              value={dateRange}
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
                placeholder="ex: Jones"
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
                label="Card Digits"
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
            <button type="submit" className="border-1 border-stone-600 p-2 rounded-xl">
              Finish
            </button>
          </form>

          <div className="border w-2/4 flex h-fit flex-wrap border-2 rounded-md shadow-xl justify-between p-2">
            <h1 className="text-xl text-semibold w-full">Price Details</h1>
            <h2 className="w-1/2 pt-5">Number of Nights: {calculateNumOfNights}</h2>
            <h2 className="pr-2 pt-5">${totalBeforeTax}</h2>
            <h3 className="w-full pl-3">${hotel?.price} per night</h3>
            <h2 className="pt-5 w-1/2">Taxes and Fees:</h2>
            <h2 className="pr-2 pt-5">${taxes}</h2>
            <hr className="w-full border-black mt-5" />
            <h1 className="w-1/2">Total: </h1>
            <h1>${completeTotal}</h1>
          </div>
        </div>
      </div>
  );
}