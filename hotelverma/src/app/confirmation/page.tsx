"use client";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

type Reservation = {
  _id: string;
  userName: string;
  userEmail: string;
  userTelephone: string;
  hotelId: string | null;
  hotelName: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  confirmationNumber: string;
};

export default function Confirmation() {
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [countdown, setCountdown] = useState(10); // Countdown timer state
  const hasFetched = useRef(false); // Ref to ensure data is only fetched once

  // Fetch reservation details when component mounts
  useEffect(() => {
    if (hasFetched.current) return; // Prevent multiple executions
    hasFetched.current = true;

    const fetchDetails = async () => {
      const params = new URLSearchParams(window.location.search);
      const confirmationNumber = params.get("confirmationNumber");

      if (confirmationNumber) {
        try {
          const response = await axios.get(`/confirmation/api`, {
            params: { confirmationNumber },
          });
          setReservation(response.data.reservation);
        } catch (error) {
          console.error("Error fetching reservation:", error);
        }
      } else {
        console.error("Confirmation number not found in the URL");
      }
    };

    fetchDetails();
  }, []);

  // Start countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          router.push("/"); // Redirect after countdown reaches 0
        }
        return prev - 1;
      });
    }, 1000); // Update countdown every second

    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, [router]); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap">
          <h1 className="text-xl font-semibold text-center text-green-500 w-full">
            Thank You for using Hotel Verma!
          </h1>
          <IoCheckmarkCircleSharp className="text-3xl text-green-500 mt-2 w-full mb-1" />
          <div className="w-full">
            <Image
              width={600}
              height={400}
              src="https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hotel Verma"
            />
          </div>
        </div>

        <div>
          <p className="text-xl text-center font-semibold mb-1">
            Reservation details have been sent to:
          </p>
          <h2 className="text-center text-lg">{reservation?.userEmail}</h2>
        </div>

        <div className="text-center mt-4">
          <p className="text-xl font-semibold">Redirecting in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  );
}
