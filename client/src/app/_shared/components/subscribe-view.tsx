import { Button } from "@/components/ui/button";

export default function Subscribe() {
    return (
        <div className="bg-[var(--tour-bg-color-primary)]  pt-4 mt-[60px]">
            <div className="w-3/4 max-w-6xl ml-[130px] h-[200px]  py-6 flex flex-col gap-4 md:flex-row items-center justify-between text-white">
                
                {/* Left Section: Icon & Text */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="mb-1">🚀</div> {/* Replace with actual icon */}
                    <div className="text-lg font-semibold">Your Travel Journey Starts Here</div>
                </div>

                {/* Right Section: Input & Button */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
                    <input 
                        type="text" 
                        placeholder="Enter your email"
                        className="px-4 py-2 text-white border border-white rounded w-full sm:w-[250px]"
                    />
                    <Button className="w-full sm:w-auto">Subscribe</Button>
                </div>
            </div>
        </div>
    );
}
