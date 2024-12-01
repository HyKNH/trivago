import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../utils/db';
import Hotel from '../models/Hotels';

export async function GET(req: NextRequest) {
  try {

    await connectToDatabase();

    const hotels = await Hotel.find();

    const formattedHotels = hotels.map((hotel) => ({
      _id: hotel._id.toString(),
      title: hotel.title,
      location: hotel.location,
      amenities: hotel.amenities || [],
      image: hotel.image || "/default-image.jpg",
      price: hotel.price,
      rating: hotel.rating,
    }));

    return NextResponse.json({ hotels: formattedHotels }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hotels:', error);

    return NextResponse.json(
      { message: 'Error fetching hotels' },
      { status: 500 }
    );
  }
}
