// app/pages/Hotels/page.tsx
import React from "react";
import SearchBar from "../components/serchbar";
import Content from "../components/mainHotels";

export default function listings() {
  return ( 
  <div>
    <SearchBar/>
    <Content/>
  </div>
  
  );
}