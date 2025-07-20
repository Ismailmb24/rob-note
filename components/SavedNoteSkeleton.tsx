"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "./ui/skeleton";


export default function SavedNotesSkeleton() {
    //create a mock note session data for skeleton loading
    const noteSessions = [...Array(20)];
 
    return (
        <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {noteSessions?.map((noteSession: any, i: number) => (
                <SidebarMenuItem 
                key={i}
                className={`group/item`}>
                  <Skeleton className="w-full h-6 my-2" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    );
}