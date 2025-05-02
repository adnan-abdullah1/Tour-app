import HomeView from "@/app/(root)/home/_components/home-view";
import HolidaysInspiration from "./(root)/home/_components/holiday-inspirations";
import FeaturesSlider from "./(root)/home/_components/slider";
import PopularDestinations from "@/app/(root)/home/_components/popular-destinations-view";




export default function Home() {
  return (
    <>
      <HomeView />
      <FeaturesSlider />
      <HolidaysInspiration />

      <PopularDestinations />
      {/*  <RecommendedDestinations /> */}

    </>

  );
}
