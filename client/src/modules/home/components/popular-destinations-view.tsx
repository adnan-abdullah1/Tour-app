'use client';

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TypographyExtraSmallMuted } from "@/components/ui/typography";

export default function PopularDestinations() {
  const images = Array(5).fill({
    url: "https://gotrip-appdir.vercel.app/_next/image?url=%2Fimg%2Fdestinations%2F1%2F1.png&w=384&q=75",
    name: "Bali, Indonesia",
    location: "Westminster Borough, London",

  });

  return (
    <div className="h-[450px] flex pt-[70px] justify-center">
      <div className="w-4/5">
        <p className="text-[var(--tour-color-primary)] font-bold">Popular Destinations</p>
        <div className="flex justify-between items-start mb-6">
          <TypographyExtraSmallMuted>
            These popular destinations have a lot to offer
          </TypographyExtraSmallMuted>
          <span className="text-sm bg-[var(--tour-bg-color-secondary-light)]
            hover:bg-[var(--tour-bg-color-primary)] text-[var(--tour-color-secondary)]
            hover:text-white p-2.5 cursor-pointer rounded-md transition ease-in-out duration-500">
            View All Destinations
          </span>
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
                  lg:basis-1/4"
              >
                <div className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-md group">
                  <Image
                    src={img.url}
                    alt={`Destination ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                    
                    {/* Top Info */}
                    <div className="text-white text-xs">
                      14 Hotels – 22 Cars – 18 Tours
                    </div>

                    {/* Bottom Info */}
                    <div>
                      <p className="text-white font-bold">{img.name}</p>
                      <button className="mt-2 text-xs text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition duration-300 opacity-0 group-hover:opacity-100">
                        Discover
                      </button>
                    </div>
                  </div>
                </div>
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
