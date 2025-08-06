// eslint-disable-next-line no-unused-vars
import { motion, scale } from 'framer-motion';

// rgba(255,160,105,0.8)
// #ffffff
//  rgba(0,0,0,0.15)
// rgba(0,0,0,0.15),
const HeroSection = () => {
    return (
        <motion.section 
            className='max-xs:h-[90dvh] mt-12 w-screen h-[95dvh] flex flex-col align-middle justify-center text-center sm:h-[100dvh] overflow-hidden bg-white' 
        >
            <section className='relative z-[2] flex flex-col gap-y-10 align-middle justify-center text-center  w-screen h-[93dvh] bg-[#00000015] sm:h-[100dvh] min-pc:grid min-pc:grid-cols-2 min-pc:gap-y-0  '
            >
                    <aside
                        initial={{ opacity:0, x:100 }}
                        animate={{ opacity:1, x:0 }}
                        transition={{ duration:0.4 }} 
                        className='ml-auto absolute  -z-[1] w-screen h-[100dvh]  bg-[url(./assets/images/hero_img.png)] bg-no-repeat  bg-center bg-contain opacity-65 min-pc:relative min-pc:w-[40vw] min-pc:bg-size-[65vw] min-pc:opacity-[1] min-pc:h-[90dvh]  min-pc:z-[1] ' >
                    </aside>
                    
                    <div 
                        initial={{ opacity:0, x:100 }}
                        animate={{ opacity:1, x:0 }}
                        transition={{ duration:0.3 }}
                        className=' translate-20 -z-[200] bg-radial-[at_10%_20%] from-[#ffa069cc] via-[25%] via-[#ff853fbd]  to-[#ffffff] to-30 blur-2xl  bg-no-repeat bg-center absolute h-[60dvh]  w-[50vw] bg-size-[38vw]  opacity-65 sm:translate-x-35 sm:translate-y-20 sm:w-[60vw] min-pc:h-[75dvh] min-pc:translate-20 min-pc:w-[45vw]  min-pc:opacity-[1]   ' 
                    ></div>
                    
                    <aside className='flex flex-col gap-y-10 min-pc:w-[46dvw]  min-pc:h-[90dvh]  min-pc:align-middle min-pc:justify-center  '  >
                        <motion.h1
                            initial={{ opacity:0, x:100 ,blur:20 }}
                            animate={{ opacity:1, x:0, blur:0 }}
                            transition={{ duration:0.5 }}
                            className=' mt-10 font-[Verdana-Bold] text-center text-black text-3xl sm:text-5xl  ' 
                        >
                            Hear It. Feel It. Live It.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity:0, x:100, blur:20 }}
                            animate={{ opacity:1, x:0, blur:0 }}
                            transition={{ duration:0.5 }} 
                            className='font-[Supreme-Medium] w-11/12 text-xl text-center text-black mx-auto sm:text-3xl ' 
                        >
                            Step into a world of crisp sound and cutting-edge tech. From premium headphones to the latest gear, explore everything you need to elevate your everyday experience.
                        </motion.p>
                        <motion.a 
                            initial={{ opacity:0, x:100 }}
                            animate={{ opacity:1, x:0 }}
                            transition={{ duration:0.5 }}
                            href="#Products"
                        >
                            <motion.button 
                                whileHover={{ scale:1.03 }}
                                whileTap={{ scale:0.98 }}
                                transition={{ duration:0.1 }}
                                className='text-center  m-auto bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300  w-50 h-10 rounded text-white font-[Verdana] sm:w-65 sm:h-18 sm:text-2xl sm:rounded-[8px] ' 
                            >
                                Explore Products
                            </motion.button>
                        </motion.a>
                    </aside>
            </section>
        </motion.section>
    )
}

export default HeroSection