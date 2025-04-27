import { RefreshCw } from "lucide-react";

export default function RegenerateExample(
    { toggle }: { toggle: (f: any) => void}
) {
    
    return (
        <RefreshCw
        className="w-6 text-gray-500 cursor-pointer"
        onClick={() => toggle((val: any) => !val)} />
    );
}