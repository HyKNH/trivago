import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
    firstname: string;
    lastname: string;
    message: string;
    hotelId: string;
}

const reviewSchema = new Schema<IReview>({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    hotelId: {
        type: String,
        required: true,
    },
});

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);

export default Review;