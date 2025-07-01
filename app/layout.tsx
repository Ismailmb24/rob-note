import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {session ? (
          <header>
            <nav className="flex items-center justify-between p-2 px-5 lg:px-10 border-b-2 border-gray-300">
              <div>
                <Link href="/">
                  <Image src="/logo-min.png" alt="Logo" width={100} height={50} />
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/dictionary" className="text-md font-bold text-gray-800">Dictionary</Link>
                <Link href="/enhancer" className="text-md font-bold text-gray-800">Enhancer</Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src={session.user?.image as string}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0) || 
                        session.user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <SignOut />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </nav>
          </header>
        ) : (
        <header>
          <nav className="flex items-center justify-between p-2 px-5 lg:px-10 border-b-2 border-gray-300">
            <div>
              <Link href="/">
                <Image src="/logo-min.png" alt="Logo" width={100} height={50} />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button 
              className="border-2 border-indigo-500 rounded-xl hover:bg-white" 
              variant="outline" size="lg">
                <Link href="/signin">Login</Link>
              </Button>
              <Button className="bg-indigo-500 hover:bg-indigo-700 rounded-xl" size="lg">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </nav>
        </header>
        )}
        {children}
      </body>
    </html>
  );
}
