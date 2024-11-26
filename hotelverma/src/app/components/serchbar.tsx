"use client";
import React from "react";
import SearchSelect from "./autoComplete"
import Menu from "./dropdownMenu";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
     // div for putting items into flex layout 
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-start ml-5 mt-8">
        <h1 className="w-full text-xl font-semibold pl-3">Quick Search</h1>
        <SearchSelect/> {/* code found in ./components/autoComplete.tsx*/}
        <Menu/> {/* code found in ./components/dropDownMenu.tsx*/}
        {/*button that has icon that is form react-icons*/}
        <button className="border-solid rounded-full border-2 p-1.5 border-[#F5A524] active:bg-[#F5A524] active:transiton-all hover:scale-110">
          <FaSearch className="size-6" /> 
          </button>
      </div>
    
  );
}