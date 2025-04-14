"use client"
import { authService } from "@/services/api";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage(){
    const { publicKey, connected } = useWallet();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(()=>{
        async function checkExistingUser(){
            if(connected && publicKey){
                setIsLoading(true);
                try{
                    const response = await authService.getUserByWallet(publicKey.toString());
                    if(response.user){
                        router.push("/dashboard");
                    }else{
                        setIsRegistering(true);
                    }
                }catch(error:any){
                    if(error.response && error.response.status === 404){
                        setIsRegistering(true);
                    }else{
                        setError("Failed to check user status");
                        console.error("error checking user",error);
                    }
                }finally{
                    setIsLoading(false);
                }
            }
        }

        checkExistingUser()

    },[connected,publicKey, router]);

    async function handleLoginClick() {
        if (!connected || !publicKey) {
            setError("Please connect your wallet first");
            return;
        }
        if (!username.trim()) {
            setError("Username is required");
            return;
        }

        setIsLoading(true);
        setError("");

        try{
            const response:any = authService.loginWithWallet( //need to change the type of response based on backend
                username,
                publicKey.toString(),
                email
            )
            if(response.user){    //depends on the backend as well
                router.push("/dashboard");
            }

        }catch(error){
            console.error("Login error:",error);
            setError("Failed to register. Please try again")
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-center">ZapLoans</h1>

                {/* Wallet Connect Button */}
                <div className="flex justify-center mb-6">
                    <WalletMultiButton />
                </div>

                {/* Show error message if any */}
                {error && (
                    <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Registration fields shown after wallet connection */}
                {connected && isRegistering && (
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Enter username"
                            />
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="Enter email"
                            />
                        </div>
                        
                        <button
                        onClick={handleLoginClick}
                        disabled={isLoading}
                        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                        >
                        {isLoading ? "Loading..." : "Continue"}
                        </button>
                    </div>
                )}
                
                {/* Show loading indicator */}
                {isLoading && !isRegistering && (
                    <div className="flex justify-center">
                        <p>Loading...</p>
                    </div>
                )}

                 {/* Show instructions if wallet not connected */}
                {!connected && (
                    <div className="mt-4 text-center text-gray-600">
                        Connect your wallet to continue
                    </div>
                )}

            </div>
        </div>
    )

}
