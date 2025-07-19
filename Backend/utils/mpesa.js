import axios from 'axios';

import  { CONSUMER_KEY, CONSUMER_SECRET  } from '../config/env.config.js';

export const getAccessToken = async () => {
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

    try {
        const { data } = await axios.get(url, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
}