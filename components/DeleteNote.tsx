"use client";

import { Trash2 } from "lucide-react";
import { SidebarMenuAction } from "./ui/sidebar";
import { deleteNote } from "@/lib/services/note";

export default function DeleteNote(
    {
        id,
        onDeleteNoteSession = () => {}
    }: {
        id: string, 
        onDeleteNoteSession: (id: string) => void
    }
) {
    //handle note session deletion in database
    async function handleDelete(id: string) {
        // This function is called when the delete action is triggered
        // It sends a request to the server to delete the note with the given ID
        if (!id) {
            throw new Error("Note ID is required");
        }
        const response = await deleteNote(id);

        // Handle the response from the server
        // If the response is not ok, throw an error
        if (!response.id) {
            throw new Error("Failed to delete note");
        }

        //delete the note session in state for ui real time change
        onDeleteNoteSession(id);
    }
    
    return (
        <SidebarMenuAction 
        className={`hidden group-hover/item:block`}
        onClick={() => { 
            handleDelete(id);
        }}>
            <Trash2 
            className="text-slate-600" />
        </SidebarMenuAction>
    );
}