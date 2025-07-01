import Provider from "./provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <Provider>{children}</Provider> {/* 👈 This part runs on client */}
            </body>
        </html>
    );
}