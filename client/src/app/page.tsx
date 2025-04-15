import HomeView from "@/modules/home/components/home-view";
import PopularDestinations from "@/modules/home/components/popular-destinations-view";
import RecommendedDestinations from "@/modules/home/components/recommended-destination-view";
import Subscribe from "@/modules/home/components/subscribe-view";


export default function Home() {
  return (
    <>
    <HomeView />
    <PopularDestinations />
    <RecommendedDestinations />
    
    </>
      
  );
}
