import { Typography, Button } from 'antd';
import Hero from '../components/Hero/Hero'; 
import BrandsMarquee from '../components/BrandMarquee/BrandsMarquee';
import ModelFinder from '../components/ModelFinder/ModelFinder';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import OfferBanner from '../components/OfferBanner/OfferBanner';
import WhyRedCase from '../components/WhyRedCase/WhyRedCase';
import Testimonials from '../components/testimonials/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <BrandsMarquee />
      <ModelFinder />
      <FeaturedProducts />
      <OfferBanner />
      <WhyRedCase />
      <Testimonials />
    </>
  );
}