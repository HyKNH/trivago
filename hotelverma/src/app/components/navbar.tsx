'use client';

import React from "react";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import {Logo} from "./Logo";

/**
 * # Module: NavBar
 *
 * ## Date:
 * October 9, 2024
 *
 * ## Programmer:
 * Francis Nguyen
 *
 * ## Description:
 * `NavBar` is a responsive navigation bar componen. 
 * It facilitates navigation across different pages and adapts to various screen sizes.
 * The navigation bar includes:
 * - A brand logo and site name.
 * - Navigation links (Home, Hotels, History).
 * - Login and Sign-up buttons.
 * - A collapsible menu for mobile screens.
 *
 * ## Important Functions:
 * - **NavBar** (default export):
 *   - **Input**: None
 *   - **Output**: JSX.Element
 *   - **Description**: 
 *     Renders the complete navigation bar. Handles the following elements:
 *     - Brand logo with site name displayed prominently.
 *     - Navigation links for major pages.
 *     - Buttons for login and sign-up actions.
 *     - Responsive behavior with a collapsible menu for small screens.
 *
 * ## Data Structures:
 * - `menuItems` (Array<string>):
 *   - Contains the names of the navigation menu items.
 *   - Used for dynamically rendering navigation links in both desktop and mobile layouts.
 *
 * ## Algorithms Used:
 * - **State Management**:
 *   - React's `useState` is utilized for managing the `isMenuOpen` state.
 *   - **Reason**: React's built-in state management is simple and efficient for this component. External libraries were unnecessary for this scope.
 */

export default function NavBar() {
    /** 
    * State for tracking whether the navigation menu is open (mobile view).
    */

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    /**
    * Menu items for navigation. Each item corresponds to a page in the application.
    */
    const menuItems = [
        "Home",
        "Hotels",
        "History",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
            />
            <NavbarBrand>
                <Logo />
                <p className="font-bold text-inherit">Hotel Verma</p>
            </NavbarBrand>
            </NavbarContent>
            
            {/* Navbar content for links (visible on medium and larger screens) */}
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link underline="active" color="warning" href="/">
                    Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/hotels">
                    Hotels
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/history">
                    History
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {/* Navbar content for login and signup buttons */}
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="/login" color="warning">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="warning" href="/signup" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>

            {/* Hamburger menu for smaller screens */}
            <NavbarMenu>
                {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                className="w-full"
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                size="lg"
                color="foreground"
                >
                {item}
                </Link>
                </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
