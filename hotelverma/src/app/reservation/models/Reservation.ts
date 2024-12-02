import mongoose, { Schema, Document } from 'mongoose';

interface IReservation extends Document {
    checkIn: string;
    checkOut: string;
    conFirNum: string;
    email: string;
    fname: string;
    lname: string;
    tel: string;
    title: string;
}

const reservationSchema = new Schema<IReservation>({
    checkIn: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String,
        required: true,
    },
    conFirNum: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

const Reservation = mongoose.models.Reservation || mongoose.model<IReservation>('Reservation', reservationSchema);

export default Reservation;
