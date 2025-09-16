import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import { userStore } from '../store/userStore';

import CartItem from '../components/CartItem';

const CartPage = () => {
	const navigate = useNavigate();

	const { cart, cartTotal, getUserCart } = userStore();

	const checkoutCart = () => {
		cart ? navigate(`/checkout?cart_id=${cart._id}`) : navigate('/');
		return;
	};

	useEffect(() => {
		try {
			getUserCart();
		} catch (error) {
			console.error(error);
			toast.error(
				error.message || 'Error fetching cart please refresh'
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="w-[100vw] min-h-[100vh]  h-max flex flex-col items-center bg-gradient-to-bl from-bg-[#ffffffff] from-0%  via-[#ff9d6c] via-40%  to-[##ff874b] to-100% relative  ">
			<motion.nav
				initial={{ opacity: 0, y: -200 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="fixed flex justify-center top-0 left-0 right-0  z-90 "
			>
				<ul className="flex px-2 py-2.5 justify-evenly w-[90vw] sm:justify-evenly bg-[#ebebeb4a] mt-2 rounded-xl border-1 border-[#808080] max-xs:w-[90vw] sm:w-[80vw] md:w-[60vw]">
					<Link
						to={'/'}
						className=" h-8 font-[Supreme-ExtraBold] text-black w-max sm:text-2xl sm:h-9 text-center md:size-10 md:text-4xl "
					>
						<HomeIcon className="md:size-8" />
					</Link>
					<h1 className="h-8 font-[Supreme-Bold] text-black w-max sm:text-xl sm:h-9 text-center md:text-2xl">
						Cart
					</h1>
					<h1 className="h-8 font-[Supreme-Bold] text-black w-max sm:text-xl sm:h-9 text-center md:text-2xl">
						Ksh : {cart ? cart.subtotal : '0'}
						{/* Ksh : 5000 */}
					</h1>
				</ul>
			</motion.nav>
			<div className="mt-17 mb-5 grid flex-col justify-center sm:mt-20 gap-y-5  sm:mb-23 ">
				{cart ? (
					cart.items.map((item, index) => {
						return <CartItem key={index} item={item} />;
					})
				) : (
					<p className=" h-screen flex text-center justify-center align-middle text-xl md:text-2xl ">
						No Cart available
					</p>
				)}
			</div>
			<div className="fixed h-15 z-20 bottom-0 left-0 right-0  rounded flex justify-around align-middle sm:h-20 min-pc:h-18 min-pc:backdrop-blur-sm ">
				<section className="w-[90vw] h-12  bg-white flex justify-around  align-middle rounded text-center text-[1.2rem] font-medium sm:h-15 sm:text-[1.8rem]  min-pc:h-16 ">
					<p className=" my-auto ">
						Products: {cart ? cartTotal : '0'}
					</p>
					<motion.button
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.98 }}
						transition={{ duration: 0.1 }}
						onClick={checkoutCart}
						className="text-center cursor-pointer h-10  text-[14px] my-auto bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 py-0.5 px-2.5  rounded text-white sm:text-[1.6rem]   min-pc:text-[1.01rem]  "
					>
						Checkout Cart
					</motion.button>
				</section>
			</div>
		</main>
	);
};

export default CartPage;
