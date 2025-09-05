// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Trash2Icon } from 'lucide-react';

import { userStore } from '../store/userStore';

const CartItem = ({ key, item }) => {
	const { updateCartItem, deleteCartItem } = userStore();

	const handleProductQuantity = (state, product_id, qty) => {
		if (state === 'increment') {
			try {
				const quantity = Math.floor(Number(qty) + 1);
				updateCartItem(product_id, quantity);
			} catch (error) {
				console.error(error);
				toast.error('Error updating cart item quantity ');
			}
		} else if (state === 'decrement') {
			try {
				const quantity = Math.floor(Number(qty) - 1);
				updateCartItem(product_id, quantity);
			} catch (error) {
				console.error(error);
				toast.error('Error updating cart item quantity ');
			}
		} else {
			toast.error(` ${state} state does not exist  `);
		}
	};

	const removeCartItem = async (product_id) => {
		try {
			await deleteCartItem(product_id);
			toast.success('Product successfully removed from cart');
		} catch (error) {
			console.error(error);
			toast.error('Error removing product from cart ');
		}
	};

	return (
		<motion.div
			key={key}
			initial={{ opacity: 0, scale: 0 }}
			transition={{ duration: 0.55, ease: 'easeOut' }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{
				once: true,
			}}
			className="flex  relative bg-[#ebebeb99] w-[95vw] h-35 rounded-2xl overflow-clip  sm:h-55  min-pc:w-[65vw] md:justify-center md:align-middle "
		>
			<img
				src={item.image.url}
				alt={item.product_name}
				className="bg-white/50 size-35 rounded-2xl sm:w-50 md:h-50 md:mt-auto md:mb-auto  "
			/>
			<div className="w-[65%] flex flex-col justify-center text-center  text-[1.2rem] gap-y-2 max-sm:text-[0.9rem] sm:text-[1.8rem] md:justify-around ">
				<section className="min-pc:flex  min-pc:ml-auto min-pc:mr-auto min-pc:gap-x-20">
					<p className="min-pc:bg-white min-pc:px-2 min-pc:rounded ">
						Bt Speaker
					</p>
					<p className="min-pc:bg-white min-pc:px-2 min-pc:rounded ">
						Ksh 300
					</p>
				</section>
				<section className="flex ml-auto mr-auto gap-x-2 md:bg-white cursor-pointer">
					<motion.span
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 1 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="bg-[#ff6415] inline-block text-white font-extrabold  px-2  rounded  "
						onClick={() => {
							handleProductQuantity(
								'decrement',
								item.product_id,
								item.quantity
							);
						}}
					>
						-
					</motion.span>
					<span className="font-bold cursor-auto md:font-medium">
						{item.quantity}
					</span>
					<motion.span
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 1 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="bg-[#ff6415] inline-block text-white font-extrabold  px-2  rounded  "
						onClick={() => {
							handleProductQuantity(
								'increment',
								item.product_id,
								item.quantity
							);
						}}
					>
						+
					</motion.span>
				</section>
			</div>
			<motion.section
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 1 }}
				transition={{ duration: 0.25, ease: 'easeInOut' }}
				className="bg-gray-500/40 absolute right-0 p-2 rounded text-[#333] max-xs:w-min cursor-pointer   "
				onClick={() => {
					removeCartItem(item.product_id);
				}}
			>
				<Trash2Icon className="max-xs:size-4 sm:size-8" />
			</motion.section>
		</motion.div>
	);
};

export default CartItem;
