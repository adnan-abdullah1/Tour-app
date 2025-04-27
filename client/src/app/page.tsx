import HomeView from "@/modules/home/components/home-view";
import HolidaysInspiration from "./(root)/home/components/holiday-inspirations";
import FeaturesSlider from "./(root)/home/components/slider";
import PopularDestinations from "@/modules/home/components/popular-destinations-view";




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
