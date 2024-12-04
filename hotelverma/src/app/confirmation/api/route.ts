// Import necessary modules
import nodemailer from 'nodemailer';
import Reservation from "../model/Reservation";
import { connectToDatabase } from "../utils/db";

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

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.Email_User, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

// The main function to handle the GET request
export async function GET(req: Request) {
  const url = new URL(req.url);
  const confirmationNumber = url.searchParams.get("confirmationNumber");

  if (!confirmationNumber) {
    return new Response(
      JSON.stringify({ error: "Confirmation number is required" }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const reservation = await Reservation.findOne({ confirmationNumber })
      .populate('userId', 'name email')
      .populate('hotelId', 'title location roomType')
      .exec();

    if (!reservation) {
      return new Response(
        JSON.stringify({ error: "Reservation not found" }),
        { status: 404 }
      );
    }

    // Format reservation details
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
      roomType : reservation.hotelId?.roomType || 'Uknown room type',
    };

    // Send confirmation email
    await sendConfirmationEmail(formattedReservation);

    // Return the reservation details
    return new Response(
      JSON.stringify({ reservation: formattedReservation }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// Function to send the confirmation email
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

// Function to generate the email HTML content
function generateEmailTemplate(reservation: ReservationDetails): string {
  return `
    <h1>Reservation Confirmation</h1>
  <p>Dear ${reservation.userName},</p>
  <p>Thank you for your reservation at ${reservation.hotelName}!</p>
  <p><strong>Reservation Details:</strong></p>
  <ul>
    <li>Confirmation Number: ${reservation.confirmationNumber}</li>
    <li>Hotel: ${reservation.hotelName}</li>
    <li>Location: ${reservation.location}</li>
    <li>Room Type: ${reservation.roomType}</li>
    <li>Check-in Date: ${new Date(reservation.checkInDate).toLocaleDateString()}</li>
    <li>Check-out Date: ${new Date(reservation.checkOutDate).toLocaleDateString()}</li>
  </ul>
  <p>We look forward to your stay!</p>
  <p>Best regards,</p>
  <p>Hotel Verma Team</p>
  <p>If you wish to cancel reservation or leave a review of your stay please visit your profile</p>

  <a href="https://hotelverma.vercel.app/">
    <button style="
    display: inline-block;
    padding: 5px 15px;
    border: 1px solid #f59e0b; 
    border-radius: 50px; 
    background-color: #f59e0b; 
    color: white;
    text-decoration: none;
    font-size: 16px;
  ">
  Home Page
    </button>
  </a>
  `;
}
