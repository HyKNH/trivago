import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../signup/utils/db';
import Hotel from '../../../models/Hotels';
import { getSession } from '../../../utils/auth';

const checkAdmin = (session: any) => {
  return session?.user?.role === 'admin';
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = params;

  const body = await req.json();  
  const { title, location, amenities, image, price, rating, booked, roomType} = body;
  
  if (!id) {
    return NextResponse.json({ message: 'Hotel ID is required.' }, { status: 400 });
  }

  try {
    const session = await getSession(req);  

    if (!session || !checkAdmin(session)) {
      return NextResponse.json({ message: 'Unauthorized. Admins only.' }, { status: 403 });
    }

    const hotel = await Hotel.findById(id); 

    if (!hotel) {
      return NextResponse.json({ message: 'Hotel not found.' }, { status: 404 });
    }

    const amenitiesArray = Array.isArray(amenities)
      ? amenities
      : amenities?.split(",").map((item: string) => item.trim());

    hotel.title = title;
    hotel.location = location;
    hotel.amenities = amenitiesArray;
    hotel.image = image;
    hotel.price = price;
    hotel.rating = rating;
    hotel.booked = booked;
    hotel.roomType = roomType;

    await hotel.save(); 

    return NextResponse.json({ hotel }, { status: 200 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
