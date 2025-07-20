import { ChevronsUpDownIcon, Moon } from "lucide-react"
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { auth } from "@/auth"
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import SignOut from "./SignOut"
import { Separator } from "./ui/separator"
import SidebarNavItem from "./SidebarNavItem"
import SavedNotes from "./SavedNotes"


// type of NavItems
export type NavItem = {
  title: string;
  url: string;
  icon: string;
}

// Menu items.
const NavItems = [
  {
    title: "New Note",
    url: `/enhancer`,
    icon: "edit",
  },
  {
    title: "Dictionary",
    url: "/dictionary",
    icon: "notebook_tabs",
  },
  
]

export default async function AppSidebar() {
  // session user info
  const session = await auth();

  return (
    <Sidebar className="pl-0">
      <SidebarHeader className="my-5">
        <SidebarMenu>
          {NavItems.map( item => (
            <SidebarNavItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarHeader>

      <SavedNotes />

      <Separator />
      <SidebarFooter className="py-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="border-0">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage 
                src={session?.user?.image as string} 
                alt={session?.user?.name as string} />
                <AvatarFallback className="w-8 h-8 border border-slate-500 dark:bg-slate-50 dark:text-slate-900">
                  {(session?.user?.email?.charAt(0)?.toUpperCase() ?? "")}
                </AvatarFallback>
              </Avatar>
              <p 
              className="ml-2 text-slate-600 dark:text-slate-200 w-2/4 overflow-hidden">
                {session?.user?.email}
              </p>
              <ChevronsUpDownIcon 
              size="16" 
              className="ml-auto text-slate-500 hover:text-slate-700 transition-colors" />
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent side="right" className="w-48 mb-10">
            <DropdownMenuItem>
              <Moon /> Dark
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </SidebarFooter>
    </Sidebar>
  )
}