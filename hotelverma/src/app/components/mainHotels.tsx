'use client';

import { Card, CardBody, Image, Spinner } from "@nextui-org/react";
import Checkbox from "./ratingFil";
import PriceSlider from "./priceFil";
import { useState, useEffect } from "react";

type Hotel = {
  _id: string;
  title: string;
  location: string;
  amenities: string[];
  image: string;
  price: number;
  rating: number;
};

export default function Content() {
  const [hotels, setHotels] = useState<Hotel[] | undefined>(undefined);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("/hotels/api");
        const data = await response.json();
        if (data.hotels) {
          setHotels(data.hotels);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  if (hotels === undefined) {
    return <Spinner className="flex items-center justify-center w-full py-35" color="warning" />;
  }

  return (
    <div className="flex gap-4 mt-12">
      {/* Filter Menu */}
      <div className="ml-5 w-1/4 p-5 mb-52 shadow-2xl rounded-lg border">
        <h1 className="flex items-center justify-center w-full font-semibold text-lg mb-2 py-3">Rating</h1>
        <Checkbox />
        <h1 className="flex items-center justify-center w-full font-semibold text-lg mb-2">Price</h1>
        <PriceSlider />
      </div>

      {/* Cards Listing */}
      <div className="w-3/4 pr-52">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <Card key={hotel._id} className="mb-6">
              <CardBody>
                <div className="flex gap-x-4">
                  {/* Image */}
                  <div className="w-2/5">
                    <Image
                      width={400}
                      src={hotel.image || "/default-image.jpg"}
                      alt={hotel.title}
                    />
                  </div>
                  {/* Details */}
                  <div className="w-3/5 relative">
                    <h1 className="font-semibold">{hotel.title}</h1>
                    <h2>{hotel.location}</h2>
                    <h3>{hotel.amenities.join(", ")}</h3>
                    <div className="flex items-center gap-2">
                      {/* Display price */}
                      <span className="text-xl font-bold">${hotel.price}</span>
                      {/* Display rating */}
                      <span className="text-yellow-400">{'★'.repeat(hotel.rating)}</span>
                    </div>
                    <a href="http://localhost:3000/reservation">
                      <button
                        className="absolute bottom-0 right-0 py-2 px-4 border rounded-lg border-red-400 text-red-300 active:transition-all active:-translate-y-1 active:scale-110 hover:transition-all hover:bg-red-400 hover:text-white"
                      >
                        Book Now
                      </button>
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>No hotels available.</p>
        )}
      </div>
    </div>
  );
}
