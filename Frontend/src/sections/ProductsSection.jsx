import Product from '../components/Product';
import { userStore } from '../store/userStore';

const ProductsSection = () => {
	const { products } = userStore();

	// useEffect(() => {
	//     getProducts();
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<main
			id="Products"
			className="grid grid-cols-2 justify-center  text-center  h-vh w-screen py-10  gap-y-5 bg-gradient-to-br from-orange-400/90 via-orange-300 to-orange-200 bg-no-repeat bg- bg-center max-xs:gap-1 max-xs:py-5 sm:grid-cols-3 min-pc:grid-cols-4   "
		>
			{products
				? products.map((prd) => (
					<Product
						key={prd._id}
						id={prd._id}
						name={prd.product_name}
						price={prd.price}
						image={prd.image.url}
					/>
				))
				: null}

		</main>
	);
};

export default ProductsSection;
