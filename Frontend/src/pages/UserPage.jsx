import { Link } from 'react-router-dom';
import { HomeIcon, User } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const UserPage = () => {
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
		</main>
	);
};

export default UserPage;
