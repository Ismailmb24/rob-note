"use client";
import React from "react";
import { SidebarMenuItem, SidebarMenuButton, } from "./ui/sidebar";
import Link from "next/link";
import { NavItem } from "./AppSidebar"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import { Bookmark, Edit, NotebookTabs } from "lucide-react";
import { usePathname } from "next/navigation";

const iconsMap = {
    edit: Edit,
    notebook_tabs: NotebookTabs,
    bookmark: Bookmark
}

export default function SidebarNavItem({ item }: {
    item: NavItem,
}) {
    // get current active path from the URL
    // using usePathname from next/navigation
    // this will update the active state when the URL changes
    const activePath = usePathname();

    const [isActive, setIsActive] = useState<boolean>(false);
    useEffect(() => {
        setIsActive((activePath === item.url || activePath.includes(item.url)));
    }, [activePath, item.url]);

    return (
        <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={item.url} className="w-full" >
                    {iconsMap[item.icon as keyof typeof iconsMap] && 
                        React.createElement(iconsMap[item.icon as keyof typeof iconsMap], { className: "mr-2" })}
                    <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
        </SidebarMenuItem>
    )
}