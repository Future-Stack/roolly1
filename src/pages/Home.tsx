import Banner from "@/components/Home/Banner"
import CantFindSection from "@/components/Home/CantFindSection"
import FeaturedProperties from "@/components/Home/FeatureProperties"
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
    </div>
  )
}

export default Home
