import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authService = {
    loginWithWallet: async (username:string, walletAddress:string, email:string) => {
        try{
            const response = await axios.post(`${API_URL}/api/auth`,{
                username,
                walletAddress,
                email,
            })
            return response.data
        }catch(error){
            console.error("Login error",error);
        }
    },

    getUserByWallet: async (walletAddress:string) => {
        try{
            const response = await axios.get(`${API_URL}/api/auth?walletAddress=${walletAddress}`);
            return response.data;
        }
        catch(error){
            console.error("Error getting user",error);
        }
    }
};