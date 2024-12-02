import { NextResponse } from 'next/server';
import { getSession } from '../../utils/auth';
import Reservation from '../../models/Reservations';
import Hotel from '../../models/Hotels'; 
import { connectToDatabase } from '../../../signup/utils/db';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const session = await getSession(req);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const reservations = await Reservation.find({ userId: session.user._id });

    const formattedReservations = [];

    for (const reservation of reservations) {
      const hotel = await Hotel.findById(reservation.hotelId, 'title location price');
      
      formattedReservations.push({
        _id: reservation._id,
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        telephone: reservation.telephone,
        hotelName: hotel?.title || 'Unknown Hotel',
        location: hotel?.location || 'Unknown Location',
        checkInDate: reservation.checkInDate.toISOString().split('T')[0], 
        checkOutDate: reservation.checkOutDate.toISOString().split('T')[0],
        price: hotel?.price || 0,
        confirmationNumber: reservation.confirmationNumber,
      });
    }

    return NextResponse.json({ reservations: formattedReservations });
  } catch (error) {
    console.error('Error in GET /reservations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
