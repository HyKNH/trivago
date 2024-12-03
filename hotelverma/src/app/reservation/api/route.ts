import { NextRequest, NextResponse } from "next/server";
import Reservation from '../models/Reservations';
import { connectToDatabase } from "@/app/reservation/utils/db";
import Hotel from "../../hotels/models/Hotels";
import { getSession } from "@/app/dashboard/utils/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Hotel ID is required" }), {
      status: 400,
    });
  }

  try {
    await connectToDatabase();
    const hotel = await Hotel.findById(id);

    return new Response(JSON.stringify({ hotel }), { status: 200 });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const session = await getSession(req);

    if (!session) {
      return NextResponse.json(
        { message: "Not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user._id;

    const body = await req.json();
    const {
      checkInDate,
      checkOutDate,
      confirmationNumber,
      firstName,
      hotelId,
      lastName,
      telephone,
    } = body;

    const newReservation = new Reservation({
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      confirmationNumber,
      firstName,
      lastName,
      telephone,
    });

    const savedReservation = await newReservation.save();

    await Hotel.findByIdAndUpdate(hotelId, { booked: true });

    return NextResponse.json(
      { reservation: savedReservation },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error:", e);

    if (e instanceof Error) {
      if (e.name === "ValidationError") {
        return NextResponse.json(
          { error: e.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: e.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
