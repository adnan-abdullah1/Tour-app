import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PackagePlaceToSee() {
  const places = [
    {
      title: "Adventurous Havelock",
      image: "https://gotrip-appdir.vercel.app/img/gallery/1/2.png",
    },
    {
      title: "Sunset at Radhanagar Beach",
      image: "https://gotrip-appdir.vercel.app/img/hotels/1.png",
    },
    {
      title: "Historic Cellular Museum",
      image: "https://gotrip-appdir.vercel.app/img/gallery/1/4.png",
    },
    {
      title: "Beautiful Elephant Beach",
      image: "https://gotrip-appdir.vercel.app/img/gallery/1/5.png",
    },
    {
      title: "Scenic Neil Island",
      image: "https://gotrip-appdir.vercel.app/img/hotels/2.png",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-red-500 pl-3">
        Places You'll See
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {places.map((place, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-2/3 sm:basis-1/2 md:basis-1/3"
            >
              <div className="overflow-hidden rounded-xl shadow hover:shadow-md transition">
                <div className="relative w-full h-48">
                  <Image
                    src={place.image}
                    alt={place.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="p-2 text-center font-medium text-sm">
                  {place.title}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-5 top-1/2 transform -translate-y-1/2 shadow-lg rounded-full p-2 bg-white hover:bg-gray-100 transition" />
        <CarouselNext className="absolute -right-5 top-1/2 transform -translate-y-1/2 shadow-lg rounded-full p-2 bg-white hover:bg-gray-100 transition" />
      </Carousel>
    </div>
  );
}
