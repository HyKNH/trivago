"use client";
import React from "react";
import {Input} from "@nextui-org/input";

// interface to use for setting type for parameters and telling parent what parameters are required for component
interface RoomTypeProps{
  onSearch: (query: string) => void
  value: string;
}

/**
 * A component that renders hotels when search for a type of room.
 * 
 * The `RoomType` component allows users to type a room type (e.g., "Standard") in a text 
 * input field. As the user types, the `onSearch` callback is invoked to handle the 
 * search query.
 * 
 * @param onSearch A callback function that is triggered whenever the input value changes.
 * @param value The current value of the input field.
 * 
 * @returns A JSX element representing the room type search input.
 */

export default function RoomType({ onSearch , value }: RoomTypeProps ) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); 
  }
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-start ml-5">
      <Input
        placeholder="Standard"
        className="w-full"
        onChange={handleInputChange}
        value={value}
      />
    </div>
  );
}