import { motion } from 'framer-motion';
const LoadingSpinner = () => {
    return (
        <div className='min-h-screen bg-gradient-to-bl from-[#ffffffff]  to-[#ff5602cf] flex items-center justify-center relative overflow-hidden'>
                {/* Simple Loading Spinner */}
                <motion.div
                    className='w-16 h-16 border-4  border-t-4 border-t-amber-600 border-orange-200 rounded-full'
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
        </div>
    );
}

export default LoadingSpinner;
;
