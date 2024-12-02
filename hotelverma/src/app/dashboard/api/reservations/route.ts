import { NextResponse } from 'next/server';
import { getSession } from '../../utils/auth';
import Reservation from '../../models/Reservations';
import { connectToDatabase } from '../../../signup/utils/db';

export async function GET(req: Request) {
    try {
      await connectToDatabase();
  
      const session = await getSession(req);
      if (!session || !session.user || !session.user._id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
      }
  
      const reservations = await Reservation.find({ userId: session.user._id })
        .populate('hotelId', 'title location price')
        .exec();
  
      const formattedReservations = reservations.map((reservation) => ({
        _id: reservation._id,
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        email: reservation.email,
        telephone: reservation.telephone,
        hotelName: reservation.hotelId?.title || 'Unknown Hotel',
        location: reservation.hotelId?.location || 'Unknown Location',
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
        price: reservation.hotelId?.price || 0,
        confirmationNumber: reservation.confirmationNumber,
      }));
  
      return NextResponse.json({ reservations: formattedReservations });
    } catch (error) {
      console.error('Error in GET /reservations:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  
  export async function DELETE(req: Request) {
    try {
      await connectToDatabase();
  
      const session = await getSession(req);
      if (!session || !session.user || !session.user._id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
      }
  
      const { reservationId } = await req.json();
  
      const reservation = await Reservation.findOne({
        _id: reservationId,
        userId: session.user._id,
      });
  
      if (!reservation) {
        return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
      }
  
      await Reservation.deleteOne({ _id: reservationId });
  
      return NextResponse.json({ message: 'Reservation cancelled and deleted successfully' });
    } catch (error) {
      console.error('Error in DELETE /reservations:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  