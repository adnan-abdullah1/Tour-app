import Image from 'next/image';

export default function HomeView() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"
        alt="home"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,16,54,0.95)] to-[rgba(5,16,54,0.3)] z-[1]" />
      <div className="relative z-[2]">
        {/* Add your text or components here */}
      </div>
    </div>
  );
}
