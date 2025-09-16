import  { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Trash2Icon } from 'lucide-react';

import { userStore } from '../store/userStore';

const CartItem = ({  item }) => {
	const { updateCartItem, deleteCartItem } = userStore();

	// optimistic local quantity so UI updates instantly
	const [localQty, setLocalQty] = useState(item.quantity);

	// keep localQty in sync when item changes (e.g. store updates)
	useEffect(() => {
		setLocalQty(item.quantity);
	}, [item.quantity]);

	const handleProductQuantity = async (state, product_id, qty) => {
		const current = Number(qty);
		let newQty =
			state === 'increment'
				? Math.floor(current + 1)
				: Math.floor(current - 1);

		// prevent quantity going below 1
		if (newQty < 1) {
			toast.error('Quantity cannot be less than 1');
			return;
		}

		const previous = localQty;
		// optimistic update
		setLocalQty(newQty);

		try {
			await updateCartItem(product_id, newQty);
		} catch (error) {
			// rollback on error
			setLocalQty(previous);
			console.error(error);
			toast.error('Error updating cart item quantity');
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
			initial={{ opacity: 0, scale: 0 }}
			transition={{ duration: 0.55, ease: 'easeOut' }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{
				once: true,
			}}
			className="flex  relative bg-[#ebebeb99] w-[95vw] h-35 rounded-2xl overflow-clip  sm:h-55  min-pc:w-[65vw] md:justify-center md:align-middle "
		>
			<img
				src={item.product_id.image.url}
				alt={item.product_id.product_name}
				className="bg-white/50 size-35 rounded-2xl sm:w-50 md:h-50 md:mt-auto md:mb-auto  "
			/>
			<div className="w-[65%] flex flex-col justify-center text-center  text-[1.2rem] gap-y-2 max-sm:text-[0.9rem] sm:text-[1.8rem] md:justify-around ">
				<section className="min-pc:flex  min-pc:ml-auto min-pc:mr-auto min-pc:gap-x-20">
					<p className="min-pc:bg-white min-pc:px-2 min-pc:rounded ">
						{item.product_id.product_name}
					</p>
					<p className="min-pc:bg-white min-pc:px-2 min-pc:rounded ">
						Ksh {item.product_id.price}
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
								item.product_id._id,
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
								item.product_id._id,
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
					removeCartItem(item.product_id._id);
				}}
			>
				<Trash2Icon className="max-xs:size-4 sm:size-8" />
			</motion.section>
		</motion.div>
	);
};

export default CartItem;
