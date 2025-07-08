import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Book, Stars } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
      // This page is public and does not require authentication
      // So we don't need it while the user is signed in
      // This redirect user if he is already signed in
      const session = await auth();
      if (session?.user) redirect("/dictionary");
      
  return (
    <>
      <main className="max-w-6xl mx-auto">
        <div className="hero-sec">
          <h1 className="text-2xl lg:text-4xl font-bold">Welcome to the AI Dictionary</h1>
          <p className="mt-4 text-lg text-center">Your one-step solution for word meanings, examples, and corrections.</p>
          <Button className="bg-gray-200 text-slate-800 rounded-full hover:bg-indigo-900 hover:text-gray-200 px-5 my-4">
            <Link href="/dictionary" className="font-black">Get Started</Link>
          </Button>
        </div>
        <div className="mt-10 p-5 xl:p-0">
          <h2 className="text-2xl lg:text-3xl font-black">Explore Our Tools</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-5">
            <Link href="/dictionary">
              <div className="flex w-full items-center justify-center gap-4 p-5 shadow-xl rounded-xl border-2 border-gray-500">
                <Book className="w-20 h-20 text-indigo-900" />
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold">AI Dictionry</h2>
                  <p className="text-lg">Get the meaning of one or group of word with AI examples.</p>
                </div>
              </div>
            </Link>
            
            <Link href="/enhancer">
              <div className="flex w-full items-center justify-center gap-4 p-5 shadow-xl rounded-xl border-2 border-gray-500">
                <Stars className="w-20 h-20 text-indigo-900" />
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold">AI Grammar Enhancer</h2>
                  <p className="text-lg">Get the meaning of one or group of word with AI examples.</p>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
        
      </main>
      <footer className="mt-10 p-10 bg-indigo-800 text-white">
        <div className="mt-5 text-center">
          <p className="text-sm">© 2023 AI Dictionary. All rights reserved.</p>
          <p className="text-sm">Made ❤️ by MBT Project series</p>
        </div>
      </footer>
    </>
  );
}
