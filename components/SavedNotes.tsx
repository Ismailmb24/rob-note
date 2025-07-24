"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link"
import DeleteNote from "./DeleteNote"
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { NoteSession } from "@/lib/generated/prisma";
import SavedNotesSkeleton from "./SavedNoteSkeleton";
import { usePathname } from "next/navigation";

export default function SavedNotes() {
  // get current active path from the URL
  // using usePathname from next/navigation
  // this will update the active state when the URL changes
  const activePath = usePathname();

  const [noteSessions, setNoteSessions] = useState<NoteSession[]>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();

  //handle note session state deletion for ui effect or realtime chage
  const onDelete = (id: string) => {
    const newNoteSessions = noteSessions?.filter((noteSession: NoteSession) =>
      noteSession.id !== id
    )
    setNoteSessions(newNoteSessions);
  }

  const { data, loading: Resloading, error: ResError } = useFetch<NoteSession[]>("/api/notesession");
  useEffect(() => {
    if (data) {
      setNoteSessions(data);
      setLoading(Resloading);
      setError(!!ResError);
    }
  }, [data]);

  if (!data) return <SavedNotesSkeleton />

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Notes</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {noteSessions?.map((noteSession: any) => (
              <SidebarMenuItem
                key={noteSession.id}
                className={`group/item`}>
                <SidebarMenuButton
                isActive={activePath.includes(`/enhancer/${noteSession.id}`)}  >
                  <Link href={`/enhancer/${noteSession.id}`} className="w-full">
                    {noteSession.title}
                  </Link>
                </SidebarMenuButton>
                <DeleteNote id={noteSession.id} onDeleteNoteSession={onDelete} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}