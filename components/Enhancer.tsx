"use client";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import OutputConfig from "./OutputConfig";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";
import { Separator } from "./ui/separator";
import Enhancement from "./Enhancement";
import { NoteTypes } from "@/lib/services/note";
import { useParams, useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { usePagination } from "@/hooks/use-pagination";

export default function Enhancer() {

    const router = useRouter();
    const params = useParams();
    const sessionId = params.id;

    const [notes, setNotes] = useState<NoteTypes[]>([]); //this hold note list data of current note session
    //this fucntion add note to the state for realtime ui update
    const onAddNote = (note: NoteTypes) => {
        setNotes((notes) => [
            ...(notes ?? []),
            note
        ]);
    }

    const [formValue, setFormValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isCustomPrompt, setCustomPrompt] = useState<boolean>(false);
    const [customPromptValue, setCustomPromptValue] = useState<string | null>();


    //Fetch previous saved notes
    const { 
        data, 
        loading: savedNoteLoading, 
        error: savedNoteError 
    } = useFetch<any>(`/api/notesession/${sessionId}`);

    // update notes state with the saved note data
    useEffect(() => {
        setNotes(data?.notes); 
    }, [data]);

     // save each character type in textarea on formvalue state
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const value = target.value;
        setFormValue(value);
    }

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>, sessionId?: string) => {
        //cancel a default form beheviour
        e.preventDefault();
        setLoading(true);
        setFormValue("");

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const originalText = formData.get("original-text") as string;
        const language = formData.get("language");
        const turn = formData.get("turn");
        const prompt = formData.get("prompt");

        const note = {
            sessionId,
            originalText,
            language,
            turn,
            prompt,
        }
        
        const res = await fetch(`/api/ai/enhancer`, {
            method: "POST",
            body: JSON.stringify(note),
        });

        const noteResponce = await res?.json();
        console.log("Note correction", noteResponce)
        // if there is no rewsponse message return error
        if (res.status !== 200) {
            setError(true);
        }
        //if the note return seccessfully set it to note state
        onAddNote(noteResponce);

        //if its in ehancer page and the ehanced text is returned the redirect to it's dynamic route
        if (!sessionId) {
            router.push(`/enhancer/${noteResponce.sessionId}`);
            return;
        }


        // this set enhaced note loading to false to remove the loading ui
        setLoading(false);
    }
    
    return (
        <main className="w-full flex flex-col lg:flex-row">
            <div className="flex flex-col w-full lg:w-2/3">
                <div className="text-slate-800">
                    <Enhancement
                    notes={notes}
                    loading={loading || savedNoteLoading}
                    error={error || !!savedNoteError} />
                </div>
            </div>
            
            <div>
                <Separator orientation="vertical"/>
            </div>
            
            <div className="flex flex-col w-full lg:w-[26%] lg:h-screen fixed bottom-1 lg:right-0 bg-white">
                <form 
                action="/" 
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    handleFormSubmission(e, sessionId as string);
                }}
                className="p-4 w-full h-full">
                    <Textarea name="original-text" 
                    className="w-full max-h-52 lg:h-10/12 lg:max-h-10/12  border-b border-gray-300 resize-none rounded-lg focus:outline-none" 
                    placeholder="Type your text here..."
                    onChange={handleInputChange}
                    value={formValue}
                    ></Textarea>
                    <div className="flex justify-between mt-5 items-center">
                        <OutputConfig
                        isCustomPrompt={isCustomPrompt}
                        setCustomPrompt={setCustomPrompt}
                        setCustomPromptValue={setCustomPromptValue} />
                        <div>
                            <Button
                            variant="secondary"
                            className="rounded-full bg-indigo-800 text-white dark:hover:text-white hover:text-black cursor-pointer" 
                            type="submit"
                            disabled={!formValue || (isCustomPrompt && !customPromptValue)}>
                                <SendHorizonal />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        </main>
    );
}