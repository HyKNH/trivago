import React from 'react';
import {Button} from "@nextui-org/button";
import {Image} from "@nextui-org/image";
import { Link } from "@nextui-org/link";

/**
 * # Module: FeaturedPage
 *
 * ## Date:
 * November 12, 2024
 *
 * ## Programmer:
 * Francis Nguyen
 *
 * ## Description:
 * `FeaturedPage` is a promotional landing page component showcasing luxury vacation options. 
 * It features a headline, description, and a responsive grid of destination images.
 * The layout adapts seamlessly to different screen sizes.
 *
 * ## Important Functions:
 * - **FeaturedPage** (default export):
 *   - **Input**: None
 *   - **Output**: JSX.Element
 *   - **Description**:
 *     Creates a responsive promotional layout with two main sections:
 *     1. A **Text Section**:
 *        - Contains a headline, descriptive paragraph, and a "Get Started" button linking to the hotels page.
 *     2. A **Grid Section**:
 *        - Displays four featured images of vacation destinations (Beach, Paris, Venice, and China).
 *
 * ## Data Structures:
 * - None: Image properties and text are statically defined within JSX.
 *
 * ## Algorithms Used:
 * - **Responsive Layout**:
 *   - Utilizes CSS Flexbox and Grid for a responsive and visually appealing layout.
 *   - **Reason**: CSS Grid and Flexbox are standard, efficient tools for creating responsive designs without requiring additional JavaScript logic.
 */

const FeaturedPage = () => {
    return (
        <section className='mx-auto flex flex-col md:flex-row items-center justify-center gap-12 py-40'>
            {/* Text Section */}
            <div className='py-10 h-full px-4'>
                <h1 className='header-featured font-heading mb-6'>Find and <span className="gradient-text">reserve</span> your <br/>dream vacation</h1>
                <p className='para-featured text-[#000000] mb-12 max-w-lg'>
                    Experience luxury and comfort at unbeatable prices, reserved just for you.
                </p>
                <Button as={Link} size="lg" radius="full" className="bg-gradient-to-tr from-orange-500 to-yellow-500 text-white shadow-lg" href="/hotels">Get Started</Button>
            </div>

            {/* Featured Images Section */}
            <div className='md:grid grid-cols-2 gap-12'>
                {/* Beach Image */}
                <div className='rounded-2xl overflow-hidden h-48 py-4'>
                <Image
                    isZoomed
                    width={300}
                    height={300}
                    alt="Beach"
                    src="https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg"
                />
                </div>

                {/* Paris Image */}
                <div className='rounded-2xl overflow-hidden h-48 py-4'>
                <Image
                    isZoomed
                    width={300}
                    height={300}
                    alt="Paris"
                    src="https://images.pexels.com/photos/352519/pexels-photo-352519.jpeg"
                />
                </div>

                {/* Venice Image */}
                <div className='rounded-2xl overflow-hidden h-48 py-4'>
                <Image
                    isZoomed
                    width={300}
                    height={300}
                    alt="Venice"
                    src="https://images.pexels.com/photos/7245101/pexels-photo-7245101.jpeg"
                />
                </div>

                {/* China Image */}
                <div className='rounded-2xl overflow-hidden h-48 py-4'>
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