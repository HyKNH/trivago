"use client";
import React from "react";
import {Input} from "@nextui-org/input";

// interface to use for setting type for parameters and telling parent what parameters are required for component
interface SearchBarProps{
  onSearch: (query: string) => void 
  value: string;
}

/**
 * A component that renders hotels listing when searching a location.
 * 
 * The `SearchBar` component allows users to type a location (e.g., "New York") 
 * in a text input field. As the user types, the `onSearch` callback is invoked 
 * to handle a search query.
 * 
 * @param onSearch A callback function that is triggered whenever the input value changes.
 * @param value The current value of the input field.
 * 
 * @returns A JSX element representing the search bar input.
 */

export default function SearchBar({ onSearch , value}: SearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); 
    
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-start ml-5">
      <Input
        placeholder="New York"
        className="w-full"
        onChange={handleInputChange}
        value={value}
      />
    </div>
  );
}