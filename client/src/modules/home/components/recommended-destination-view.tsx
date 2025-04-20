"use client"
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TypographyExtraSmallMuted } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

interface Package {
    id: string;
    name: string;
    location: string;
    rating: number;
    price: string;
    media: { url: string }[];
    reviewCount?: number; // optional fallback
  }

export default function RecommendedDestinations() {
    const [packages, setPackages] = useState<any[]>([]);

    useEffect(() => {
        async function fetchPackages() {
            try {
                const res = await fetch("http://localhost:5000/api/package");
                const data = await res.json();
                setPackages(data || []);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        }

        fetchPackages();
    }, []);

    return (
        <div className="h-screen flex pt-[100px] justify-center">
            <div className="w-4/5">
                <p className="text-[var(--tour-color-primary)] font-bold">Recommended Packages</p>
                <div className="flex justify-between items-center mb-6">
                    <TypographyExtraSmallMuted>
                        These popular destinations have a lot to offer
                    </TypographyExtraSmallMuted>
                </div>

                <Carousel opts={{ align: "start" }} className="w-full max-w-full">
                    <CarouselContent className="-ml-4">
                        {packages.map((pkg, index) => (
                            <CarouselItem
                                key={pkg._id || index}
                                className="pl-4 
                                           basis-full 
                                           sm:basis-1/2 
                                           md:basis-1/3 
                                           lg:basis-1/5"
                            >
                                <Link href={`/packages/${pkg._id}`} className="block">
                                <Card className="overflow-hidden rounded-xl shadow-md group border-none !bg-transparent !shadow-none">
                                    <div className="relative w-full h-[200px] overflow-hidden rounded-sm">
                                        {pkg.imageUrls?.[0] ? (
                                            <Image
                                                src={pkg.imageUrls?.[0]}
                                                alt={`Destination ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <h3 className="text-lg font-semibold">{pkg.title}</h3>
                                        <p className="text-sm text-gray-500">{pkg.location || 'Kashmir'}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-white text-xs px-2 py-1 rounded" style={{ backgroundColor: '#3554d1' }}>
                                                ⭐ {pkg.rating || 0}
                                            </span>
                                            <span className="text-xs text-gray-500">{"0 reviews"}</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 mt-1">
                                            Starting from ${pkg.price}
                                        </p>
                                    </div>
                                </Card>
                               </Link>
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
