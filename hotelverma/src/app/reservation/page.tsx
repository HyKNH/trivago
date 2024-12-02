"use client";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import {useEffect, useState} from "react";
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";
import {router} from "next/client";


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

export default function Reservation() {
  const [cardNumber, setCardNumber] = useState(""); // User card input
  const [message, setMessage] = useState(""); // Message to display
  const [showMessage, setShowMessage] = useState(false); // When to display message
  const [hotel, setHotel] = useState<Hotel | undefined>(undefined);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numNights, setNights] = useState(1);
  const  [dateError, setDateError] = useState("");
  const [showError, setShowError] = useState(false);

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  

  const rating = hotel?.rating;
  // Create an array of size 'rating' using the Array constructor.
  // Then, use .fill() to assign a star icon to each element in the array.
  // This means, if 'rating' is 2, the array will contain two <RiStarSFill/> components.
  const stars = Array(rating).fill(<RiStarSFill className="text-yellow-400" />);

  // Function to handle card input
  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCardNumber(inputValue);
    if (inputValue.length <16){
      setMessage("Card Number must be 16-digits long")
      setShowMessage(true);
    }

    else if (inputValue.length === 16){
      setMessage("");//
    }
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "checkIn") {
      setStartDate(value);
    } else if (name === "checkOut") {
      setEndDate(value);
    }

   
  };


  const calculateDays = () =>{
    if (startDate && endDate){
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      const diffTime = end.getTime() - start.getTime();
      const nights = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setNights(nights);
    }
  }

  useEffect(() => {
    if (startDate && endDate){
      const start = new Date (startDate);
      const end = new Date(endDate);
      if (end < start) {
        setDateError("End date must come after start date");
        setShowError(true);
        setNights(1);
        return;
      } else if (end > start){
        setDateError("")
      }
      calculateDays();
    }
  },[startDate, endDate]);

  // Function to get the right room
  useEffect(() => {
    const url = window.location.href
    const newurl = url.slice(42)
    const fetchroom = async () => {
      try {
        const response = await axios.get(`/reservation/api?id=${newurl}`)
        const data = response.data
        setHotel(data.hotel)
        console.log(hotel)
      } catch (e) {
        console.error("Error fetching hotels:", e);
      }
    }
    fetchroom()
  }, []);

  const calculateTotal = () => {
    if (hotel?.price && numNights) {
      const roomTotal = hotel.price * numNights;
      const tax = 0.12
      const taxTotal = roomTotal * tax;
      const total = roomTotal + taxTotal;
      return total;
    }
    return 0;
  }

  const calulateRoomT = () =>{
      if (hotel?.price && numNights) {
        return hotel.price * numNights;
      }
      return hotel?.price;
  }
  
  

  // Function to handle form submission
  const submitForm =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from reloading the page

   // const hotelName = hotel?.title;
    const firstSixDigits = cardNumber.slice(0, 6);
    if (BIN.includes(firstSixDigits)) {
      const formData = new FormData(e.target as HTMLFormElement);
      const payload = Object.fromEntries(formData) as Record<string, string | undefined>;
      payload.checkInDate = payload.checkIn;  // Convert to ISO string for storage
      payload.checkOutDate = payload.checkOut;
      const conFirNum = Math.floor(Math.random() * 90000) + 10000;
      payload.confirmationNumber = conFirNum.toString();
      payload.hotelId = hotel?._id
      const token = getAuthToken()
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await axios.post(
            '/reservation/api',
            payload,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response)
      } catch (e) {
        console.log("error:", e);
      }
      console.log(payload);
    }   
    else {
      setMessage("Sorry BIN number is invalid");
      setShowMessage(true);
      return;
    }

  }




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
        <h2>{hotel ? hotel.location : 'Loading location...'}</h2>
        <h3>{hotel ? hotel.amenities : 'Loading amenities...'}</h3>
        <div className="flex pt-3 pl-3">
          {stars.map((star, index) => (
              <div key={index}>{star}</div>
          ))}
        </div>
        <div className="pt-5 flex flex-wrap">
          <h1 className="mb-3 text-2xl w-full">Secure your Room</h1>
          <form className="space-y-9 px-20 w-2/4" onSubmit={submitForm}>
            <h2>Date for reservation</h2>
            <Input
                isRequired
                label="Check In"
                type="date"
                labelPlacement="outside"
                required
                size="md"
                name="checkIn"
                onChange={handleDateInput}
                value={startDate}
            />
            <Input
                isRequired
                label="Check out"
                type="date"
                labelPlacement="outside"
                required
                size="md"
                name="checkOut"
                onChange={handleDateInput}
                value={endDate}
            />
            {showError && <p className="text-red-500">{dateError}</p>}
            <h2>Name for reservation</h2>
            <Input
                isRequired
                label="First Name"
                type="text"
                placeholder="ex: John"
                required
                labelPlacement="outside"
                size="md"
                name="firstname"
            />
            <Input
                isRequired
                label="Last Name"
                type="text"
                placeholder="ex: Jones"
                required
                labelPlacement="outside"
                name="lastname"
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
                pattern="\d{16}"
               inputMode="numeric"
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
            <h2 className="w-1/2 pt-5">Number of nights: {numNights}</h2>
            <h2 className="pt-5">${calulateRoomT()}</h2>
            <h3 className="w-full pl-3">${hotel?.price} per night</h3>
            <h2 className="pt-5 w-1/2">Taxes and Fees:</h2>
            <h2 className="pr-2 pt-5">%12</h2>
            <hr className="w-full border-black mt-5" />
            <h1 className="w-1/2">Total:</h1>
            <h1>${calculateTotal()}</h1>
          </div>
        </div>
      </div>
  );
}
