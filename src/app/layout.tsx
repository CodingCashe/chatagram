import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from '@/providers/react-query-provider'
import ReduxProvider from '@/providers/redux-provider'
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import { ThemeProvider } from "@/components/providers/theme-provider"
import {Toaster} from "sonner"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yazil | Automate > Engage > Grow",
  description: "Next-Level DM Automations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className={inter.className}
        
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          
          <ReduxProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
          <Toaster />
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
    
  );
}
