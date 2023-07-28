import Image from 'next/image'
import Navbar from "@/app/navbar/page";
import FeaturedProduct from './component/Featureproduct';
import HeroProduct from "./component/HeroProduct";

export default function Home() {
  return (
    <div>
    <Navbar />
     {/* Home Section */}
      {/* Hero Component  */}
      <HeroProduct />
      <FeaturedProduct />
  </div>
  )
}
