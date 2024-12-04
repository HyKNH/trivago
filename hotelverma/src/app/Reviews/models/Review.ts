import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
    hotelId: string;
    firstname: string;
    lastname: string;
    message: string;
}

const reviewSchema = new Schema<IReview>({
    hotelId: {
        type: String,
        required: true,
    },
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
});

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);

export default Review;