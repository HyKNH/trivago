'use client';

import { Card, CardBody, Image, Spinner, Button, Link } from "@nextui-org/react";
import Checkbox from "../components/ratingFil";
import PriceSlider from "../components/priceFil";
import SearchBar from "../components/serchbar";
import { useState, useEffect } from "react";
import RoomType from "../components/roomtype"

type Hotel = {
  _id: string;
  title: string;
  location: string;
  amenities: string[];
  image: string;
  price: number;
  rating: number;
  booked: boolean;
  roomType: string;
};

export default function Content() {
  const [hotels, setHotels] = useState<Hotel[] | undefined>(undefined);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[] | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(new Set());
  const [locationQuery, setLocationQuery] = useState("");
  const [roomTypeQuery, setRoomTypeQuery] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("/hotels/api");
        const data = await response.json();
        if (data.hotels) {
          setHotels(data.hotels);
          setFilteredHotels(data.hotels);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  const handleRatingChange = (newRating: number) => {
    setSelectedRatings(prevRatings => {
      const updatedRatings = new Set(prevRatings);
      if (updatedRatings.has(newRating)) {
        updatedRatings.delete(newRating);
      } else {
        updatedRatings.add(newRating);
      }
      return updatedRatings;
    });
  };

  const handleLocationSearch = (query: string) => {
    setLocationQuery(query.toLowerCase());
  };

  const handleRoomTypeSearch = (query: string) => {
    setRoomTypeQuery(query.toLowerCase());
  };
  
  useEffect(() => {
    if (hotels) {
      const filtered = hotels
        .filter(hotel => !hotel.booked) 
        .filter(hotel => {
          const isInPriceRange = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
          const matchesRating = selectedRatings.size === 0 || selectedRatings.has(hotel.rating);
          const matchesLocation = hotel.location.toLowerCase().includes(locationQuery);
          const matchesRoomType = hotel.roomType.toLowerCase().includes(roomTypeQuery);
          return isInPriceRange && matchesRating && matchesLocation && matchesRoomType;
        });

      setFilteredHotels(filtered);
    }
  }, [priceRange, selectedRatings, locationQuery, hotels, roomTypeQuery]);

  if (filteredHotels === undefined) {
    return <Spinner className="flex items-center justify-center w-full py-35" color="warning" />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-12">
      {/* Filter Menu */}
      <div className="ml-5 w-full md:w-1/4 p-5 mb-8 md:mb-52 shadow-2xl rounded-lg border h-fit">
        <h1 className="flex items-center justify-center w-full font-semibold text-lg mb-2 py-3">Rating</h1>
        <span className="flex justify-center w-full"><Checkbox selectedRatings={selectedRatings} onChange={handleRatingChange} /></span>
        <h1 className="flex items-center justify-center w-full font-semibold text-lg mb-2">Price</h1>
        <span className="flex justify-center w-full"><PriceSlider onChange={handlePriceChange} /></span>
        <h1 className="flex items-center justify-center w-full font-semibold text-lg mb-2 mt-2">Search for location</h1>
        <span className="flex justify-center w-full"><SearchBar onSearch={handleLocationSearch} /></span>
        <h1 className="flex items-center justify-center w-full font-semibold text-lg mb-2 mt-2">Search for room type</h1>
        <span className="flex justify-center w-full"><RoomType onSearch={handleRoomTypeSearch} /></span>
      </div>

      {/* Cards Listing */}
      <div className="w-full md:w-3/4 pr-0 md:pr-52">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <Card key={hotel._id} className="mb-6">
              <CardBody>
                <div className="flex flex-col md:flex-row gap-x-4">
                  {/* Image */}
                  <div className="w-full md:w-2/5">
                    <Image width={400} height={275}src={hotel.image || "/default-image.jpg"} alt={hotel.title} />
                  </div>
                  {/* Details */}
                  <div className="w-full md:w-3/5 relative">
                    <h1 className="font-semibold">{hotel.title}</h1>
                    <h2>{hotel.location}</h2>
                    <h3>{hotel.amenities.join(", ")}</h3>
                    <h4>{hotel.roomType}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">${hotel.price}</span>
                      <span className="text-yellow-400">{'★'.repeat(hotel.rating)}</span>
                    </div>
                    <span className="absolute bottom-0 left-0 py-2 px-4">
                      <Button as={Link} variant="bordered" color="secondary" href={`/Reviews?hotelId=${hotel._id}`}> 
                      View Reviews
                      </Button>
                    </span>
                    <span className="absolute bottom-0 right-0 py-2 px-4">
                      <Button as={Link} variant="bordered" color="primary" href={`/reservation?hotelId=${hotel._id}`}> 
                        Book Now
                      </Button>
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
            <p>No hotels available for the selected filters.</p>
        )}
      </div>
    </div>
  );
}
