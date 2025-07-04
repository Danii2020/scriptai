import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google";
import Adsense from "./generate/components/AdSense";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Scriptioo",
    description: "Effortlessly generate engaging, long-form or short-form video scripts.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Adsense pId="7834926758816724"/>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#2f2f32] to-[#1a1a2e]`}
            >
                {children}
                <Analytics />
                <footer className="w-full mt-12 py-6 text-center text-sm text-[#b0b0b0] bg-transparent bottom-0">
                  <a href="/privacy-policy" className="hover:underline mx-2">Privacy Policy</a>|
                  <a href="/terms-and-conditions" className="hover:underline mx-2">Terms &amp; Conditions</a>
                </footer>
            </body>
        </html>
    );
}
