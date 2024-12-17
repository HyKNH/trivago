import { RiStarSFill } from "react-icons/ri";

// interface to use for setting type for parameters and telling parent what parameters are required for component
interface RatingFilterProps {
  selectedRatings: Set<number>;
  onChange: (rating: number) => void;
}

/**
 * A component for displaying a set of checkboxes for rating selection.
 * 
 * This component allows users to select ratings from 1 to 5. Each rating is represented by a 
 * checkbox with a star icon. The selected ratings are managed through the `selectedRatings` 
 * prop, and changes are communicated to the parent component via the `onChange` callback.
 * 
 * @param selectedRatings A Set containing the selected ratings. Ratings range from 1 to 5.
 * @param onChange A callback function triggered when a rating is selected or deselected.
 * 
 * @returns A JSX element rendering a list of checkboxes for rating selection.
 */

export default function Checkbox({ selectedRatings, onChange }: RatingFilterProps) {
  const handleRatingChange = (rating: number) => {
    onChange(rating);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <div key={rating} className="flex items-center w-full sm:w-auto">
          <input
            type="checkbox"
            id={`option${rating}`}
            className="ml-2"
            checked={selectedRatings.has(rating)}
            onChange={() => handleRatingChange(rating)}
          />
          <label htmlFor={`option${rating}`} className="pl-2 flex items-center">
            {rating} <RiStarSFill className="mt-1 text-yellow-400" />
          </label>
        </div>
      ))}
    </div>
  );
}
