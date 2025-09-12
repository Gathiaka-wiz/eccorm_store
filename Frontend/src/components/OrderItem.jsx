// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const OrderItem = ({ key, item }) => {
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
						{item.product_name}
					</p>
					<p className="min-pc:bg-white min-pc:px-2 min-pc:rounded ">
						Ksh {item.price}
					</p>
				</section>
				<section className="flex ml-auto mr-auto gap-x-2 md:bg-white cursor-pointer">
					{/* {status === 'pending' ? (
						<button
							onClick={() => buyNow(item.id)}
							className="text-center text-[12px] bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 py-1 px-2  rounded text-white sm:text-[0.8rem]   min-pc:text-[1.01rem] "
						>
							Checkout
						</button>
					) : (
						''
					)} */}
				</section>
			</div>
		</motion.div>
	);
};

export default OrderItem;
