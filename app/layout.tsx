import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rob-Dic",
  description: "An AI-powered dictionary and grammar enhancer",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Rob-Dic",
    description: "An AI-powered dictionary and grammar enhancer",
    url: "https://rob-dic.vercel.app",
    siteName: "Rob-Dic",
    images: [
      {
        url: "/logo-min.png",
        width: "auto",
        height: "auto",
        alt: "Rob-Dic Logo",
        type: "image/png",
      },
      {
        url: "/logo.png",
        width: "auto",
        height: "auto",
        alt: "Rob-Dic Logo",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rob-Dic",
    description: "An AI-powered dictionary and grammar enhancer",
    images: ["/logo-min.png"],
    creator: "@robert_rob",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rob-Dic",
    startupImage: "/logo-min.png",
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Is user signed in?
  const session = await auth();

  // default state for the sidebar
  const cookieStore = await cookies();
  const sideState = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        { !session?.user ? (
            <>
              <Header />
              {children}
            </>
          ) : (
            <>
              <SidebarProvider defaultOpen={sideState}>
                <AppSidebar />
                <main className="w-full">
                    <SidebarTrigger className="absolute" />

                  {children}
                </main>
              </SidebarProvider>
            </>
          )}
      </body>
    </html>
  );
}
