import { Slider } from "@nextui-org/react";

interface PriceSliderProps {
  onChange: (newRange: [number, number]) => void;
}

export default function PriceSlider({ onChange }: PriceSliderProps) {
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
        defaultValue={[0, 500]}
        formatOptions={{ style: "currency", currency: "USD" }}
        className="w-full sm:w-3/4 pr-2"
        onChange={handleOnChange}
        color="warning"
      />
    </div>
  );
}
