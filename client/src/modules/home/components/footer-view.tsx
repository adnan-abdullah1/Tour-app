import { Facebook, Instagram, Twitter } from "lucide-react";

export default function FooterView() {
    return (
        <div className="h-[70vh] flex flex-col items-center justify-between pt-[60px] w-4/5 ml-[130px] space-y-4">
            <div className="grid gap-8 w-full  
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-5">
                {/* Contact Us */}
                <div>
                    <h3 className="font-semibold text-lg">Contact Us</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <span>Toll free customer care</span>
                        <span>Need Live support</span>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h3 className="font-semibold text-lg">Company</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <span>About Us</span>
                        <span>Careers</span>
                        <span>Gift Cards</span>
                    </div>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold text-lg">Support</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <span>Contact</span>
                        <span>Legal Notice</span>
                        <span>Privacy Policy</span>
                        <span>Terms and Conditions</span>
                    </div>
                </div>

                {/* Other Services */}
                <div>
                    <h3 className="font-semibold text-lg">Other Services</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <span>Car Hire</span>
                        <span>Activity Finder</span>
                        <span>Tour List</span>
                        <span>Flight finder</span>
                        <span>Cruise Ticket</span>
                        <span>Holiday Rental</span>
                        <span>Travel Agents</span>
                    </div>
                </div>

                {/* Mobile */}
                <div>
                    <h3 className="font-semibold text-lg">Mobile</h3>
                    <div className="flex flex-col mt-4 text-sm text-gray-600 space-y-3">
                        <span>Apple</span>
                        <span>Google play</span>
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
                        <span>@ 2023 ib-themes</span>
                        <span>All Rights Reserved</span>
                    </div>

                    <div className="flex gap-4">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Site Map</span>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-start w-full md:w-auto text-left gap-4 md:items-end md:text-right">
                    <div className="flex gap-2">
                        <span>English</span>
                        <span>$USD</span>
                    </div>
                    <div className="flex justify-start gap-4 md:justify-end">
                        <span><Facebook /></span>
                        <span><Twitter /></span>
                        <span><Instagram /></span>
                        {/* <span>In</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
