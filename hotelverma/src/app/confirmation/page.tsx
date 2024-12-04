"use client";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import {Image} from "@nextui-org/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react"
import axios from "axios";

type Reservation = {
  _id: string;
  userName: string;
  userEmail: string;
  userTelephone: string;
  hotelId: string | null;
  hotelName: string;
  location: string;
  checkInDate: string; // Use `string` if it's a date string
  checkOutDate: string; // Use `string` if it's a date string
  confirmationNumber: string;
};
export default function Confimation () {
    const router = useRouter();
    const [reservation, setReservation] = useState<Reservation | null>(null)
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const reservation = params.get('confirmationNumber'); // Get 'id' query parameter from the URL
    
        const fetchDetails = async () => {
          try {
            if (reservation) {
              const response = await axios.get(`/confirmation/api`, {
                params: { confirmationNumber: reservation },
              });
              const data = response.data;
              setReservation(data.reservation);
              console.log("Fetched hotel data:", data.reservation); // Log fetched data directly
            } else {
              console.error("Reservation ID not found in the URL");
            }
          } catch (e) {
            console.error("Error fetching hotels:", e);
          }
        };
    
        fetchDetails();
      }
    },[]); 

    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-wrap">
                <h1 className="text-xl font-semibold text-center text-green-500 w-full">Thank You for using Hotel Verma!</h1>
                <IoCheckmarkCircleSharp className="text-3xl text-green-500 mt-2 w-full mb-1"/>
                <div className="w-full">
                <Image
                width={600}
                height={400}
                src="https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hotel Verma"
                />
                </div>
                <div className="w-full flex gap-4 mt-4 ">
                </div>
                </div>
                <h1>{reservation?.userEmail}</h1>
            </div>
        </div>
    );
}