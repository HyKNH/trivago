"use client";
import React from "react";
import {Button} from "@nextui-org/button";
import SearchSelect from "./autoComplete"
import Menu from "./dropdownMenu";
import Calendar from "./Calendar"
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-start ml-5 mt-8">
        <h1 className="w-full text-xl font-semibold pl-3">Quick Search</h1>
        <SearchSelect/>
        <Calendar/>
        <Menu/>
        <button className="border-solid rounded-full border-2 p-1.5 border-yellow-500"><FaSearch className="size-6" /></button>
      </div>
    
  );
}