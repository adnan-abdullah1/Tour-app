

import { Button } from '@/components/ui/button';
import { TypographyExtraSmallMuted } from '@/components/ui/typography';
import Image from 'next/image';
import ClientRedirectButton from './redirection-view';

interface PackageDetailsProps {
  packageId: string;
}

export default async function PackageDetails({ packageId }: PackageDetailsProps) {


  let data: any = null;

  try {
    const res = await fetch(`http://localhost:5000/api/package/price-details/${packageId}`, {
      cache: 'no-store', // or 'force-cache' depending on your preference
    });
    data = await res.json();
  } catch (error) {
    console.error('Failed to fetch package details:', error);
  }

 


  return (
    <div>
      <div className="grid sm:grid-cols-12 p-4 mt-4">
        <div className="col-span-12 sm:col-span-6 flex flex-col">
          <span>{data?.title || 'The Montcalm At Brewery London City'}</span>
          {/* <TypographyExtraSmallMuted>
            {data?.location || 'Westminster Borough, London'}
          </TypographyExtraSmallMuted> */}
        </div>
        <div className="col-span-12 sm:col-span-6 flex flex-col md:flex-row justify-center md:justify-end items-center gap-y-4 md:gap-y-0 gap-x-0 md:gap-x-2">
          <span>from ${data?.price || '72'}</span>
          <ClientRedirectButton redirectionUrl={data?.redirectionUrl} />

        </div>
      </div>

      {data?.imageUrls && (
        <div className="grid sm:grid-cols-12 sm:grid-rows-12 gap-4 p-4">
          {/* First Large Image */}
          <div className="relative col-span-12 lg:col-span-6 sm:row-span-12 min-h-[200px] rounded bg-gray-500 shadow-xl overflow-hidden">
            <Image
              src={data.imageUrls[0]}
              alt="Main"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Other Images */}
          {data.imageUrls.slice(1).map((img: string, index: number) => (
            <div
              key={index}
              className="relative col-span-12 sm:col-span-6 lg:col-span-3 sm:row-span-6 min-h-[200px] rounded bg-teal-600 shadow-xl overflow-hidden"
            >
              <Image
                src={img}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
