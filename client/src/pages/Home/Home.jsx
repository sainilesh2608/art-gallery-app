import Navbar from "../../Components/Navbar/Navbar";
import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import FeaturedSection from "../../Components/FeaturedSection/FeaturedSection";
import AboutSection from "../../Components/AboutSection/AboutSection";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Newsletter from "../../Components/Newsletter/Newsletter";

import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <HeroSlider />
      <FeaturedSection />
      <AboutSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

