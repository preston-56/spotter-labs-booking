import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ModeToggle } from "@/components/theme/mode-toggle";

import Link from "next/link";
// import Image from "next/image";
import { HeaderButtons } from "@/client/header-buttons";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Spotter Labs WS | Booking",
  description:
    "Spotter WS-Booking: Effortlessly manage desk bookings and optimize workspace scheduling.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex flex-1 flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="flex h-14 items-center justify-between px-4">
                    <div className="mr-4 flex items-center space-x-2">
                      <SidebarTrigger className="p-2 hover:bg-accent rounded-md transition-colors" />
                      <Link
                        href="/"
                        className="mr-6 flex items-center space-x-2"
                      >
                        {/* <Image
                          src="/images/spotter.png"
                          alt="Spotter Labs Logo"
                          width={40}
                          height={40}
                          className="rounded-full"
                        /> */}
                        <span className="font-bold">Spotter Labs</span>
                      </Link>
                    </div>

                    <div className="flex items-center space-x-4 ml-auto">
                      <HeaderButtons />
                      <ModeToggle />
                    </div>
                  </div>
                </header>

                {/* Page Content */}
                <div className="flex-1">{children}</div>
              </div>
            </div>
            <Toaster
              position="top-center"
              toastOptions={{
                className: "rounded-md shadow-lg",
                style: {
                  background: "#38B2AC",
                  color: "#111827"
                }
              }}
            />
          </ThemeProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
