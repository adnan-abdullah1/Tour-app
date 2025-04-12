import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function PackageDetails() {
  return (
    <div >
      <div className='grid  sm:grid-cols-12 p-4 mt-4 '>
        <div className='col-span-12  sm:col-span-6 flex flex-col'>
          <span>The Montcalm At Brewery London City</span>
          <span>Westminster Borough, London
          </span>
        </div>
        <div className='col-span-12 sm:col-span-6 flex flex-col md:flex-row justify-center md:justify-end items-center gap-y-4 md:gap-y-0 gap-x-0 md:gap-x-2'>
          <span>from 72</span>
          <Button variant='tour_button_primary'>Book</Button>
        </div>

      </div>
      <div className="grid  sm:grid-cols-12 sm:grid-rows-12 gap-4 p-4">
        {/* Main Left Box */}
        <div className="relative col-span-12 lg:col-span-6 sm:row-span-12 min-h-[200px] rounded bg-gray-500 shadow-xl overflow-hidden">
          <Image
            src="https://gotrip-appdir.vercel.app/img/hotels/1.png"
            alt="Main"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right Side Boxes */}
        <div className="relative col-span-12 sm:col-span-6 lg:col-span-3 sm:row-span-6 min-h-[200px] rounded bg-teal-600 shadow-xl overflow-hidden">
          <Image
            src="https://gotrip-appdir.vercel.app/img/gallery/1/2.png"
            alt="Box 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative col-span-12 sm:col-span-6 lg:col-span-3 sm:row-span-6 min-h-[200px] rounded bg-teal-600 shadow-xl overflow-hidden">
          <Image
            src="https://gotrip-appdir.vercel.app/img/gallery/1/4.png"
            alt="Box 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative col-span-12 sm:col-span-6 lg:col-span-3 sm:row-span-6 min-h-[200px] rounded bg-teal-600 shadow-xl overflow-hidden">
          <Image
            src="https://gotrip-appdir.vercel.app/img/gallery/1/5.png"
            alt="Box 3"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative col-span-12 sm:col-span-6 lg:col-span-3 sm:row-span-6 min-h-[200px] rounded bg-teal-600 shadow-xl overflow-hidden">
          <Image
            src="https://gotrip-appdir.vercel.app/img/hotels/2.png"
            alt="Box 4"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>

  );
}
