import { RiStarSFill } from "react-icons/ri";

interface RatingFilterProps {
  selectedRatings: Set<number>;
  onChange: (rating: number) => void;
}

export default function Checkbox({ selectedRatings, onChange }: RatingFilterProps) {
  const handleRatingChange = (rating: number) => {
    onChange(rating);
  };

  return (
    <div className="flex flex-wrap">
      {[1, 2, 3, 4, 5].map(rating => (
        <div key={rating} className="w-full flex">
          <input
            type="checkbox"
            id={`option${rating}`}
            className="ml-5"
            checked={selectedRatings.has(rating)}
            onChange={() => handleRatingChange(rating)}
          />
          <label htmlFor={`option${rating}`} className="flex pl-1">
            {rating} <RiStarSFill className="mt-1 text-yellow-400" />
          </label>
        </div>
      ))}
    </div>
  );
}
