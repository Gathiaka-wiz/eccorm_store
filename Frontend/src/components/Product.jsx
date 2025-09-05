/* eslint-disable no-unused-vars */
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { userStore } from '../store/userStore';
import { useAuthStore } from '../store/authStore';

const Product = ({ id, name, price, image }) => {
	const navigate = useNavigate();

	const { addAndUpdateCart, message, error } = userStore();
	const { isAuthenticated } = useAuthStore();

	const addToCart = (event) => {
		if (!isAuthenticated) {
			navigate('/signin');
			return;
		}
		event.preventDefault();
		try {
			addAndUpdateCart(id, 1);
			toast.success(message || 'Cart updated successfully');
		} catch (error) {
			toast.error(error.message);
			console.error(error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 1000 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{
				once: true,
			}}
			className="flex flex-col items-center justify-center h-50 w-40 bg-[#ffffffd2] overflow-hidden rounded pt-2 pb-2 gap-y-0.5 mr-auto ml-auto text-sm sm:w-55 sm:h-60 sm:gap-1  sm:text-[0.9rem] min-pc:w-65 min-pc:h-75 min-pc:text-[1rem] min-pc:rounded-[8px]  "
		>
			<Link
				to={`/product/${id}`}
				className="flex items-center justify-center  cursor-pointer w-35 h-35 sm:w-45 sm:h-55 min-pc:w-55 min-pc:h-65 "
			>
				<img
					src={image}
					alt={name}
					className="w-full h-full object-cover cursor-pointer "
				/>
			</Link>
			<section className="flex items-center justify-center w-full h-8 sm:h-18 min-pc:h-28 ">
				<p className="font-[Supreme-Medium]  text-center text-black ">
					{name}
				</p>
			</section>
			<section className="flex items-center justify-evenly w-full h-7 sm:h-17 min-pc:h-27 ">
				<p className="font-[Supreme-Medium]  text-center text-black ">
					{' '}
					Ksh {price}
				</p>
				<motion.button
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.98 }}
					transition={{ duration: 0.1 }}
					onClick={addToCart}
					className="text-center text-[11px] bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 py-0.5 px-1  rounded text-white sm:text-[0.8rem]   min-pc:text-[1.01rem] "
				>
					Add to Cart
				</motion.button>
			</section>
		</motion.div>
	);
};

export default Product;
