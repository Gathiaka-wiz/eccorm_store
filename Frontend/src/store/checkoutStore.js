import axios from 'axios';
import { create } from 'zustand';

const API_URL = import.meta.env.MODE === 'development' ? `https://localhost:${import.meta.env.PORT}/api/v4/checkout` : '/api/v4/checkout';


export const checkoutStore = create ((set) => ({
    error:null,
    status:null,
    message:null,
    isChecked:false,
    isLoading:false,

    

    cartCheckout: async ( method, cart_id, phone  ) => {
        set({ error:null, message:null, isLoading:true });

        // eslint-disable-next-line no-undef
        const stripe = Stripe(import.meta.env.PUBLISHABLE_KEY); // Use your actual publishable key


        try {
            // eslint-disable-next-line no-unused-vars
            const { payment_method, sessionId, response } = await axios.post(`${API_URL}/pay/cart/${cart_id}`, { phone, method  }).then(r => r.data );


            if ( payment_method === 'stripe' ) {

                set({
                    error:null,
                    message:'Await redirect to stripe checkout page',
                    isLoading:false
                });

                await stripe.redirectToCheckout( sessionId );
            } else if ( payment_method === 'mpesa' ) {
                set({
                    error:null,
                    message:'Check your phone for payment prompt',
                    isLoading:false
                });
            } else {
                set({
                    error:'Unknown payment method',
                    isLoading:false
                });
            }
            

        } catch (error) {
            set({
                error:error.response?.data?.message || 'Error in cart checkout',
                isLoading:false
            })
        }
    },
    
    itemCheckout: async ( method, product_id , phone ) => {
        set({ error:null, message:null, isLoading:true });
        try {
            
            // eslint-disable-next-line no-unused-vars
            const  { payment_method, sessionId, response } = axios.post(`${API_URL}/pay/product/${product_id}`, { method, product_id, phone } );

            if ( payment_method === 'stripe' ) {

                set({
                    error:null,
                    message:'Await redirect to stripe checkout page',
                    isLoading:false
                });

                // eslint-disable-next-line no-undef
                await stripe.redirectToCheckout( sessionId );
            } else if ( payment_method === 'mpesa' ) {
                set({
                    error:null,
                    message:'Check your phone for payment prompt',
                    isLoading:false
                });
            } else {
                set({
                    error:'Unknown payment method',
                    isLoading:false
                });
            }

        } catch (error) {
            set({
                error:error.response?.data?.message || 'Error in item checkout',
                isLoading:false
            });
        }
    },

    cartStatus: async ( cart_id ) => {
        set({ error:null, message:null, status:null, isLoading:true,   });

        try {
            
            const response = await axios.get(`${API_URL}/${cart_id}/status`);


            set({
                message:response.data.message || 'Cart status fetch success',
                status:response.data.status,
                isLoading:false
            })

        } catch (error) {
            set({
                error:error.response?.data?.message || 'Error confirming cart/order status',
                isLoading:false
            });
        }

    }

}));