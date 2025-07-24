import Provider from "./provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Provider>{children}</Provider> {/* 👈 This part runs on client */}
        </main>
    );
}