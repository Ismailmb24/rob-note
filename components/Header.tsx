import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import SignOut from "@/components/SignOut";
// import { auth } from "@/auth";

export default function Header() {
    return (
         <header>
          <nav className="flex items-center justify-between p-2 px-5 lg:px-10 border-b-2 border-gray-300">
            <div>
              <Link href="/">
                <Image src="/logo-min.png" alt="Logo" width={100} height={50} />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button
              className="w-22 border-2 border-indigo-500 rounded-xl hover:bg-white" 
              variant="outline" 
              size="lg" 
              asChild>
                <Link href="/signin">Login</Link>
              </Button>
              <Button className="w-20 bg-indigo-500 hover:bg-indigo-700 rounded-xl" 
              size="lg" 
              asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </nav>
        </header>
        //   <header>
        //     <nav className="flex items-center justify-between p-2 px-5 lg:px-10 border-b-1 border-gray-300">
        //       <div>
        //         <Link href="/">
        //           <Image src="/logo-min.png" alt="Logo" width={100} height={50} />
        //         </Link>
        //       </div>
        //       <div className="flex items-center gap-4">
        //         <Link href="/dictionary" className="text-md font-bold text-gray-800">Dictionary</Link>
        //         <Link href="/enhancer" className="text-md font-bold text-gray-800">Enhancer</Link>
        //         <DropdownMenu>
        //           <DropdownMenuTrigger>
        //             <Avatar>
        //               <AvatarImage
        //                 src={session.user?.image as string}
        //                 alt={session.user?.name || "User"}
        //               />
        //               <AvatarFallback className="bg-indigo-500 text-white font-black">
        //                 {session.user?.name?.charAt(0) || 
        //                 session.user?.email?.charAt(0).toUpperCase() || "U"}
        //               </AvatarFallback>
        //             </Avatar>
        //           </DropdownMenuTrigger>
        //           <DropdownMenuContent>
        //             <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
        //             <DropdownMenuSeparator />
        //             <DropdownMenuItem>
        //               <SignOut />
        //             </DropdownMenuItem>
        //           </DropdownMenuContent>
        //         </DropdownMenu>
        //         </div>
        //     </nav>
        //   </header>
    )
}