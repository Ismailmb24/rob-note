import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

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
        <header>
          <nav className="flex items-center justify-between p-2 px-5 lg:px-10 border-b-2 border-gray-300">
            <div>
              <Link href="/">
                <Image src="/logo-min.png" alt="Logo" width={100} height={50} />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dictionary" className="text-lg font-bold text-gray-800">Dictionary</Link>
              <Link href="/enhancer" className="text-lg font-bold text-gray-800">Enhancer</Link>
            </div>
          </nav>

        </header>
        {children}
      </body>
    </html>
  );
}
