import {Image} from "@nextui-org/image";
import {Input} from "@nextui-org/input"
import { RiStarSFill } from "react-icons/ri";


export default function reservation() {
   const rating = 2;  // For now, set to a fixed value. Later, will fetch this from the database.


   // Create an array of size 'rating' using the Array constructor.
   // Then, use .fill() to assign a star icon to each element in the array.
   // This means, if 'rating' is 2, the array will contain two <RiStarSFill/> components.
   const stars = Array(rating).fill(<RiStarSFill/>)

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
         <form className="space-y-12 px-20 pt-5 w-2/4">
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
         </form>

      <div className="border w-2/4 flex">
        <h1>Price details</h1>
         
      </div>
      </div>
    </div>
    
    );
  }