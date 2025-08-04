/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion  } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '../store/authStore.js';
import Input from '../components/Input';


const SigninPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const { signin, isLoading, error, message } = useAuthStore();

    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            await signin( email, password );
            toast.success(message);
            navigate('/');
        } catch (error) {
            toast.error(error.message || "Error Signing in");
            console.error(error);
        }

    }


    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center' >
            <motion.form 
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
    
                className='flex flex-col gap-4 w-max h-max px-5 py-1 items-center justify-center bg-[#ffffff45] rounded-2xl sm:px-7 md:py-3.5 sm:py-3.5  ' 
                onSubmit={handleSignin} 
            >
                <h1 className='text-3xl font-bold text-center font-[Supreme-ExtraBold] text-[#171717] '>Tech Store Signin</h1>
                <Input 
                    type='email' 
                    placeholder='johndoey@gmail.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <Input 
                    type='password' 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <motion.button
                    whileHover={{ scale:1.03 }}
                    whileTap={{ scale:0.98 }}
                    transition={{ duration:0.1 }}
                    type='submit' 
                    className='mb-1 w-50  bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6] text-[#ffff] h-10 rounded cursor-pointer transition-all duration-300 flex items-center justify-center  hover:from-[#ff5602e6] hover:via-orange-500 hover:to-[#ff5602e6] sm:w-60 md:w-65  '
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className='animate-spin cursor-none ' /> : 'Sign In'}
                </motion.button>

                <p className='text-sm text-[#363636] font-[Supreme-Medium]'>Don't have an account? <Link to='/signup' className='text-[#ff5602] hover:underline'>Signup</Link></p>
            </motion.form>
        </div>
    );
};

export default SigninPage;