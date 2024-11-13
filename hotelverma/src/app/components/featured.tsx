import React from 'react';
import {Button} from "@nextui-org/button";

const FeaturedPage = () => {
    return (
        <section className='flex px-4 items-center gap-12 container mx-auto'>
            <div className='py-10 h-full'>
                <h1 className='headerFeatured font-heading mb-6'>Find and <span className="gradient-text">reserve</span> your <br/>dream vacation</h1>
                <p className='text-[#000000] mb-12 max-w-lg'>
                    Experience luxury and comfort at unbeatable prices, reserved just for you.
                </p>
                <Button color="primary" href="/hotels">Get Started</Button>

            </div>
        </section>


    );
}

export default FeaturedPage;