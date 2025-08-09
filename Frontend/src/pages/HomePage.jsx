import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import ProductsSection from '../sections/ProductsSection';
import FooterSection from '../sections/FooterSection';

const HomePage = () => {

    return(
        <div className='w-screen h-screen  ' >
            <Navigation />
            <HeroSection  />
            <ProductsSection />
            <FooterSection />
        </div>
    );
};

export default HomePage;