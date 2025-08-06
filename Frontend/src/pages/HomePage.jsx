/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  SearchIcon, ShoppingCart, User} from 'lucide-react';
import { motion } from 'framer-motion';

import HeroSection from '../sections/HeroSection';
import ProductsSection from '../sections/ProductsSection';
import FooterSection from '../sections/FooterSection';

import { userStore } from '../store/userStore';
import { useAuthStore } from '../store/authStore';

const HomePage = () => {

    const navigate = useNavigate();

    const { getUserCart, cartTotal, cart } = userStore();
    const { isAuthenticated } = useAuthStore();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${e.target.value}`);
    }

    const handleCart = () => {
        navigate(`/cart`);
    }

    const handleProfile = () => {
        navigate(`/profile`);
    }

    const signupRedirect = () => {
        navigate(`/signup`);
    }

    
    useEffect( () => {
        try {
            isAuthenticated ? getUserCart() : ''; 
            
        } catch (error) {
            console.error(error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartTotal,cart]);


    return(
        <div className='w-screen h-screen  ' >
            <motion.nav 
                initial={{ opacity:0, y:-200 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
                className='fixed flex top-0 left-0 right-0  z-90 bg-white ' 
            >
                <ul className='flex px-2 py-2.5 justify-between w-screen sm:justify-evenly' >
                    <h1 className=' h-8 font-[Supreme-ExtraBold] text-black w-max sm:text-2xl sm:h-9 text-center md:text-4xl ' >Tech Store</h1>
                    <form className='w-5/12 h-8 relative flex align-middle justify-center  sm:h-10 ' onSubmit={handleSearch} >
                        <SearchIcon className= 'ml-1 absolute left-0 top-0 bottom-0 text-white w-5 h-8 z-10 sm:h-10 sm:w-6 md:ml-5  ' type='submit' onClick={handleSearch} />
                        <input 
                            type="search" 
                            placeholder='Search' 
                            className=' bg-[#000000] w-full text-center rounded-sm text-white  h-8 placeholder:text-gray-200 sm:h-10 md:rounded-2xl ' 
                        />
                    </form>
                    {
                        isAuthenticated ? 
                            <>
                                <li className=' flex justify-center align-center relative w-10 h-8 cursor-pointer ' >
                                    <ShoppingCart className='w-6 h-9 sm:w-9 cursor-pointer ' onClick={handleCart} />
                                    <span className='absolute -top-1 right-0 bg-red-500 rounded-xl px-1.5 inline-block text-white text-sm font-[supreme-bold] cursor-pointer ' onClick={handleCart} > 
                                        { cartTotal ? cartTotal : 0 }
                                    </span>
                                </li>
                                <li className='flex justify-center align-center cursor-pointer ' >
                                    <User className='w-8 h-7 sm:w-15 sm:h-9 cursor-pointer ' onClick={handleProfile} />
                                </li>
                            </>
                            :
                            <div>
                                <button className=' bg-[#ff6214] text-white font-[Supreme-Regular] text-sm px-1 rounded cursor-pointer sm:w-30 sm:h-9 md:text-lg md:rounded-[5.5px] md:w-32 ' onClick={signupRedirect} >Signin/Signup</button>
                            </div>
                    }
                </ul>
            </motion.nav>
            <HeroSection  />
            <ProductsSection />
            <FooterSection />
        </div>
    );
};

export default HomePage;