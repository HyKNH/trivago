// app/page.tsx
import * as React from "react";
import NavBar from "./components/navbar";
import SearchBar from "./components/serchbar";
import FeaturedPage from "./components/featured";


export default function Page() {
  return (
    <div className="">
      <NavBar/>
      <FeaturedPage/>
      <SearchBar/>
    </div>
    
  );
}
