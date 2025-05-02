// import { TypographyExtraSmallMuted } from "@/components/ui/typography";
import { Facebook, Instagram } from "lucide-react";
import { X, Music } from "lucide-react"; // Using 'X' as Twitter (new) and 'Music' as TikTok placeholder.

export default function FooterView() {
    return (
        <div className="flex flex-col items-center w-full bg-[#f9f7f6] pt-12 pb-8 space-y-8">
            {/* Top Grid Links */}
            <div className="grid w-4/5 gap-8 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-3
                text-[#b0004b]">
                {/* First Column */}
                <div className="flex flex-col space-y-3 text-sm font-medium">
                    <span>About Us</span>
                    <span>Work with us</span>
                    <span>Blog</span>
                </div>

                {/* Second Column */}
                <div className="flex flex-col space-y-3 text-sm font-medium">
                    <span>FAQs</span>
                    <span>Contact us</span>
                    <span>Become an Affiliate</span>
                </div>

                {/* Third Column */}
                <div className="flex flex-col space-y-3 text-sm font-medium">
                    <span>Destination Guides</span>
                    <span>Featured Destinations</span>
                    <span>Holiday Types</span>
                </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-6 text-[#b0004b]">
                <Instagram size={24} />
                <X size={24} />
                <Music size={24} /> {/* TikTok placeholder */}
                <Facebook size={24} />
            </div>

            {/* Divider */}
            <hr className="w-4/5 border-t border-gray-300" />

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#b0004b] font-medium">
               
                <span>Cookies</span>
                <span>Manage Preferences</span>
                <span>Privacy</span>
                <span>Terms and conditions</span>
            </div>

            {/* Company Info */}
            <div className="text-center text-xs text-gray-500">
                Copyright © 2025 Icelolly Marketing Ltd |
                Registered in England Company No. 05655962 |
                VAT No. GB175996442
            </div>
        </div>
    );
}
