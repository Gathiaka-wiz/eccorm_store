/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

import  { useAuthStore  } from '../store/authStore';

const VerifyAccountPage = () => {
    const [code, setCode ] = useState(['','','','','','']);
    const inputRefs = useRef([]);
    
        const { verifyAccount, error, isLoading } = useAuthStore();
        
        const navigate = useNavigate();
    
        const handleChange = (index,value) => {
            const newCode = [...code];
    
            // Handle pasted content
            if (value.length > 1) {
                const pastedCode = value.slice(0, 6).split("");
                for (let i = 0; i < 6; i++) {
                    newCode[i] = pastedCode[i] || "";
                }
                setCode(newCode);
    
                // Focus on the last non-empty input or the first empty one
                const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
                const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
                inputRefs.current[focusIndex].focus();
            } else {
                newCode[index] = value;
                setCode(newCode);
    
                // Move focus to the next input field if value is entered
                if (value && index < 5) {
                    inputRefs.current[index + 1].focus();
                }
            }
        }
    
        const handleKeyDown = (index, e) => {
            if (e.key === "Backspace" && !code[index] && index > 0 ) {
                inputRefs.current[index -1].focus(); 
            }
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            const verificationToken = code.join("");
            
            try {
                await verifyAccount(verificationToken);
                navigate("/");
                toast.success("Email Verified Successfully");
            } catch (error) {
                toast.error(error.message);
                console.error(error);
            }
        }
    
    
        // Auto submit when all events are filled
        useEffect(() => {
            if (code.every(digit => digit !== '')) {
                handleSubmit(new Event('submit'))
            }
        },[code]);


    return(
        <div>
            <motion.form
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
    
                className='flex flex-col gap-4 w-max h-max px-5 py-1 items-center justify-center bg-[#ffffff45] rounded-2xl sm:px-7 md:py-3.5 sm:py-3.5 '
                onSubmit={handleSubmit}
            >
                <h1 className='text-3xl font-bold text-center font-[Supreme-ExtraBold] text-[#171717] '>Verify your Account</h1>
                <p className='text-sm font-bold text-center font-[Supreme-ExtraBold] text-[#171717]   ' >Check you email for 6 digit code</p>

                <div className="flex justify-between gap-1 " >
                    {code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-[#ffffffb0] text-[#171717]  rounded-lg focus:outline-0 focus:border-0 focus:ring-2 focus:ring-[#727272]'
							/>
						))}
                    </div>

                    <motion.button
                        whileHover={{ scale:1.05 }}

                        className='mb-1 w-50 bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6] text-[#ffff] h-10 rounded cursor-pointer transition-all duration-300 flex items-center justify-center  hover:from-[#ff5602e6] hover:via-orange-500 hover:to-[#ff5602e6] sm:w-60 md:w-full  '
                    >
                        {
                            isLoading ? <Loader className='animate-spin' /> : 'Verify Account'
                        }
                    </motion.button>

            </motion.form>
        </div>
    );
};

export default VerifyAccountPage