'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "@nextui-org/image";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { RiStarSFill } from "react-icons/ri";

type Review = {
  firstname: string;
  lastname: string;
  message: string;
  hotelId: string;
  rating: number;
};

export default function GetReviews() {
  const [hotel, setHotel] = useState<any>();
  const [reviews, setReviews] = useState<Review[] | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const reservationId = params.get("hotelId");

      const fetchroom = async () => {
        try {
          if (reservationId) {
            const response = await axios.get(`/api/reservationRoute?id=${reservationId}`);
            const reviewresponse = await axios.get(`/api/reviewRoute?id=${reservationId}`);
            const data = response.data;
            const reviewdata = reviewresponse.data;

            if (reviewdata) {
              setReviews(reviewdata.reviews);
            }
            setHotel(data.hotel);
            console.log("Fetched hotel data:", data.hotel);
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

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(false)
      .map((_, index) => (
        <RiStarSFill
          key={index}
          className={`text-xl ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Reviews Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card key={index} className="mb-4 shadow-lg border border-gray-200 rounded-lg">
              <CardHeader className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-t-lg">
                <div className="flex gap-3">
                  <div className="flex flex-col">
                    <h4 className="text-base font-semibold leading-none text-gray-700">
                      {review.firstname} {review.lastname}
                    </h4>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-4 py-3 text-sm text-gray-600 bg-white">
                {/* Render stars */}
                <div className="flex mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="whitespace-pre-line leading-relaxed">{review.message}</p>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>No reviews currently</p>
        )}
      </div>

      {/* Hotel Information Section */}
      <div className="flex-1">
        <div className="shadow-xl mb-5">
          <Card>
            <Image width="100%" height={300} src={hotel?.image} alt="Hotel Verma" />
          </Card>
        </div>
        <Divider className="my-4" />
        <h1 className="mt-2 text-4xl">{hotel?.title}</h1>
        <h2 className="text-lg text-gray-600">{hotel?.location}</h2>
        <h3 className="text-gray-800">{hotel?.amenities.join(", ")}</h3>
        <div className="flex pt-3">
          {renderStars(hotel?.rating || 0)} {/* Display hotel rating */}
        </div>
      </div>
    </div>
  );
}
