import React from 'react';
import {Button} from "@nextui-org/button";
import {Image} from "@nextui-org/image";
import { Link } from "@nextui-org/link";

const FeaturedPage = () => {
    return (
        <section className='move-right flex px-4 items-center gap-12 container mx-auto'>
            <div className='py-10 h-full'>
                <h1 className='header-featured font-heading mb-6'>Find and <span className="gradient-text">reserve</span> your <br/>dream vacation</h1>
                <p className='para-featured text-[#000000] mb-12 max-w-lg'>
                    Experience luxury and comfort at unbeatable prices, reserved just for you.
                </p>
                <Button as={Link} size="lg" radius="full" className="bg-gradient-to-tr from-orange-500 to-yellow-500 text-white shadow-lg" href="/hotels">Get Started</Button>
            </div>

            <div className='md:grid grid-cols-2 gap-12'>
                <div className='rounded-2xl overflow-hidden h-48'>
                <Image
                    isZoomed
                    width={300}
                    height={300}
                    alt="Beach"
                    src="https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg"
                />
                </div>

                <div className='rounded-2xl overflow-hidden h-48'>
                <Image
                    isZoomed
                    width={300}
                    height={300}
                    alt="Venice"
                    src="https://images.pexels.com/photos/7245101/pexels-photo-7245101.jpeg"
                />
                </div>

                <div className='rounded-2xl overflow-hidden h-48'>
                <Image
                    isZoomed
                    width={300}
                    height={300}
                    alt="Venice"
                    src="https://images.pexels.com/photos/7245101/pexels-photo-7245101.jpeg"
                />
                </div>

                <div className='rounded-2xl overflow-hidden h-48'>
                <Image
                    isZoomed
                    width={300}
                    height={300}
                    alt="China"
                    src="https://images.pexels.com/photos/2915957/pexels-photo-2915957.jpeg"
                />
                </div>
            </div>
        </section>
    );
}

export default FeaturedPage;