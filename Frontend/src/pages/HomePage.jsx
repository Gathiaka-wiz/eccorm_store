import { useEffect } from 'react';

// Components
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import ProductsSection from '../sections/ProductsSection';
import FooterSection from '../sections/FooterSection';

// Store
import { userStore } from '../store/userStore';
import { useAuthStore } from '../store/authStore';

const HomePage = () => {
	const { getProducts, products, getUserCart } = userStore();
	const { isAuthenticated } = useAuthStore();

	useEffect(() => {
		try {
			getProducts();
			isAuthenticated ? getUserCart() : null;
		} catch (error) {
			console.error('Error fetching products:', error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="w-screen h-screen  ">
			<Navigation />
			<HeroSection />
			<ProductsSection />
			<FooterSection />
		</div>
	);
};

export default HomePage;
