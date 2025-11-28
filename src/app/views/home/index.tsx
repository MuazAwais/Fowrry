import AppSection from "./appSection"
import Hero from "./hero"
import WorkFlow from "./workFlow"
import Categories from "./categories"
import FeaturedStores from "./featuredStores"
import PopularProducts from "./popularProducts"
import DealsSection from "./dealsSection"

const HomeView = () => {
  return (
    <div className="">
      <Hero />
      <Categories />
      <FeaturedStores />
      <PopularProducts />
      <DealsSection />
      <WorkFlow />
      <AppSection />
    </div>
  )
}

export default HomeView