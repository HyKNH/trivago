import { NextResponse } from 'next/server';
import { getSession } from '../../utils/auth';
import Reservation from '../../models/Reservations';
import { connectToDatabase } from '../../../signup/utils/db';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const session = await getSession(req);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied. Admins only.' }, { status: 403 });
    }

    const reservations = await Reservation.find({})
      .populate('userId', 'email')
      .populate('hotelId', 'title location price')
      .exec();

    const formattedReservations = reservations.map((reservation) => ({
      _id: reservation._id,
      firstName: reservation.firstName || 'Unknown First Name',
      lastName: reservation.lastName || 'Unknown Last Name',
      userEmail: reservation.userId?.email || 'Unknown Email',
      userTelephone: reservation.telephone || 'Unknown Telephone',
      hotelId: reservation.hotelId?._id || null,
      hotelName: reservation.hotelId?.title || 'Unknown Hotel',
      location: reservation.hotelId?.location || 'Unknown Location',
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      price: reservation.hotelId?.price || 0,
      confirmationNumber: reservation.confirmationNumber,
    }));

    return NextResponse.json({ reservations: formattedReservations });
  } catch (error) {
    console.error('Error in GET /all-reservations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
