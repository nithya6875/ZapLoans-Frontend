import axios from "axios";
import { config } from "@/utils/config";

// API service of Wallet
export const authService = {
    // Login with wallet address
    loginWithWallet: async (
        username: string,
        walletAddress: string,
        email: string
    ) => {
        try {
            const response = await axios.post(`${config.API_URL}/api/auth`, {
                username,
                walletAddress,
                email,
            });
            return response.data;
        } catch (error) {
            console.error("Login error", error);
        }
    },

    // Get user by wallet address
    getUserByWallet: async (walletAddress: string) => {
        try {
            const response = await axios.get(
                `${config.API_URL}/api/auth?walletAddress=${walletAddress}`
            );
            return response.data;
        } catch (error) {
            console.error("Error getting user", error);
        }
    },
};
