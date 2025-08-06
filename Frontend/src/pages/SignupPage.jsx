/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion  } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '../store/authStore.js';
import Input from '../components/Input';


const SignupPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { signup, isLoading, error, message } = useAuthStore();

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            await signup( name, email, password );
            
            navigate('/verify-account');
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }

    }
//  linear-gradient(225deg, #ffffff 0%, rgba(255,86,2,0.81) 100%);


    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center ' >
            <motion.form 
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
    
                className='flex flex-col gap-4 w-max h-max px-5 py-1 items-center justify-center bg-[#ffffff45] rounded-2xl sm:px-7 md:py-3.5 sm:py-3.5  ' 
                onSubmit={handleSignup} 
            >
                <h1 className='text-3xl font-bold text-center font-[Supreme-ExtraBold] text-[#171717] '>Tech Store Signup</h1>
                <Input 
                    type='text'
                    placeholder='John Doe' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
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
                <Input 
                    type='password' 
                    placeholder='Re-enter Password' 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <motion.button
                    whileHover={{ scale:1.03 }}
                    whileTap={{ scale:0.98 }}
                    transition={{ duration:0.1 }}
                    type='submit' 
                    className='bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  text-white px-2 py-1 rounded w-60 h-12 cursor-pointer hover:from-[#ff5602e6] hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 flex items-center justify-center  md:w-70 md:h-15 md:px-4 md:py-2 sm:w-4/5 sm:h-10 sm:px-1 sm:py-0.5 ' 
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className='animate-spin cursor-none ' /> : 'Sign Up'}
                </motion.button>

                <p className='text-sm text-[#363636] font-[Supreme-Medium]'>Already have an account? <Link to='/signin' className='text-[#ff5602] hover:underline'>Signin</Link></p>
            </motion.form>
        </div>
    );
}

export default SignupPage;