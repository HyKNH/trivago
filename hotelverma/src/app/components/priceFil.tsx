import { Slider } from "@nextui-org/react";

// interface to use for setting type for parameters and telling parent what parameters are required for component
interface PriceSliderProps {
  value: [number, number];
  onChange: (newRange: [number, number]) => void;
}

/**
 * A slider component for selecting a price range.
 * 
 * This component allows the user to select a price range using a slider, with 
 * a minimum value of 0, a maximum value of 500, and a step size of 10. The selected
 * range is passed to the parent component via the `onChange` callback.
 * 
 * @param value The current value of the slider, represented as a tuple [min, max].
 * @param onChange Callback function triggered when the slider's value changes.
 * 
 * @returns A JSX element rendering the price slider component.
 */

export default function PriceSlider({ value,onChange }: PriceSliderProps) {
  const handleOnChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      onChange(value as [number, number]);
    }
  };


  return (
    <div className="flex justify-center w-full">
      <Slider
        label="Price"
        step={10}
        minValue={0}
        maxValue={1000}
        formatOptions={{ style: "currency", currency: "USD" }}
        className="w-full sm:w-3/4 pr-2"
        onChange={handleOnChange}
        color="warning"
        value={value}
      />
    </div>
  );
}
