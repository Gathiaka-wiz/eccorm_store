// eslint-disable-next-line no-unused-vars
import { motion, scale } from 'framer-motion';

// rgba(255,160,105,0.8)
// #ffffff
//  rgba(0,0,0,0.15)
// rgba(0,0,0,0.15),
const HeroSection = () => {
    return (
        <motion.section 
            initial={{ opacity:0, x:100 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.5 }}

            className='max-xs:h-[88dvh] mt-12 w-screen h-[93dvh] flex flex-col align-middle justify-center text-center sm:h-[100dvh] overflow-hidden ' 
        >
            <section className='relative z-40 flex flex-col gap-y-10 align-middle justify-center text-center  w-screen h-[93dvh] bg-[#00000015] sm:h-[100dvh] '
            >
                <div className='ml-auto absolute -z-20 w-screen h-[100dvh]  bg-[url(./assets/images/hero_img.png)] bg-no-repeat  bg-center bg-contain opacity-65 ' >
                </div>
                    {/* <div className='absolute -z-30 h-screen  w-[50dvh] mx-auto left-0 right-0  bg-radial-[at_49.91%_50.09%] from-[#ffa069cc] via-[74.93%] via-[#ff853fbd]  to-[#ffffff] to-90%  bg-size-[auto_80px] bg-no-repeat bg-center'></div> */}
                <h1 className=' mt-10 font-[Verdana-Bold] text-center text-black text-3xl sm:text-5xl  ' >Hear It. Feel It. Live It.</h1>
                <p className='font-[Supreme-Medium] w-11/12 text-xl text-center text-black mx-auto sm:text-3xl ' >Step into a world of crisp sound and cutting-edge tech. From premium headphones to the latest gear, explore everything you need to elevate your everyday experience.</p>
                <a href="#Products">
                    <motion.button 
                        whileHover={{ scale:1.03 }}
                        whileTap={{ scale:0.98 }}
                        transition={{ duration:0.1 }}
                        className='text-center  m-auto bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300  w-50 h-10 rounded text-white font-[Verdana] sm:w-65 sm:h-18 sm:text-2xl sm:rounded-xl ' 
                    >
                        Explore Products
                    </motion.button>
                </a>
            </section>
        </motion.section>
    )
}

export default HeroSection