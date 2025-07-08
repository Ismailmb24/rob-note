import { ChevronsUpDownIcon, Moon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { auth } from "@/auth"
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import SignOut from "./SignOut"
import { Separator } from "./ui/separator"
import SidebarNavItem from "./SidebarNavItem"
 
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
    url: "/enhancer",
    icon: "edit",
  },
  {
    title: "Dictionary",
    url: "/dictionary",
    icon: "notebook_tabs",
  },
  
]

const notes = [
  { title: "My career journey" },
  { title: "React learning notes" },
  { title: "TypeScript tips" },
  { title: "Project roadmap" },
  { title: "UI design ideas" },
  { title: "API integration checklist" },
  { title: "Meeting summary 2024-01-10" },
  { title: "Feature backlog" },
  { title: "Bug triage notes" },
  { title: "Release plan Q2" },
  { title: "Personal goals 2024" },
  { title: "Book summary: Clean Code" },
  { title: "Workshop feedback" },
  { title: "Sprint retrospective" },
  { title: "Interview preparation" },
  { title: "Learning resources" },
  { title: "Team onboarding" },
  { title: "Weekly review" },
  { title: "Tech stack evaluation" },
  { title: "Open questions" },
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {notes.map( note => (
                <SidebarMenuItem key={note.title}>
                  <SidebarMenuButton >
                    {note.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator />
      <SidebarFooter className="py-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="border-0">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage 
                src={session?.user?.image as string} 
                alt={session?.user?.name as string} />
                <AvatarFallback className="w-8 h-8 border border-slate-500">
                  {(session?.user?.email?.charAt(0)?.toUpperCase() ?? "")}
                </AvatarFallback>
              </Avatar>
              <p className="ml-2 text-slate-600 w-2/4 overflow-hidden">{session?.user?.email}</p>
              <ChevronsUpDownIcon size="16" className="ml-auto text-slate-500 hover:text-slate-700 transition-colors" />
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