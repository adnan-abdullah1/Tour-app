import { TypographyExtraSmallMuted } from "@/components/ui/typography";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function FooterView() {
    return (
        <div className="h-[350px] flex mb-3 flex-col items-center justify-between pt-[60px] w-4/5 ml-[130px] space-y-4">
            <div className="grid gap-8 w-full  
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-5">
                {/* Contact Us */}
                <div >
                    <h3 className="font-semibold text-lg">Contact Us</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <TypographyExtraSmallMuted>Toll free customer care</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Need Live support</TypographyExtraSmallMuted>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h3 className="font-semibold text-lg">Company</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <TypographyExtraSmallMuted>About Us</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Careers</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Gift Cards</TypographyExtraSmallMuted>
                    </div>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold text-lg">Support</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <TypographyExtraSmallMuted>Contact</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Legal Notice</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Privacy Policy</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Terms and Conditions</TypographyExtraSmallMuted>
                    </div>
                </div>

                {/* Other Services */}
                <div>
                    <h3 className="font-semibold text-lg">Other Services</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <TypographyExtraSmallMuted>Car Hire</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Activity Finder</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Tour List</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Flight finder</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Cruise Ticket</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Holiday Rental</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Travel Agents</TypographyExtraSmallMuted>
                    </div>
                </div>

                {/* Mobile */}
                <div>
                    <h3 className="font-semibold text-lg">Mobile</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <TypographyExtraSmallMuted>Apple</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Google play</TypographyExtraSmallMuted>
                    </div>
                </div>
            </div>

            {/* Horizontal line */}
            <hr className="w-full border-t border-gray-300 my-4" />

            {/* Copyright Section */}
            <div className="w-full flex flex-col items-center justify-between gap-6 md:flex-row xs:items-start text-sm text-gray-600">
                {/* Left side */}
                <div className="flex flex-wrap flex-row gap-4 text-center md:text-left">
                    <div className="flex gap-2 items-start">
                        <TypographyExtraSmallMuted>@ 2023 ib-themes</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>All Rights Reserved</TypographyExtraSmallMuted>
                    </div>

                    <div className="flex gap-4">
                        <TypographyExtraSmallMuted>Privacy</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Terms</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>Site Map</TypographyExtraSmallMuted>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-start w-full md:w-auto text-left gap-4 md:items-end md:text-right">
                    <div className="flex gap-2">
                        <TypographyExtraSmallMuted>English</TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted>$USD</TypographyExtraSmallMuted>
                    </div>
                    <div className="flex justify-start gap-4 md:justify-end">
                        <TypographyExtraSmallMuted><Facebook /></TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted><Twitter /></TypographyExtraSmallMuted>
                        <TypographyExtraSmallMuted><Instagram /></TypographyExtraSmallMuted>
                        {/* <span>In</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
