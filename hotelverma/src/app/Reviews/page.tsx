'use client';

import {useEffect, useState} from "react";
import axios from "axios";
import {Image} from "@nextui-org/image";

export default function GetReviews() {
    const [hotel, setHotel] = useState<any>();
    const [reviews, setReviews] = useState<any>();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const reservationId = params.get('hotelId'); // Get 'id' query parameter from the URL

            const fetchroom = async () => {
                try {
                    if (reservationId) {
                        const response = await axios.get(`/reservation/api?id=${reservationId}`);
                        const reviewresponse = await axios.get(`/Reviews/api?id=${reservationId}`)
                        const data = response.data;
                        console.log(reviewresponse)
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
            <hr className="w-full border-black mt-5"/>
            <h1 className="mt-2 text-4xl">{hotel?.title}</h1>
            <h2>{hotel?.location}</h2>
            <h3>{hotel?.amenities.join(", ")}</h3>
        </div>
    );
}