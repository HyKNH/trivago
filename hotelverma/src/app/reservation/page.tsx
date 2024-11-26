"use client";
import {Image} from "@nextui-org/image";
import {Input} from "@nextui-org/input"
import { useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import Calendar from "../components/Calendar";




export default function reservation() {
   const rating = 3;  // For now, set to a fixed value. Later, will fetch this from the database.


   // Create an array of size 'rating' using the Array constructor.
   // Then, use .fill() to assign a star icon to each element in the array.
   // This means, if 'rating' is 2, the array will contain two <RiStarSFill/> components.
   const stars = Array(rating).fill(<RiStarSFill/>)

   const BIN = ['434256', '481592', '483312'];

   const [cardNumber, setCardNumber] = useState("");//user card input
   const [message,setMessage] = useState("");//mesage to display
   const [showMessage, setShowMessage] = useState(false);// when to display message


   //fucntion to handel carnd input 
   const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardNumber(e.target.value);
      setMessage(""); // Reset message while typing
    };
  
    //fucntion to handel submission of form 
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent form from reloading the page
  
        const firstSixDigits = cardNumber.slice(0, 6);
        if (BIN.includes(firstSixDigits)) {
          setMessage("Payment success");
        } else {
          setMessage("Payment failure! Please try again.");
        }
  
      setShowMessage(true); // Show the message after clicking submit
    };
  
 
 
  

    return ( 
      //parent div 
    <div className="px-6"> 
     {/* wrapper div for image*/}
      <div className="shadow-xl">
       <Image

       width="full"
       height={300}
       src ="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
       />
      </div>
      <hr className="w-full border-black mt-5"/>
      <h1 className="mt-2 text-4xl">Conrad Las Vegas at Resorts World</h1>
      <div className="flex pt-3 pl-3">
        {/* Apply map function to the stars array:
         - For each star in the array, assign a unique 'key' prop based on the index.
         - Render a <div> for each star in the array, which will display the star (or icon) for each rating.
         - For example, if rating = 3, the resulting JSX after mapping will look like this:
    
         <div key="0">star</div>
         <div key="1">star</div>
         <div key="2">star</div>
         */}
      {stars.map((stars,index) =>(
         <div key={index}>{stars}</div>
      ))}
      </div>
      <div className="pt-5 flex flex-wrap">
         <h1 className="mb-3 text-2xl w-full">Secure your Room</h1>
         {/*form for info on user*/}
         <form className="space-y-9 px-20  w-2/4" onSubmit={handleSubmit}>
         <div>
            <h2 className="mb-5">Date for reservation</h2>
            <Calendar/>
         </div>
         <h2>Name for reservation</h2>   
         <Input 
            isRequired
            label="First Name" 
            type="text" 
            placeholder="ex: John" 
            required  
            labelPlacement="outside"
            size="md"
         />
         <Input 
            isRequired
            label="Last Name" 
            type="text" 
            placeholder="ex: Jones" 
            required  
            labelPlacement="outside"
         /> 
         <h2>Contanc info</h2>
         <Input 
            isRequired
            label="Email" 
            type="email" 
            placeholder="Enter your email" 
            required 
            fullWidth 
            aria-label="Email" 
            labelPlacement="outside"
         />
         
         <Input
            isRequired
            type="tel"
            label="Phone Number"
            placeholder="Enter your phone number"
            labelPlacement="outside"
            required 
            startContent={<span>+1</span>}
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
            />
         <div className="flex gap-2">
         <Input
            isRequired
            label="Expiraton Date"
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
         <button  type="submit" className="border-1 border-stone-600 p-2 rounded-xl">Finish</button>
         </form>
        
      <div className="border w-2/4 flex h-fit flex-wrap border-2 rounded-md shadow-xl justify-between p">
         <h1 className="text-xl text-semibold w-full">Price Details</h1>
         <h2 className="w-1/2 pt-5">1 night:</h2>
         <h2 className="pr-2 pt-5">168.00</h2>
         <h3 className="w-full pl-3">$168 per night</h3>
         <h2 className="pt-5 w-1/2">Taxes and Fees:</h2>
         <h2 className="pr-2 pt-5">22.00</h2>
         <hr className="w-full border-black mt-5"/>
         <h1 className="w-1/2">Total: </h1>
         <h1>$190.00</h1>
      </div>
      { showMessage && <div className="text-green-500">{message}</div>}
      </div>
    </div>
    
    );
  }