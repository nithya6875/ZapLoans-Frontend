import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { WalletContextProvider } from "@/components/WalletContextProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Metadata is used for SEO and social media sharing
export const metadata: Metadata = {
    title: {
        default: "Zaploans",
        template: "%s | Zaploans",
    },
    description: "Just zap your loans with zaploans",
};

// This layout is used for all pages in the app
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <WalletContextProvider>{children}</WalletContextProvider>
            </body>
        </html>
    );
}
