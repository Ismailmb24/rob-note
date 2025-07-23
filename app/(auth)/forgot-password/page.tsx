import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function Page({ searchParams }: { searchParams : Promise<{sent: string}> }) {
    const sent = (await searchParams).sent;

    //if email sent 
    if (sent === "true") {
        return (
            <div className="h-screen flex justify-center items-center">
                <Card className="w-1/3">
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-500">Email sent successfully</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    //if email failed to sent
    if (sent === "false") {
        return (
            <div className="h-screen flex justify-center items-center">
                <Card className="w-1/3">
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-500">Email failed to sent</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-1/3">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action="/api/auth/forgot-password" method="POST" >
                        <Input type="email" name="email" placeholder="Enter your account email" />
                        <Button 
                        className="w-full mt-4 text-white bg-indigo-500 hover:bg-indigo-800"
                        type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}