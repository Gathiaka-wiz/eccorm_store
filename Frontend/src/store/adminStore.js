import axios from 'axios';
import { create } from 'zustand';

import { apiRequest } from '../utils/apiRequest'

const API_URL = import.meta.env.MODE === 'development' ? `http://localhost:${import.meta.env.PORT}/api/v3/admin` : '/api/v3/admin';

axios.defaults.withCredentials = true;


export const  useAdminStore = create((set) => ({
    users:null,
    error:null,
    message:null,
    products:null,
    isAdmin:false,
    isFetching:null,
    isCheckingAdmin:true,

    checkAdmin: async () => {
        set({  error:null, isAdmin:false, isCheckingAdmin:true });

        try {
            
            // eslint-disable-next-line no-unused-vars
            const data = await apiRequest('get', `${API_URL}/check-admin`);

            set({
                error:null,
                isAdmin:true,
                isCheckingAdmin:false,
            });

        } catch (error) {
            set({
                error:error.data?.message || 'Error checking Admin',
                isAdmin:false,
                isCheckingAdmin:false
            });
            throw error;
        }
    },

    getUsers: async () => {
        set({ isFetching:true, users:null,  error:null, message:null });

        try {
            const data = await apiRequest( 'get', `${API_URL}/users`);

            set({
                users:data.data,
                message:data.message || 'Users fetch success',
                error:null,
                isFetching:false
            });

        } catch (error) {
            set({
                error:error.data?.message || 'Error getting users',
                isFetching:false
            });
            throw error;
        }
    },


    createProduct: async ( product_name, price, available_stock, description, image ) => {
        set({ isFetching:true, products:null, error:null,  message:null });

        try {
            const data = await apiRequest('post', `${API_URL}/create-product`, { image, product_name, price, available_stock, description });

            set({
                products:data.product,
                error:null,
                message:data.message || 'Product create success',
                isFetching:false
            });

        } catch (error) {
            set({
                error:error.data.message || 'Product create error',
                isFetching:false
            });
            throw error;
        }
    },

    editProduct: async ( product_id, product_name, price, available_stock, description,  image ) => {
        set({ isFetching:true, products:null, error:null,  message:null });

        try {
            const data = await apiRequest('patch', `${API_URL}/${product_id}/edit-product`, { image, product_name, price, available_stock, description });

            set({
                products:data.product,
                error:null,
                message:data.message || 'Product edit success',
                isFetching:false
            });

        } catch (error) {
            set({
                error:error.data.message || 'Product edit error',
                isFetching:false
            });
            throw error;
        }
    },


    deleteProduct: async ( product_id ) => {
        set({ isFetching:true, error:null,  message:null });

        try {
            const data = await apiRequest('delete', `${API_URL}/${product_id}/delete-product`);

            set({
                error:null,
                message:data.message || 'Product delete success',
                isFetching:false
            });

        } catch (error) {
            set({
                error:error.data.message || 'Product  delete error',
                isFetching:false
            });
            throw error;
        }
    },

}));