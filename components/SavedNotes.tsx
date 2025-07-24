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

  //this hold note list data of current note session
  const [noteSessions, setNoteSessions] = useState<NoteSession[]>();

  //handle note session state deletion for ui effect or realtime chage
  const onDelete = (id: string) => {
    const newNoteSessions = noteSessions?.filter((noteSession: NoteSession) =>
      noteSession.id !== id
    )
    setNoteSessions(newNoteSessions);
  }

  //fetch notesession / saved notes from api to display in sidebar
  const { data, loading, error } = useFetch<NoteSession[]>("/api/notesession");

  //update notesession state for ui effect
  useEffect(() => {
    if (data) {
      setNoteSessions(data);
    }
  }, [data]);

  //if loading show a loading ui
  if (loading) return <SavedNotesSkeleton />

  if (error) return (
    <div className="flex flex-col justify-center items-center gap-5">
      <p className="text-slate-900">Failed to load notes</p>
    </div>
  );

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Notes</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {noteSessions?.map((noteSession: NoteSession) => (
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