import { Link } from 'react-router-dom';
import { HomeIcon, Satellite, ShoppingCart, User } from 'lucide-react';
import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import OrderItem from '../components/OrderItem';
import { userStore } from '../store/userStore';

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const { getUserOrders, paidOrders, completedOrders } = userStore();

	const navigateTo = (state) => {
		if (state === 'paid') {
			paidOrders.length > 0 ? setOrders(paidOrders.items): null;
			return
		} 
		if (state === 'completed') {
			completedOrders.length > 0 ? setOrders(completedOrders.items): null;
			return
		}
	};
	useEffect(() => {
		try {
			getUserOrders();
			// completedOrders.items !== null ? setOrders(completedOrders.items): null;
			completedOrders === null ? null : setOrders(completedOrders)
			console.log(orders)
		} catch (error) {
			console.error(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="w-[100vw] min-h-[100vh]  h-max flex flex-col items-center bg-gradient-to-bl from-bg-[#ffffffff] from-0%  via-[#ff9d6c] via-40%  to-[##ff874b] to-100% relative ">
			<motion.nav
				initial={{ opacity: 0, y: -200 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="fixed flex justify-center top-0 left-0 right-0  z-90 "
			>
				<ul className="flex px-2 py-2.5 justify-evenly w-[90vw] sm:justify-evenly bg-[#ebebeb4a] mt-2 rounded-xl border-1 border-[#808080] max-xs:max-h-10 max-xs:w-[90vw] sm:w-[80vw] md:w-[60vw]">
					<Link
						to={'/'}
						className=" h-8 font-[Supreme-ExtraBold] text-black w-max sm:text-2xl sm:h-9 text-center md:size-10 md:text-4xl "
					>
						<HomeIcon className="md:size-8" />
					</Link>
					<Link
						to={'/profile'}
						className=" h-8 font-[Supreme-ExtraBold] text-black w-max sm:text-2xl sm:h-9 text-center md:size-10 md:text-4xl "
					>
						<User className="md:size-8" />
					</Link>
				</ul>
			</motion.nav>

			<div className="relative min-h-20 min-w-[90vw] mt-17 bg-[#f6f6f680] mb-5 grid flex-col justify-center sm:mt-20 gap-y-5  sm:mb-23  sm:min-w-[80vw] md:min-w-[60vw rounded-2xl pb-4 px-1.5 ">
				<section className="absolute top-0 left-0 right-0 flex justify-center ">
					<aside className="w-50 text-center m-auto rounded-b-sm bg-[#ff8d55] text-white px-5  ">
						Your Orders
					</aside>
				</section>
				<section className="mt-8 min-w-[90vw] flex justify-evenly sm:min-w-[80vw] md:min-w-[60vw  ">
					<button
						onClick={
							() => navigateTo('paid')
						}
						className="bg-white h-max w-max px-2 py-0.5 rounded-sm hover:bg-gray-200/95  "
					>
						Paid
					</button>
					<button
						onClick={
							() => navigateTo('completed')
						}
						className="bg-white h-max w-max px-2 py-0.5 rounded-sm hover:bg-gray-200/95  "
					>
						Completed
					</button>
				</section>
				<section className="mt-17 mb-5 grid flex-col justify-center sm:mt-20 gap-y-5  sm:mb-23 ">
					{orders.length > 0 
						? orders.map((index, item) => {
								<OrderItem key={index} item={item} />;
						  })
						: null}
				</section>
			</div>
		</main>
	);
};

export default OrdersPage;
