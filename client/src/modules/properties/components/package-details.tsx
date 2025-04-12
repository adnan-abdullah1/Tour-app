import Image from 'next/image';

export default async function PackageDetails() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-12 sm:grid-rows-12 gap-4 p-4">
      {/* Main Left Box */}
      <div className="relative col-span-12 lg:col-span-6 sm:row-span-12 min-h-[200px] rounded bg-gray-500 shadow-xl overflow-hidden">
        <Image
          src="https://gotrip-appdir.vercel.app/img/hotels/1.png"
          alt="Main"
          fill
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
  );
}
