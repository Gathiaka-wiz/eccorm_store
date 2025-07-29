import axios from 'axios';
import { create } from 'zustand';

const API_URL = import.meta.env.MODE === 'development' ? `http://localhost:${import.meta.env.PORT}/api/v3/admin` : '/api/v3/admin';


export const  useAdminStore = create((set) => ({
    data:null,
    isAdmin:false,
    error:null,
    message:null,
    isCheckingAdmin:true,
    isLoading:null,

    checkAdmin: async () => {
        set({  error:null, isAdmin:false, isCheckingAdmin:true });

        try {
            
            // eslint-disable-next-line no-unused-vars
            const response = await axios.get(`${API_URL}/check-admin`);

            set({
                error:null,
                isAdmin:true,
                isCheckingAdmin:false,
            });

        } catch (error) {
            set({
                error:error.response?.data?.message || 'Error checking Admin',
                isAdmin:false,
                isCheckingAdmin:false
            });
            throw error;
        }
    },

    getUsers: async () => {
        set({ isLoading:true, data:null,  error:null, message:null });

        try {
            const response = await axios.get(`${API_URL}/users`);

            set({
                data:response.data.data,
                message:response.data.message || 'Users fetch success',
                error:null,
                isLoading:false
            });

        } catch (error) {
            set({
                error:error.response?.data?.message || 'Error getting users',
                isLoading:false
            });
            throw error;
        }
    },


    createProduct: async ( product_name, price, available_stock, description, image ) => {
        set({ isLoading:true, data:null, error:null,  message:null });

        try {
            const response = await axios.post(`${API_URL}/create-product`, { image, product_name, price, available_stock, description });

            set({
                data:response.data.product,
                error:null,
                message:response.data.message || 'Product create success',
                isLoading:false
            });

        } catch (error) {
            set({
                error:error.response?.data?.message || 'Product create error',
                isLoading:false
            });
            throw error;
        }
    },

    editProduct: async ( product_id, product_name, price, available_stock, description,  image ) => {
        set({ isLoading:true, data:null, error:null,  message:null });

        try {
            const response = await axios.patch(`${API_URL}/${product_id}/edit-product`, { image, product_name, price, available_stock, description });

            set({
                data:response.data.product,
                error:null,
                message:response.data.message || 'Product edit success',
                isLoading:false
            });

        } catch (error) {
            set({
                error:error.response?.data?.message || 'Product edit error',
                isLoading:false
            });
            throw error;
        }
    },


    deleteProduct: async ( product_id ) => {
        set({ isLoading:true, error:null,  message:null });

        try {
            const response = await axios.post(`${API_URL}/${product_id}/delete-product`);

            set({
                error:null,
                message:response.data.message || 'Product delete success',
                isLoading:false
            });

        } catch (error) {
            set({
                error:error.response?.data?.message || 'Product  delete error',
                isLoading:false
            });
            throw error;
        }
    },

}));