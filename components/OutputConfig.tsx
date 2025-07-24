import { SelectTrigger } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem } from "./ui/select";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Languages, Repeat, Terminal, X } from "lucide-react";
import { Textarea } from "./ui/textarea";

export default function OutputConfig({
    isCustomPrompt,
    setCustomPrompt = () => {},
    setCustomPromptValue = () => {}
}: {
    isCustomPrompt: boolean,
    setCustomPrompt?: (val: boolean) => void,
    setCustomPromptValue?: (val: string) => void
}) {
    // this return custom prompt field if it's activated 
    if (isCustomPrompt) return(
        <div className="flex gap-5 items-center w-4/5 ">
            <X 
            className="cursor-pointer"
            onClick={() => {setCustomPrompt(false)}} 
            />
            <Textarea
            name="prompt"
            className="h-10 resize-none"
            placeholder="Enter Custom Prompt..."
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setCustomPromptValue(e.target.value);
            }}
            />
        </div>
    );
    

    return (
        <div className="flex gap-5">
            <Select name="language" defaultValue="default">
                <Tooltip>
                    <TooltipTrigger>
                        <SelectTrigger> 
                            <Languages className="h-4 w-4" />
                        </SelectTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Language</p>
                    </TooltipContent>
                </Tooltip>
                
                <SelectContent>
                    <SelectItem value="Default">Default</SelectItem>
                    <SelectItem value="Englist">English</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Hausa">Hausa</SelectItem>
                    <SelectItem value="Igbo">Igbo</SelectItem>
                    <SelectItem value="Yoruba">Yoruba</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                </SelectContent>
            </Select>

            <Select name="turn" defaultValue="default">
                <Tooltip>
                    <TooltipTrigger>
                        <SelectTrigger> 
                            <Repeat className="h-4 w-4" /> 
                        </SelectTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Turn</p>
                    </TooltipContent>
                </Tooltip>
                <SelectContent>
                    <SelectItem value="Default">Default</SelectItem>
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                </SelectContent>
            </Select>
            
            <Tooltip>
                <TooltipTrigger>
                    <Terminal className="h-4 w-4" onClick={() => {setCustomPrompt(true)}} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Custom prompt</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}