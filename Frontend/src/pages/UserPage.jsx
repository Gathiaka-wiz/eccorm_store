// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon, User, Loader, ShoppingBasket } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { formatDate } from '../utils/date';

import { userStore } from '../store/userStore';
import { useAuthStore } from '../store/authStore';

const UserPage = () => {
	const { user, getUserProfile } = userStore();
	const { signout, isLoading } = useAuthStore();


	const handleSignout = async () => {
		try {
			await signout();
		} catch (error) {
			console.error(error);
			toast.error(error?.message || 'Signout error');
		}
	};

	useEffect(() => {
		try {
			getUserProfile();
		} catch (error) {
			console.error(error);
			toast.error(error?.message || 'User profile fetch error');
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
					<User className="md:size-8" />
				</ul>
			</motion.nav>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full mx-auto mt-20 p-8 bg-gray-100/50  backdrop-filter backdrop-blur-lg rounded-xl  border border-gray-300 text-[#363636] '
			>
				<h2 className='text-3xl font-bold mb-6 text-center flex justify-center '>
					User Profile :
					<Link to={'/orders'} className='ml-2 flex items-center  w-max hover:underline ' >
						Orders
						<ShoppingBasket className='ml-2' />
					</Link>
				</h2>

				<div className='space-y-6' >
					<motion.div
						className='p-4 bg-white/50 bg-opacity-50 rounded-lg border border-gray-300'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<h3 className='text-xl font-semibold  mb-3'>Profile Information</h3>
						<p className='text-[#333]'>Name: {user?.name}</p>
						<p className='text-[#333]'>Email: {user?.email}</p>
					</motion.div>

					<motion.div
						className='p-4 bg-white/50 bg-opacity-50 rounded-lg border border-gray-300'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<h3 className='text-xl font-semibold  mb-3'>Account Activity</h3>
						<p className='text-[#333]'>
							<span className='font-bold'>Joined: </span>
							{formatDate(user?.createdAt)}
						</p>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className='mt-4'
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleSignout}
						className='w-full h-15 bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  text-white px-2 py-1 rounded-lg  cursor-pointer hover:from-[#ff5602e6] hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 flex items-center justify-center  sm:px-1 sm:py-0.5 '
					>
						{isLoading ? <Loader className='animate-spin cursor-none ' /> : 'Sign Up'}
					</motion.button>
				</motion.div>

			</motion.div>
		</main>
	);
};

export default UserPage;
