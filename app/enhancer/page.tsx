import Enhancer from "@/components/Enhancer";

export async function generateMetadata() {
  return {
    title: `Enhancer`,
    description: `Explore details about.`,
  };
}


export default function Page() {
    return (
        <>
            <Enhancer />
        </>
        
    )
}