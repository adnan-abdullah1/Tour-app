"use client"
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TypographyExtraSmallMuted } from "@/components/ui/typography";
import Image from "next/image";

export default function RecommendedDestinations() {
    const images = Array(5).fill({
        url: "https://gotrip-appdir.vercel.app/_next/image?url=%2Fimg%2Fdestinations%2F1%2F1.png&w=384&q=75",
        name: "Bali, Indonesia",
        location: "Westminster Borough, London",
        rating: 4.2,
        reviewCount: 3112,
        price: 32

    });
    return (
        <div className="h-screen flex pt-[120px] justify-center">
            <div className="w-4/5">
                <p className="text-[var(--tour-color-primary)] font-bold">Recommended Tours</p>
                <div className="flex justify-between items-center mb-6">
                    <TypographyExtraSmallMuted>
                        These popular destinations have a lot to offer
                    </TypographyExtraSmallMuted>

                </div>

                {/* Carousel */}
                <Carousel opts={{ align: "start" }} className="w-full max-w-full">
                    <CarouselContent className="-ml-4">
                        {images.map((img, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 
                                           basis-full 
                                           sm:basis-1/2 
                                           md:basis-1/3 
                                           lg:basis-1/5"

                            >
                                <Card className="overflow-hidden rounded-xl shadow-md group border-none !bg-transparent !shadow-none">
                                    <div className="relative w-full h-[200px] overflow-hidden rounded-sm">
                                        <Image
                                            src={img.url}
                                            alt={`Destination ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <h3 className="text-lg font-semibold">{img.name}</h3>
                                        <p className="text-sm text-gray-500">{img.location}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-white text-xs px-2 py-1 rounded" style={{ backgroundColor: '#3554d1' }}>
                                                ⭐ {img.rating}
                                            </span>
                                            <span className="text-xs text-gray-500">{img.reviewCount} reviews</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 mt-1">
                                            Starting from ${img.price}
                                        </p>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>
        </div>
    );
}