import { RiStarSFill } from "react-icons/ri";

export default function Checkbox () {
    const stars = {1: false, 2: false, 3: false, 4: false, 5: false}

    function mychange(star: number) {
        // @ts-expect-error-error
        stars[star] = !stars[star]
        console.log(stars)
    }
    return (
        <div className="flex flex-wrap">
            {/*first checkbox*/}
            <div className="w-full flex">
                <input type="checkbox" id="option1"  className="ml-5" onClick={() =>mychange(1)}/>
                <label htmlFor="option1" className="flex pl-1">1 <RiStarSFill className="mt-1"/></label>
            </div>
            {/*second checkbox*/}
            <div className="w-full flex">
                <input type="checkbox" id="option2"  className="ml-5" onClick={() =>mychange(2)}/>
                <label htmlFor="option2" className="flex pl-1">2 <RiStarSFill className="mt-1"/></label>
            </div>
            {/*third checkbox*/}
            <div className="w-full flex">
                <input type="checkbox" id="option3" className="ml-5" onClick={() =>mychange(3)}/>
                <label htmlFor="option3" className="flex pl-1">3 <RiStarSFill className="mt-1"/></label>
            </div>
            {/*fouth checkbox*/}
            <div className="w-full flex">
                <input type="checkbox" id="option4" className="ml-5" onClick={() =>mychange(4)}/>
                <label htmlFor="option4" className="flex pl-1">4 <RiStarSFill className="mt-1"/></label>
            </div>
            {/*fith checkbox*/}
            <div className="w-full flex">
                <input type="checkbox" id="option5" className="ml-5" onClick={() =>mychange(5)}/>
                <label htmlFor="option5" className="flex pl-1" >5 <RiStarSFill className="mt-1"/></label>
            </div>
        </div>
    );
}