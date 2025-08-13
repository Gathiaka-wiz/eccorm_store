import axios from 'axios';
import { create } from 'zustand';

import { apiRequest } from '../utils/apiRequest';

// const API_URL = import.meta.env.MODE === 'development' ? `https://cmfjqv08-8000.uks1.devtunnels.ms/api/v2`  : 'api/v2';
const API_URL = import.meta.env.MODE === 'development' ? `http://localhost:8000/api/v2`  : 'api/v2';

axios.defaults.withCredentials = true;

export const userStore = create( (set) => ({
    user:null,
    cart:null,
    products:null,
    product:null,
    cartTotal:null,
    error:null,
    message:null,
    isLoading:false,


    getProducts: async () => {
        set({ isLoading:true, error:null, message:null, products:null, });

        try {
            const data = await apiRequest( 'get', `${API_URL}/products`);

            set({
                error:null,
                products:data.data,
                message:data.message || 'Products fetch success',
                isLoading:false
            });


        } catch (error) {
            set({
                error:error?.data?.message || 'Products fetch error' ,
                isLoading:false
            });
            throw error;
        }
    },

    getProduct: async ( product_id ) => {
        set({ isLoading:true, error:null, message:null, product:null, });

        try {
            const data = await apiRequest( 'get', `${API_URL}/product/${product_id}`);

            set({
                error:null,
                product:data.product,
                message:data.message || 'Product fetch success',
                isLoading:false
            });


        } catch (error) {
            set({
                error:error?.data?.message || 'Product fetch error' ,
                isLoading:false
            });
            throw error;
        }
    },


    getUserProfile: async (  ) => {
        set({ isLoading:true, error:null, message:null, user:null });

        try {
            const data = await apiRequest('get', `${API_URL}/user`);

            set({
                error:null,
                user:data.user,
                message:data.message  || 'User profile fetch success' ,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error?.data?.message || 'User profile fetch error' ,
                isLoading:false
            });
            throw error;
        }
    },


    getUserCart: async () => {
        set({ isLoading:true, error:null, message:null, cart:null });

        try {
            const data = await  apiRequest(`get`,`${API_URL}/user/cart`);

            set({
                error:null,
                cart:data.data,
                cartTotal:data.cartTotal,
                message:data.message  || 'User cart fetch success' ,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error?.data?.message || 'User cart fetch error' ,
                isLoading:false
            });
            throw error;
        }
    },


    addAndUpdateCart: async ( product_id, quantity ) => {
        set({ isLoading:true, error:null, message:null });

        try {
            const data = await apiRequest('post',`${API_URL}/product/${product_id}/add-to-cart`, { quantity });

            set({
                error:null,
                cart:data.data,
                message:data.message  || 'Cart add/update fetch success' ,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error?.data?.message || 'Cart add/update error' ,
                isLoading:false
            });
            throw error;
        }
    },


    deleteCart: async ( product_id ) => {
        set({ isLoading:true, error:null, message:null, });

        try {
            const data = await apiRequest('delete',`${API_URL}/user/${product_id}/delete-from-cart`);

            set({
                error:null,
                cart:data.data,
                message:data.message  || 'Cart add/update fetch success' ,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error?.data?.message || 'Cart add/update error' ,
                isLoading:false
            });
            throw error;
        }
    },


}));