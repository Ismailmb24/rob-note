import { RefreshCw } from "lucide-react";

export default function RegenerateExample(
    { toggle }: { toggle: (f: (val: boolean) => boolean) => void }
) {
    
    return (
        <RefreshCw
        className="w-6 text-gray-500 cursor-pointer"
        onClick={() => toggle((val: boolean) => !val)} />
    );
}