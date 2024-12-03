'use client';

import {useEffect, useState} from "react";
import axios from "axios";
import {Image} from "@nextui-org/image";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";

type Review = {
    firstname: string;
    lastname: string;
    message: string;
    hotelId: string;
}

export default function GetReviews() {
    const [hotel, setHotel] = useState<any>();
    const [reviews, setReviews] = useState<Review[] | undefined>(undefined);
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
                        const reviewdata = reviewresponse.data
                        if (reviewdata) {
                            setReviews(reviewdata.reviews)
                        }
                        setHotel(data.hotel);
                        console.log(reviews)

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
        <div>
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
            {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card key={review.lastname || `${review.firstname}-${review.lastname}`}>
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">
                                        {review.firstname} {review.lastname}
                                    </h4>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-small text-default-400">
                            <p>{review.message}</p>
                        </CardBody>
                    </Card>
                ))
            ) : (
                <p>No reviews currently</p>
            )}

        </div>
    );
}