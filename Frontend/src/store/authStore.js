import { create } from 'zustand';
import axios from 'axios';

import { apiRequest } from '../utils/apiRequest'

const API_URL  = import.meta.env.MODE === 'development' ? `http://localhost:8000/api/v1/auth` : '/api/v1/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error:null,
    isLoading: false,
    isCheckingAuth:true,
    message: null,

    signup: async ( name, email, password ) => {
        set({ isLoading:true, error:null, message: null });

        try {
            

            const data = await apiRequest(`post`, `${API_URL}/signup`, { name, email, password });

            set({
                user:data.user,
                isAuthenticated: true,
                message: data.message || 'Signup successful',
                error: null,
                isLoading: false,
            });

        } catch (error) {
            set({ 
                error: error?.data?.message || 'Error signing up', 
                isLoading: false 
            });
            throw error;
        }

    },

    signin: async ( email, password ) => {
        set({ isLoading:true, error:null, message:null });

        try {
        
            const data = await apiRequest(`post`, `${API_URL}/signin`, { email, password });

            set({
                user:data.user,
                isAuthenticated:true,
                message:data.message || 'Signin successful',
                error:null,
                isLoading:false
            });


        } catch (error) {
            set({ 
                error:error?.data?.message || 'Error signing in', 
                isLoading:false 
            });
            throw error;
        }
    },

    signout:async () => {
        set({ isLoading:true, error:null, message:null });

        try {
            
            const data = await apiRequest(`post`, `${API_URL}/signout`);


            set({
                user:null,
                isAuthenticated:false,
                message:data.message|| 'Signout success',
                error:null,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error?.data?.message || 'Error signing out',
                isLoading:false
            });
            throw error;
        }

    },

    checkAuth:async () => {
        set({ error:null });

        try {
            const data = await apiRequest(`get`, `${API_URL}/check-auth`);

            set({
                error:null,
                user:data.user,
                isAuthenticated:true,
                isCheckingAuth: false,
            });

        } catch (error) {
            set({
                error:error?.data?.message || 'Error checking authentication',
                isAuthenticated:false,
                isCheckingAuth:false,
            });
            throw error;
        }
    },

    verifyAccount: async  ( verificationToken ) => {
        set({ isLoading:true, error:false, message:null });

        try {
            
            const data = await apiRequest('post', `${API_URL}/signup/verify-account`, { verificationToken } );

            set({
                user:data.user,
                message:data.message || 'Account verification success',
                error:null,
                isLoading:false
            });

        } catch (error) {
            set({ 
                error:error?.data?.message || 'Error signing in', 
                isLoading:false 
            });
            throw error;
        }

    },



}));