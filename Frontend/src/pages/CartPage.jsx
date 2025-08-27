import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { HomeIcon, Trash, Trash2Icon } from 'lucide-react';
import { toast } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion  } from 'framer-motion';

import { userStore } from '../store/userStore';



const CartPage = () => {
    const [items, setItems] = useState([]);

    const navigate = useNavigate();

    const { cart, cartTotal, getUserCart, updateCartItem, deleteCartItem } = userStore();

    const checkoutCart = () => {
        navigate(`/checkout?cart_id=${cart._id}`);
    }

    const removeCartItem = async ( product_id ) => {
        try {
            await deleteCartItem(product_id)
            toast.success('Product successfully removed from cart')
        } catch (error) {
            console.error(error);
            toast.error('Error removing product from cart ');
        }
    }

    const handleProductQuantity = ( state, product_id, qty ) => {
        if ( state=== 'increment' ) {
            try {
                const quantity = Math.floor(Number(qty) + 1 );
                updateCartItem(product_id, quantity);
            } catch (error) {
                console.error(error);
                toast.error('Error updating cart item quantity ')
            }
        }else if ( state=== 'decrement' ) {
            try {
                const quantity = Math.floor(Number(qty) - 1 );
                updateCartItem(product_id, quantity);
            } catch (error) {
                console.error(error);
                toast.error('Error updating cart item quantity ')
            }
        } else{
            toast.error(` ${state} state does not exist  `)
        }
    }


    useEffect(()=> {
        try {
            getUserCart();
            setItems(cart.items);
            console.log(cart)
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Error fetching cart please refresh')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
    <main className='w-[100vw] min-h-[100vh]  h-max flex flex-col items-center bg-gradient-to-bl from-bg-[#ffffffff] from-0%  via-[#ff9d6c] via-40%  to-[##ff874b] to-100% relative  ' >
            <nav
                initial={{ opacity:0, y:-200 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
                className='fixed flex justify-center top-0 left-0 right-0  z-90 ' 
            >
                <ul className='flex px-2 py-2.5 justify-evenly w-[90vw] sm:justify-evenly bg-[#ebebeb4a] mt-2 rounded-xl border-1 border-[#808080] max-xs:w-[90vw] sm:w-[80vw] md:w-[60vw]' >
                    <Link 
                        to={'/'}
                        className=' h-8 font-[Supreme-ExtraBold] text-black w-max sm:text-2xl sm:h-9 text-center md:size-10 md:text-4xl ' 
                    >
                        <HomeIcon className='md:size-8' />
                    </Link>
                    <h1 className='h-8 font-[Supreme-Bold] text-black w-max sm:text-xl sm:h-9 text-center md:text-2xl' >
                        Cart
                    </h1>
                    <h1 className='h-8 font-[Supreme-Bold] text-black w-max sm:text-xl sm:h-9 text-center md:text-2xl'  >
                        Ksh : { cartTotal ? cart.subtotal : '0'}
                        {/* Ksh : 5000 */}
                    </h1>
                </ul>
            </nav>
            <div className='mt-17 mb-5 grid flex-col justify-center sm:mt-20 gap-y-5  sm:mb-23 ' >
                {
                    items.length > 0 ? 
                        items.map(( index, item ) => {
                            <motion.div 
                                key={index}
                                initial={{  opacity:0, scale:0 }} 
                                transition={{ duration:0.55, ease:'easeOut'  }}
                                whileInView={{  opacity:1, scale:1 }}
                                className='flex  relative bg-[#ebebeb99] w-[95vw] h-35 rounded-2xl overflow-clip  sm:h-55  min-pc:w-[65vw] md:justify-center md:align-middle ' 
                            >
                                <img 
                                    src={item.image.url} 
                                    alt={item.product_name}
                                    className='bg-white/50 size-35 rounded-2xl sm:w-50 md:h-50 md:mt-auto md:mb-auto  '
                                />
                                <div className='w-[65%] flex flex-col justify-center text-center  text-[1.2rem] gap-y-2 max-sm:text-[0.9rem] sm:text-[1.8rem] md:justify-around ' >
                                    <section className='min-pc:flex  min-pc:ml-auto min-pc:mr-auto min-pc:gap-x-20' >
                                        <p className='min-pc:bg-white min-pc:px-2 min-pc:rounded ' >Bt Speaker</p>
                                        <p className='min-pc:bg-white min-pc:px-2 min-pc:rounded ' >Ksh 300</p>
                                    </section>
                                    <section className='flex ml-auto mr-auto gap-x-2 md:bg-white cursor-pointer' >
                                        <motion.span
                                            whileHover={{ scale:1.1 }}
                                            whileTap={{ scale:1 }}
                                            transition={{ duration:0.25, ease:'easeInOut' }}
                                            className='bg-[#ff6415] inline-block text-white font-extrabold  px-2  rounded  '
                                            onClick={() => {
                                                handleProductQuantity('decrement',item.product_id, item.quantity);
                                            }} 
                                        >
                                            -
                                        </motion.span>
                                        <span className='font-bold cursor-auto md:font-medium' >
                                            {item.quantity}
                                        </span>
                                        <motion.span
                                            whileHover={{ scale:1.1 }}
                                            whileTap={{ scale:1 }}
                                            transition={{ duration:0.25, ease:'easeInOut' }}
                                            className='bg-[#ff6415] inline-block text-white font-extrabold  px-2  rounded  ' 
                                            onClick={() => {
                                                handleProductQuantity('increment', item.product_id, item.quantity);
                                            }} 
                                            >
                                            +
                                        </motion.span>
                                    </section>
                                </div>
                                <motion.section
                                    whileHover={{ scale:1.1 }}
                                    whileTap={{ scale:1 }}
                                    transition={{ duration:0.25, ease:'easeInOut' }}
                                    className='bg-gray-500/40 absolute right-0 p-2 rounded text-[#333] max-xs:w-min cursor-pointer   ' 
                                    onClick={() => { removeCartItem(item.product_id)}}
                                >
                                    <Trash2Icon className='max-xs:size-4 sm:size-8' />
                                </motion.section>
                            </motion.div>
                        })
                    : <p className=' h-screen flex text-center justify-center align-middle text-xl md:text-2xl ' >No Cart available</p>
                }
                {/* <motion.div 
                    initial={{  opacity:0, scale:0 }} 
                    transition={{ duration:0.55, ease:'easeOut'  }}
                    whileInView={{  opacity:1, scale:1 }}
                    className='flex  relative bg-[#ebebeb99] w-[95vw] h-35 rounded-2xl overflow-clip  sm:h-55 min-pc:w-[65vw] md:justify-center md:align-middle ' 
                >
                    <img 
                        src='speaker1.webp' 
                        alt="speaker" 
                        className='bg-white/50 size-35 rounded-2xl sm:w-50 md:h-50 md:mt-auto md:mb-auto  '
                    />
                    <div className='w-[65%] flex flex-col justify-center text-center  text-[1.2rem] gap-y-2 max-sm:text-[0.9rem] sm:text-[1.8rem] md:justify-around ' >
                        <section className='min-pc:flex  min-pc:ml-auto min-pc:mr-auto min-pc:gap-x-20' >
                            <p className='min-pc:bg-white min-pc:px-2 min-pc:rounded ' >Bt Speaker</p>
                            <p className='min-pc:bg-white min-pc:px-2 min-pc:rounded ' >Ksh 300</p>
                        </section>
                        <section className='flex ml-auto mr-auto gap-x-2 md:bg-white cursor-pointer' >
                            <motion.span
                                whileHover={{ scale:1.1 }}
                                whileTap={{ scale:1 }}
                                transition={{ duration:0.25, ease:'easeInOut' }}
                                className='bg-[#ff6415] inline-block text-white font-extrabold  px-2  rounded  ' 
                            >
                                -
                            </motion.span>
                            <span className='font-bold cursor-auto md:font-medium' >5</span>
                            <motion.span
                                whileHover={{ scale:1.1 }}
                                whileTap={{ scale:1 }}
                                transition={{ duration:0.25, ease:'easeInOut' }}
                                className='bg-[#ff6415] inline-block text-white font-extrabold  px-2  rounded  ' 
                                >
                                +
                            </motion.span>
                        </section>
                    </div>
                    <motion.section
                        whileHover={{ scale:1.1 }}
                        whileTap={{ scale:1 }}
                        transition={{ duration:0.25, ease:'easeInOut' }}
                        className='bg-gray-500/40 absolute right-0 p-2 rounded text-[#333] max-xs:w-min cursor-pointer   ' >
                        <Trash2Icon className='max-xs:size-4 sm:size-8' />
                    </motion.section>
                </motion.div> */}
            </div>
            <div className='fixed h-15 z-20 bottom-0 left-0 right-0  rounded flex justify-around align-middle sm:h-20 min-pc:h-18 min-pc:backdrop-blur-sm ' >
                <section className='w-[90vw] h-12  bg-white flex justify-around  align-middle rounded text-center text-[1.2rem] font-medium sm:h-15 sm:text-[1.8rem]  min-pc:h-16 ' >
                    <p className=' my-auto ' >Products: { cartTotal ? cartTotal : '0'  } </p>
                    <motion.button
                        whileHover={{ scale:1.03 }}
                        whileTap={{ scale:0.98 }}
                        transition={{ duration:0.1 }}

                        onClick={checkoutCart}
                        className='text-center cursor-pointer h-10  text-[14px] my-auto bg-gradient-to-r from-orange-400 via-[#ff5602e6]  to-[#ff5602e6]  hover:via-orange-500 hover:to-[#ff5602e6] transition-all duration-300 py-0.5 px-2.5  rounded text-white sm:text-[1.6rem]   min-pc:text-[1.01rem]  ' 
                    >
                        Checkout Cart
                    </motion.button>
                </section>
            </div>
        </main>
    )
}

export default CartPage