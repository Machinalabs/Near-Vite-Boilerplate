import { useWallet } from "@/contexts/NearProvider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: HomePage
});

export default function HomePage() {
    const { signedAccountId } = useWallet();

    return (
        <>
            <h1 className="text-5xl font-bold underline">
                Hello world!
            </h1>
            <p>{signedAccountId}</p>
        </>
    )

}