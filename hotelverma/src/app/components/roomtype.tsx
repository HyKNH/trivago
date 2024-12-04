"use client";
import React from "react";
import {Input} from "@nextui-org/input";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value.toLowerCase()); // Convert input to lowercase for case-insensitive search
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-start ml-5">
      <Input
        placeholder="New York"
        className="w-full"
        onChange={handleInputChange}
      />
    </div>
  );
}