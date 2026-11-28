import type { Metadata } from "next";
import { ClerkProvider, } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import {MessageCircle} from 'lucide-react'
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

  robots: {
    index:true ,
    follow:true

  },
  metadataBase: new URL('https://www.innovhubs.com/'),
  icons:{
    icon:'/logo.png',
  },
  title: {
    default: "InnovHubs | Web Development & Automation Agency",
    template: "%s | InnovHubs",
  },
  description: "InnovHubs builds modern business websites, custom web applications, dashboards, and n8n automations to simplify workflows and boost efficiency",
  alternates:{
    canonical:"/"
  },
  keywords: [
    'web agency',
    "web development agency",
    "automation agency",
    "n8n workflow agency",
    "software agency"
  ],
  openGraph: {
    title: "InnovHubs | Web Development & Automation Agency",
    description:
      "Custom websites, web applications, business dashboards, and n8n workflow automation to help businesses work smarter.",
    url: "/",
    siteName: "InnovHubs",
    images: [
      {
        url: "/og-image-v1.png",
        width: 1200,
        height: 630,
        alt: "InnovHubs - Web Development and Automation Agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "InnovHubs | Web Development & Automation Agency",
    description:
      "Custom websites, web applications, business dashboards, and n8n workflow automation for growing businesses.",
    images: ["/og-image-v1.png"],
  },


};
  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">     
            {/* Page Content */}
            <main className="relative z-10 overflow-x-hidden">  
                <ClerkProvider>         
               {children}
               </ClerkProvider>       
            </main>    
      </body>
    </html>
  );
}
