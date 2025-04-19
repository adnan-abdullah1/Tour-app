import { Button } from '@/components/ui/button';
import { TypographyExtraSmallMuted } from '@/components/ui/typography';
import Image from 'next/image';

interface PackageDetailsProps {
  packageId: string;
}

export default async function PackageDetails({ packageId }: PackageDetailsProps) {
  let data: any = null;

  // try {
  //   const res = await fetch(`http://localhost:5000/api/package/${packageId}`, {
  //     cache: 'no-store',
  //   });
  //   data = await res.json();
  // } catch (error) {
  //   console.error('Failed to fetch package details:', error);
  // }



  const images = data?.media?.length ? data.media : [


    { url: "https://image.kesari.in/upload/HE/Funcampus-Kufri.jpg" },
    { url: "https://image.kesari.in/upload/HE/WAGAHBORDER1.jpg" },
    { url: "https://image.kesari.in/upload/HE/Gyuto_Monastery_Main1.jpg" },
  ];

  return (
    <div>
      <div className="grid sm:grid-cols-12 p-4 mt-4">
        <div className="col-span-12 sm:col-span-6 flex flex-col">
          <span>{data?.name || 'The Montcalm At Brewery London City'}</span>
          <TypographyExtraSmallMuted>
            {data?.location || 'Westminster Borough, London'}
          </TypographyExtraSmallMuted>
        </div>
        <div className="col-span-12 sm:col-span-6 flex flex-col md:flex-row justify-center md:justify-end items-center gap-y-4 md:gap-y-0 gap-x-0 md:gap-x-2">
          <span>from ${data?.price || '72'}</span>
          <Button variant="tour_button_primary">Book</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-12 sm:grid-rows-12 gap-4 p-4">
        {/* First Large Image */}
        <div className="relative col-span-12 lg:col-span-6 sm:row-span-12 min-h-[200px] rounded bg-gray-500 shadow-xl overflow-hidden">
          <Image
            src={images[0]?.url}
            alt="Main"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Other Images */}
        {images.slice(1).map((img: { url: string, path: string }, index: number) => (
          <div
            key={index}
            className="relative col-span-12 sm:col-span-6 lg:col-span-3 sm:row-span-6 min-h-[200px] rounded bg-teal-600 shadow-xl overflow-hidden"
          >
            <Image
              src={img.url}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
