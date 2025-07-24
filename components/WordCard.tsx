import { item } from "./WordList";
import { Card, CardContent, CardHeader } from "./ui/card";
import WordHead from "./WordHead";

export default function WordCard({ item }: { item: item}) {
    
    return (
            <Card key={item.word} className="p-2 py-3 mt-10 mx-5">
                <CardHeader className="flex items-center">
                    <WordHead data={item} />
                </CardHeader>
                <CardContent className="text-gray-500">
                    <p 
                    className="text-lg">
                        {item.meanings[0].definitions[0].definition}
                    </p>
                </CardContent>
            </Card>
    );
}