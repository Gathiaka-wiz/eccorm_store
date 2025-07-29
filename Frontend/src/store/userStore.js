import axios from 'axios';
import { create } from 'zustand';

const API_URL = import.meta.env.MODE === 'development' ? `http://localhost:${import.meta.env.PORT}/api/v2`  : 'api/v2';

export const userStore = create( (set) => ({
    data:null,
    error:null,
    message:null,
    isLoading:false,


    getProducts: async () => {
        set({ isLoading:true, error:null, message:null, data:null });

        try {
            const response = await axios.get(`${API_URL}/products`);

            set({
                error:null,
                data:response.data.data,
                message:response.data.message || 'Products fetch success',
                isLoading:false
            });


        } catch (error) {
            set({
                error:error.response?.data?.message || 'Products fetch error' ,
                isLoading:false
            });
            throw error;
        }
    },


    getUserProfile: async (  ) => {
        set({ isLoading:true, error:null, message:null, data:null });

        try {
            const response = await axios.get(`${API_URL}/user`);

            set({
                error:null,
                data:response.data.user,
                message:response.data.message  || 'User profile fetch success' ,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error.response?.data?.message || 'User profile fetch error' ,
                isLoading:false
            });
            throw error;
        }
    },


    getUserCart: async () => {
        set({ isLoading:true, error:null, message:null, data:null });

        try {
            const response = await axios.get(`${API_URL}/user/cart`);

            set({
                error:null,
                data:response.data.data,
                message:response.data.message  || 'User cart fetch success' ,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error.response?.data?.message || 'User cart fetch error' ,
                isLoading:false
            });
            throw error;
        }
    },


    addAndUpdateCart: async ( product_id, quantity ) => {
        set({ isLoading:true, error:null, message:null, data:null });

        try {
            const response = await axios.post(`${API_URL}/product/${product_id}/add-to-cart`, { quantity });

            set({
                error:null,
                data:response.data.data,
                message:response.data.message  || 'Cart add/update fetch success' ,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error.response?.data?.message || 'Cart add/update error' ,
                isLoading:false
            });
            throw error;
        }
    },


    deleteCart: async ( product_id ) => {
        set({ isLoading:true, error:null, message:null, data:null });

        try {
            const response = await axios.delete(`${API_URL}/user/${product_id}/delete-from-cart`);

            set({
                error:null,
                data:response.data.data,
                message:response.data.message  || 'Cart add/update fetch success' ,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error.response?.data?.message || 'Cart add/update error' ,
                isLoading:false
            });
            throw error;
        }
    },


}));