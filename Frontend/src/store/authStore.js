import { create } from 'zustand';
import axios from 'axios';

const API_URL  = import.meta.env.MODE === 'development' ? `http://localhost:${import.meta.env.PORT}/api/v1/auth` : '/api/v1/auth';

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
            
            const response = await axios.post(`${API_URL}/signup`, { name, email, password });

            set({
                user:response.data.user,
                isAuthenticated: true,
                message: response.data.message || 'Signup successful',
                error: null,
                isLoading: false,
            });

        } catch (error) {
            set({ 
                error: error.response?.data?.message || 'Error signing up', 
                isLoading: false 
            });
        }

    },

    signin: async ( email, password ) => {
        set({ isLoading:true, error:null, message:null });

        try {
            const response = await axios.post(`${API_URL}/signin`, { email, password });

            set({
                user:response.data.user,
                isAuthenticated:true,
                message:response.data.message || 'Signin successful',
                error:null,
                isLoading:false
            });


        } catch (error) {
            set({ 
                error:error?.response?.message || 'Error signing in', 
                isLoading:false 
            });
        }
    },

    signout:async () => {
        set({ isLoading:true, error:null, message:null });

        try {
            
            const response = await axios.post(`${API_URL}/signout`);

            set({
                user:null,
                isAuthenticated:false,
                message:response.data.message|| 'Signout success',
                error:null,
                isLoading:false
            });


        } catch (error) {
            set({
                error:error?.response?.message || 'Error signing out',
                isLoading:false
            });
        }

    },

    checkAuth:async () => {
        set({ isLoading:true, error:null, message:null });

        try {
            
            const response = await axios.get(`${API_URL}/check-auth`);

            set({
                user:response.user,
                isAuthenticated:true,
                error:null,
                isCheckingAuth: true,
            });

        } catch (error) {
            set({
                error:error?.response?.message || 'Error checking authentication',
                isAuthenticated:false,
                isCheckingAuth:false
            });
        }
    },

    verifyAccount: async  ( verificationToken ) => {
        set({ isLoading:true, error:false, message:null });

        try {
            
            const response = await axios.post(`${API_URL}/signup/verify-account` , { verificationToken });

            set({
                user:response.data.user,
                isAxiosError:true,
                message:response.data.message || 'Account verification success',
                error:null,
                isLoading:false
            });

        } catch (error) {
            set({ 
                error:error?.response?.message || 'Error signing in', 
                isLoading:false 
            });
        }

    },



}));