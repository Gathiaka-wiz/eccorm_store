import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Components
import Navigation from '../components/Navigation';

// Store
import { userStore } from '../store/userStore';
import { useAuthStore } from '../store/authStore';

const ProductPage = () => {
	const [quantity, setQuantity] = useState(1);
	const [isCart, setIsCart] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const [popupState, setPopupState] = useState(false);

	const screen = window.innerWidth;
	const { product_id } = useParams();
	const { product, getProduct, addAndUpdateCart } = userStore();
	const { isAuthenticated } = useAuthStore();
	const popup = document.getElementById('popup');

	const navigate = useNavigate();

	useEffect(() => {
		if (screen < 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [screen]);

	const closePopup = () => {
		popup.style.display = 'none';
		setPopupState(false);
	};
	const openPopup = () => {
		popup.style.display = 'flex';
		setPopupState(true);
	};

	const changeQuantity = (state) => {
		if (state === 'increment') {
			if (quantity === product.available_stock) return;
			setQuantity(parseInt(quantity) + 1);
		} else if (state === 'decrement') {
			if (quantity === 1) return;
			setQuantity(parseInt(quantity) - 1);
		}
	};

	const addToCart = async () => {
		if (!isAuthenticated) {
			navigate('/signin');
			return;
		}
		if (isMobile && !popupState) {
			openPopup();
			return;
		}
		if (isMobile && popupState) {
			try {
				await addAndUpdateCart(product_id, quantity);
				toast.success('Cart updated successfully');
			} catch (error) {
				toast.error(error.message);
				console.error(error);
			}
			closePopup();
			return;
		}
		try {
			await addAndUpdateCart(product_id, quantity);
			toast.success('Cart updated successfully');
		} catch (error) {
			toast.error(error.message);
			console.error(error);
		}
	};

	const buyNow = async () => {
		if (!isAuthenticated) {
			navigate('/signin');
			return;
		}
		setIsCart(false);
		if (!isCart) {
			if (isMobile && !popupState) {
				openPopup();
				return;
			}
			if (isMobile && popupState) {
				navigate(`/checkout?product_id=${product_id}`);
				closePopup();
				return;
			}
			navigate(`/checkout?product_id=${product_id}`);
		}
	};

	useEffect(() => {
		if (product_id) {
			try {
				getProduct(product_id);
			} catch (error) {
				toast.error(error.message || 'Error loading product');
				navigate('/');
			}
		} else {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product_id]);

	return (
		<>
			<Navigation />
			{product !== null ? (
				<main className="w-screen h-screen bg-white pt-30 sm:pt-20 ">
					<div className="flex flex-col gap-y-1.5 justify-center align-middle w-screen h-screen  sm:justify-normal min-pc:grid min-pc:grid-cols-2 min-pc:grid-rows-2 min-pc:h-[80vh] min-pc:min-h-max ">
						<section className=" mt-[60vh] flex flex-col gap-y-2 mr-auto ml-auto w-4/5 bg-gray-300 h-68 sm:h-90 sm:w-120  min-pc:w-[80%] ">
							<img
								src={product.image.url}
								alt={product.name}
								className="w-full h-full min-pc:object-fit "
							/>
						</section>
						<section className="flex flex-col text-black gap-y-1 text-left w-screen px-4 text-[1.2rem] sm:text-[1.5rem] sm:px-10  min-pc:w-[100%] ">
							<h2 className="text-[1.3rem] sm:text-[1.6rem] ">
								{product.product_name}
							</h2>
							<hr className="text-gray-400 min-pc:hidden" />
							<h3>Ksh:{product.price}</h3>
							<hr className="text-gray-400 min-pc:hidden " />
							<h3>
								Available Stock :{' '}
								{product.available_stock}
							</h3>
							<hr className="text-gray-400 min-pc:hidden " />
							<p className="mb-15.5 grid  ">
								<span className="text-center bg-orange-400 text-stone-900  ">
									Product Description :
								</span>
								{product.description}
							</p>
						</section>
						<section className="fixed bottom-0 flex justify-around align-middle w-screen h-15 bg-gray-100  py-2 sm:relative sm:bg-white/100 min-pc:w-[100%] min-pc:absolute  ">
							<motion.button
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.98 }}
								transition={{ duration: 0.1 }}
								onClick={buyNow}
								className="text-center w-20 cursor-pointer h-10 text-[14px] bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 py-0.5 px-1  rounded text-white sm:text-[0.8rem] sm:w-25    min-pc:text-[1.01rem] "
							>
								Buy Now
							</motion.button>
							{!isMobile ? (
								<aside className="flex  p-2.5 text-center gap-x-5 min-pc:bg-gray-200 min-pc:p-0 min-pc:rounded min-pc:overflow-hidden min-pc:gap-x-0 ">
									<p className="min-pc:w-25 text-center min-pc:text-center min-pc:h-full min-pc:pt-2.5 ">
										Quantity :
									</p>
									<button
										className="cursor-pointer bg-[#ff5602e6] text-white w-15 text-center rounded min-pc:w-10 min-pc:font-extrabold "
										onClick={() =>
											changeQuantity(
												'decrement'
											)
										}
									>
										-
									</button>
									<p className="w-10 text-center font-black min-pc:w-15 min-pc:pt-2.5  ">
										{quantity}
									</p>
									<button
										className="cursor-pointer bg-[#ff5602e6]  text-white w-15  text-center rounded min-pc:w-10 min-pc:font-extrabold "
										onClick={() =>
											changeQuantity(
												'increment'
											)
										}
									>
										+
									</button>
								</aside>
							) : (
								''
							)}
							<motion.button
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.98 }}
								transition={{ duration: 0.1 }}
								onClick={addToCart}
								className="text-center cursor-pointer w-20 h-10 text-[14px] bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 py-0.5 px-1  rounded text-white sm:text-[0.8rem]   min-pc:text-[1.01rem] sm:w-25 "
							>
								Add to Cart
							</motion.button>
						</section>
						{isMobile ? (
							<motion.section
								initial={{
									opacity: 0,
									y: 100,
									height: 0,
								}}
								animate={{
									opacity: 1,
									y: 0,
									height: '10rem',
								}}
								transition={{ duration: 0.5 }}
								id="popup"
								className="hidden flex-col gap-y-6 fixed overflow-hidden  w-screen bottom-0 h-60  bg-gray-100  "
							>
								<h1 className="text-center">
									Select a Quantity
								</h1>
								<aside className="mr-auto ml-auto flex justify-around align-middle w-screen  ">
									Quantity :
									<motion.button
										whileTap={{ scale: 1.2 }}
										className="cursor-pointer bg-[#ff5602e6] text-white w-10 text-center rounded "
										onClick={() =>
											changeQuantity(
												'decrement'
											)
										}
									>
										-
									</motion.button>
									<span
										type="text"
										className="w-10 text-center bg-white font-black"
									>
										{quantity}
									</span>
									<motion.button
										whileTap={{ scale: 1.2 }}
										className="cursor-pointer bg-[#ff5602e6] text-white w-10 text-center rounded "
										onClick={() =>
											changeQuantity(
												'increment'
											)
										}
									>
										+
									</motion.button>
								</aside>
								<aside className="flex justify-around align-middle w-screen py-2 bottom-0 ">
									<motion.button
										whileHover={{ scale: 1.03 }}
										whileTap={{ scale: 0.98 }}
										transition={{ duration: 0.1 }}
										onClick={closePopup}
										className="text-center w-20 h-10 text-[14px] bg-gradient-to-r from-red-400 via-[#ff0202]  to-[#ff0202e6]  hover:via-red-500 hover:to-[#ff0202] transition-all duration-300 py-0.5 px-1  rounded text-white sm:text-[0.8rem]   min-pc:text-[1.01rem]"
									>
										cancel
									</motion.button>
									{isCart ? (
										<motion.button
											whileHover={{
												scale: 1.03,
											}}
											whileTap={{
												scale: 0.98,
											}}
											transition={{
												duration: 0.1,
											}}
											onClick={addToCart}
											className="text-center w-20 h-10 text-[14px] bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 py-0.5 px-1  rounded text-white sm:text-[0.8rem]   min-pc:text-[1.01rem]"
										>
											Add to Cart
										</motion.button>
									) : (
										<motion.button
											whileHover={{
												scale: 1.03,
											}}
											whileTap={{
												scale: 0.98,
											}}
											transition={{
												duration: 0.1,
											}}
											onClick={buyNow}
											className="text-center w-20 h-10 text-[14px] bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 py-0.5 px-1  rounded text-white sm:text-[0.8rem]   min-pc:text-[1.01rem]"
										>
											Buy now
										</motion.button>
									)}
								</aside>
							</motion.section>
						) : (
							''
						)}
					</div>
				</main>
			) : (
				''
			)}
		</>
	);
};

export default ProductPage;
