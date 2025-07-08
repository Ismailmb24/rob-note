import { Input } from "./ui/input";

export default function SearchForm() {
    return (
        <div className="mt-5">
            <form action="/dictionary" method="GET" className="w-11/12 mx-auto" noValidate autoComplete="off">
                <Input
                name="search" 
                type="text" 
                placeholder="search for word or phrase"
                className="w-full py-2 pl-10 border-2 border-gray-500 rounded-full focus:outline-none bg-[url('../public/search.png')] bg-no-repeat bg-[10px] bg-[length:20px_20px] placeholder:text-gray-500"
                />
            </form>
        </div>
    )
}