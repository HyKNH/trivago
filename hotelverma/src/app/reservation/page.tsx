"use client";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import React, { useState, useEffect} from "react";
import { RiStarSFill } from "react-icons/ri";
import { useRouter } from 'next/router';



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
  const rating = 3; // For now, set to a fixed value. Later, will fetch this from the database.
  
  //importing room data
  const router = useRouter();
  const { hotelId } = router.query;
  const [hotel, setHotel] = useState<Hotel | null>(null);

  
 
  


  // Create an array of size 'rating' using the Array constructor.
  // Then, use .fill() to assign a star icon to each element in the array.
  // This means, if 'rating' is 2, the array will contain two <RiStarSFill/> components.
  const stars = Array(rating).fill(<RiStarSFill />);

  const [cardNumber, setCardNumber] = useState(""); // User card input
  const [message, setMessage] = useState(""); // Message to display
  const [showMessage, setShowMessage] = useState(false); // When to display message

  
  // Function to handle card input
  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCardNumber(inputValue);
    
    //check to see if card is 16 digits long
    if (inputValue.length <16){
      setMessage("Card Number must be 16-digits long")
      setShowMessage(true);
    }

    else if (inputValue.length === 16){
      setMessage("");//
    }

  };
  
  // Function to handle form submission
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from reloading the page

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);

   // console.log(payload);// to check all data from form was extracted correctly 

    const firstSixDigits = cardNumber.slice(0, 6);
    if (!BIN.includes(firstSixDigits)) {
      setMessage("Payment failure. Please Try Again");
      setShowMessage(true);
      return;
    } 
     //generates a random number from 10,000 - 90,000
    const conFirNum = Math.floor(Math.random() * 90000) + 10000;
    console.log(conFirNum);
     
    //add conFirNum to payload for sending to back end
    payload.conFirmNum = conFirNum.toString();

    //console.log(payload);
  }

  return (
    <div className="px-6">
      <div className="shadow-xl">
        <Image
          width="full"
          height={300}
          src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
        />
      </div>
      <hr className="w-full border-black mt-5" />
      <h1 className="mt-2 text-4xl">Conrad Las Vegas at Resorts World</h1>
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
          />
          <Input 
            isRequired
            label="Check out"
            type="date"
            labelPlacement="outside"
            required
            size="md"
            name="checkOut"
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
            name="fname"
          />
          <Input
            isRequired
            label="Last Name"
            type="text"
            placeholder="ex: Jones"
            required
            labelPlacement="outside"
            name="lname"
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
            name="tel"
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

        <div className="border w-2/4 flex h-fit flex-wrap border-2 rounded-md shadow-xl justify-between p">
          <h1 className="text-xl text-semibold w-full">Price Details</h1>
          <h2 className="w-1/2 pt-5">1 night:</h2>
          <h2 className="pr-2 pt-5">168.00</h2>
          <h3 className="w-full pl-3">$168 per night</h3>
          <h2 className="pt-5 w-1/2">Taxes and Fees:</h2>
          <h2 className="pr-2 pt-5">22.00</h2>
          <hr className="w-full border-black mt-5" />
          <h1 className="w-1/2">Total: </h1>
          <h1>$190.00</h1>
        </div>
      </div>
    </div>
  );
}
