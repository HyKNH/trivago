import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../utils/db';
import Hotel from '../models/Hotels';

// Fetch all hotels
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Query all hotels from the database
    const hotels = await Hotel.find();

    // Map hotels to a cleaner format if necessary
    const formattedHotels = hotels.map((hotel) => ({
      _id: hotel._id.toString(),
      title: hotel.title,
      location: hotel.location,
      amenities: hotel.amenities || [],
      image: hotel.image || "/default-image.jpg",
      price: hotel.price,
      rating: hotel.rating,
    }));

    // Return the response
    return NextResponse.json({ hotels: formattedHotels }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hotels:', error);

    // Handle errors with a 500 response
    return NextResponse.json(
      { message: 'Error fetching hotels' },
      { status: 500 }
    );
  }
}
