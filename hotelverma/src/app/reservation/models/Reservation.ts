import mongoose, { Schema, Document } from 'mongoose';

interface IReservation extends Document {
    userId: string;
    hotelId: string;
    checkInDate: string;
    checkOutDate: string;
    confirmationNumber: string;
    firstName: string;
    lastName: string;
    telephone: string;
}

const reservationSchema = new Schema<IReservation>({
    userId: {
        type: String,
        required: true,
    },
    hotelId: {
        type: String,
        required: true,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    confirmationNumber: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
});

const Reservation = mongoose.models.Reservation || mongoose.model<IReservation>('Reservation', reservationSchema);

export default Reservation;