import Image from 'next/image';

export default function HomeView() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Image
        src="https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"
        alt="home"
        fill
        style={{ objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(5, 16, 54, 0.95), rgba(5, 16, 54, 0.3))',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Add your text or components here */}
      </div>
    </div>
  );
}
