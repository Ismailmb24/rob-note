import Enhancer from "@/components/Enhancer";
import { useFetch } from "@/hooks/useFetch";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    //Fetch previous saved notes
    const notesession = await fetch(`${process.env.ORIGIN_URL}/api/notesession/${id}`);
    const data = await notesession.json();

    return {
        title: `${data?.title}`,
        description: `Explore details about.`,
    };
}

export default function Page() {

    return (
        <Enhancer />
    );
}