import mongoose, { Schema, Document } from 'mongoose';

interface IHotel extends Document {
  title: string;
  location: string;
  amenities: string[];
  image: string;
  price: number;
  rating: number;
  booked: boolean;
}

const hotelSchema = new Schema<IHotel>({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
});

const Hotel = mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', hotelSchema);

export default Hotel;
