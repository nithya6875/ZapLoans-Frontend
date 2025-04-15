"use client";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { ReactNode, useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";

// WalletContextProvider is a wrapper component that provides the wallet context to the app
export function WalletContextProvider({ children }: { children: ReactNode }) {
    // The network to connect to
    const network = WalletAdapterNetwork.Devnet;

    // The endpoint to connect to
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // The wallets to use
    const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

    // The ConnectionProvider component provides the connection to the Solana cluster
    return (
        <ConnectionProvider endpoint={endpoint}>
            {/* set wallets = {[]} to use all wallets */}
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
