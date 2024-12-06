import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { getSession } from '../../../lib/auth';
import Reservation from '../../../lib/models/Reservations';
import Hotel from '../../../lib/models/Hotels';
import nodemailer from "nodemailer";

interface ReservationDetails {
  _id: string;
  userName: string;
  userEmail: string;
  userTelephone: string;
  hotelId: string | null;
  hotelName: string;
  location: string;
  checkInDate: Date | string;
  checkOutDate: Date | string;
  confirmationNumber: string;
  roomType: string;
}



const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.Email_User, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const session = await getSession(req);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { id } = params;

    const reservation = await Reservation.findOne({
      _id: id,
      userId: session.user._id,
    }).populate('userId', 'name email')
      .populate('hotelId', 'location title roomType')
      .exec();
    
    ;

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    const hotel = await Hotel.findById(reservation.hotelId);
    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    hotel.booked = false;
    await hotel.save();

    await Reservation.deleteOne({ _id: id });

    const formattedReservation = {
      _id: reservation._id,
      userName: reservation.userId?.name || 'Unknown Name',
      userEmail: reservation.userId?.email || 'Unknown Email',
      userTelephone: reservation.telephone || 'Unknown Telephone',
      hotelId: reservation.hotelId?._id || null,
      hotelName: reservation.hotelId?.title || 'Unknown Hotel',
      location: reservation.hotelId?.location || 'Unknown Location',
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      confirmationNumber: reservation.confirmationNumber,
      roomType: reservation.hotelId?.roomType
    };

    await sendConfirmationEmail(formattedReservation);



    return NextResponse.json({ message: 'Reservation deleted successfully and hotel status updated' });
  } catch (error) {
    console.error('Error in DELETE /reservations/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function sendConfirmationEmail(reservation: ReservationDetails) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: reservation.userEmail, // Receiver's email
    subject: 'Your Reservation Confirmation', // Subject line
    html: generateEmailTemplate(reservation), // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', reservation.userEmail);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

function generateEmailTemplate(reservation: ReservationDetails): string {
  return `
  <h1>Cancellation Confirmation</h1>
  <p>Dear ${reservation.userName},</p>
  <p><strong>Cancellation Details:</strong></p>
  <ul>
    <li>Hotel: ${reservation.hotelName}</li>
    <li>Location: ${reservation.location}</li>
    <li>Room Type: ${reservation.roomType}</li>
    <li>Check-in Date: ${new Date(reservation.checkInDate).toLocaleDateString()}</li>
    <li>Check-out Date: ${new Date(reservation.checkOutDate).toLocaleDateString()}</li>
  </ul>
  <p>You have successfully canceled your reservation</p>
  <p>We hope to have the opportunity to serve you in the future.</p>
  <p>Best regards,</p>
  <p>Hotel Verma Team</p>
  `;
}
