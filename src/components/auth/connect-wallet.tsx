"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ConnectWallet() {
    const { connected } = useWallet();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-center">
                    ZapLoans
                </h1>

                <div className="flex justify-center mb-6">
                    <WalletMultiButton />
                </div>

                {connected ? (
                    <p className="text-center text-green-600 font-medium">
                        Wallet connected successfully!
                    </p>
                ) : (
                    <p className="text-center text-gray-600">
                        Connect your wallet to continue
                    </p>
                )}
            </div>
        </div>
    );
}
