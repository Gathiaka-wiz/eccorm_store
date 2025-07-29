import axios from 'axios';


export  const apiRequest = async ( method, url, data = null ) => {
    try {
        const response = await axios({ method, url, data });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        throw new Error(message)
    }
}