import axios from "axios";
import { config } from "@/utils/config";

// API service of Wallet
export const authService = {
    // Login with wallet address
    loginWithWallet: async (
        username: string,
        walletAddress: string,
        email: string,
        signature: string
    ) => {
        try {
            const response = await axios.post(`${config.API_URL}/api/auth`, {
                username,
                walletAddress,
                email,
                signature,
            });
            return response.data;
        } catch (error) {
            console.error("Login error", error);
            throw error;
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
            throw error;
        }
    },

    // Get nonce for wallet signature
    getNonce: async (walletAddress: string) => {
        try {
            const response = await axios.get(
                `${config.API_URL}/api/auth/nonce?walletAddress=${walletAddress}`
            );
            return response.data;
        } catch (error) {
            console.error("Error getting nonce", error);
            throw error;
        }
    },
};
