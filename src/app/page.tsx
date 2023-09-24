
import FeaturedProduct from './component/Featureproduct';
import HeroProduct from "./component/HeroProduct";

export default function Home() {
  return (
    <div>
      <HeroProduct />
      <FeaturedProduct />
  </div>
  )
}

export function generateMetadata(){
  return{
    title:"Home Page",
    description:"Oxign lab"
  }
}