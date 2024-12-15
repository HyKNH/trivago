"use client";
import React from "react";
import {Input} from "@nextui-org/input";

interface SearchBarProps{
  onSearch: (query: string) => void 
  value: string;

}

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