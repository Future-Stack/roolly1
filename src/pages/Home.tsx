import Banner from "@/components/Home/Banner"
import CantFindSection from "@/components/Home/CantFindSection"
import FeaturedProperties from "@/components/Home/FeatureProperties"
import HeroSection from "@/components/Home/HeroSecrtion"
import LeadershipTeam from "@/components/Home/LeaderShipTeam"
import MapPropertySection from "@/components/Home/MapPropertySection"
import SearchByLocation from "@/components/Home/SearchLocation"


const Home = () => {
  return (
    <div>
      <Banner/>
      <SearchByLocation/>
      <FeaturedProperties/>
      <CantFindSection/>
      <MapPropertySection/>
      <HeroSection/>
      <LeadershipTeam/>
    </div>
  )
}

export default Home
