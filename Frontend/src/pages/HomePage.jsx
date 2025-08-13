import { useEffect } from 'react';

// Components
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import ProductsSection from '../sections/ProductsSection';
import FooterSection from '../sections/FooterSection';

// Store
import { userStore } from '../store/userStore'; 

const HomePage = () => {

        const { getProducts } = userStore();
        
        useEffect(() => {
            getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

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