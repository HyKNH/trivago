// app/pages/Hotels/page.tsx
import {Autocomplete,AutocompleteItem} from "@nextui-org/react";

export default function listings() {
  return ( 
   <div className="flex flex-wrap">
      <div 
        className="bg-white h-screen flex-initial w-1/4 text-black">
          <h3 
          className="text-xl font-500 mb-2 font-sans tracking-tighter ">
            Search by hotel name
            </h3>

          <hr className=""/>
          <button>2</button>
      </div>
      <div
      className="ms-10"
      >
        content
      </div>
   </div>
  );
}