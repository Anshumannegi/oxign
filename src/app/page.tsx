import Image from 'next/image'
import Navbar from "@/app/navbar/page";
import HeroComponent from './HeroComponent/page';
import FeaturedProduct from './component/Featureproduct';

export default function Home() {
  return (
    <div>
    <Navbar />
     {/* Home Section */}
      {/* Hero Component  */}
      <HeroComponent />
      <FeaturedProduct/>
  </div>
  )
}
