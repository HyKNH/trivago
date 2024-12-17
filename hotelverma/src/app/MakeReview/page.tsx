'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spacer, Card, CardHeader, CardBody, Textarea, Input } from "@nextui-org/react";
import { MdPostAdd } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";


/**
 * # Module: MakeReview
 *
 * ## Date:
 * November 18, 2024
 *
 * ## Programmer:
 * Angel Rosales
 *
 * ## Description:
 * `MakeReview` is a page component allowing for the creation of reviews.
 *
 * ## Important Functions:
 * - **MakeReview** (default export):
 *   - **Input**: None
 *   - **Output**: JSX.Element
 *   - **Description**:
 *     Displays a review form for the user to fill out which contains the message to submit and their rating of the hotel.
 *
 * ## Data Structures:
 * - hotel, contains image, title, location, amenities, rating
 * - reviews, contains firstname, lastname, rating, message
 *
 * ## Algorithms Used:
 * - **None**:
 */

export default function MakeReview() {
  const [reservation, setReservation] = useState<any>();
  const [review, setReview] = useState({
    hotelId: "",
    firstname: "",
    lastname: "",
    message: "",
    rating: 0,
  });
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const reservationid = params.get("reservation");

      const fetchroom = async () => {
        try {
          if (reservationid) {
            const response = await axios.get(`/api/makeReviewRoute?reservation=${reservationid}`);
            const data = response.data;
            setReservation(data.reservation);
            setReview({
              hotelId: data.reservation.hotelId || "",
              firstname: data.reservation.firstName || "",
              lastname: data.reservation.lastName || "",
              message: "",
              rating: 0,
            });
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

  const createReview = async (e: any) => {
    e.preventDefault();
    try {
      const send = await axios.post("/api/makeReviewRoute", review);
      setFeedback({ success: true, message: "Review added successfully!" });
      setReview((prev) => ({ ...prev, message: "", rating: 0 })); // Clear message and rating
    } catch (e) {
      console.error("Error posting review:", e);
      setFeedback({ success: false, message: "Failed to add the review. Please try again." });
    }
  };

  const setStarRating = (rating: number) => {
    setReview((prev) => ({ ...prev, rating }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-700">Leave a Review</h1>
          <p className="text-gray-500 text-sm">
            Share your experience for{" "}
            <span className="text-indigo-500 font-medium">
              {reservation?.hotelName || "the hotel"}
            </span>
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={createReview} className="space-y-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <Input
                id="firstname"
                value={review.firstname}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <Input
                id="lastname"
                value={review.lastname}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                Your Review
              </label>
              <Textarea
                id="message"
                placeholder="Write your detailed review here..."
                value={review.message}
                onChange={(e) => setReview({ ...review, message: e.target.value })}
                required
                minRows={5}
                maxRows={10}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-600">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <RiStarSFill
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      star <= review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setStarRating(star)}
                  />
                ))}
              </div>
            </div>
            <Spacer y={1} />
            <Button
              type="submit"
              color="warning"
              variant="bordered"
              startContent={<MdPostAdd />}
              className="w-full"
            >
              Submit Review
            </Button>
            {feedback && (
              <p
                className={`text-sm mt-2 ${
                  feedback.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback.message}
              </p>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
