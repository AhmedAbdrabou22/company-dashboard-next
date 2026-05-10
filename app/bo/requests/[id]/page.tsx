"use client";

import TrackRequest from "@/components/bo/requests/TrackRequest";
import { useRouter } from "next/navigation";

interface PageProps {
    params: { id: string };
}

export default function TrackRequestPage({ params }: PageProps) {
    const router = useRouter();

    return (
        <TrackRequest
            requestId={params.id}
            orderDate="Feb 16, 2026"
            status="submitted"
            onAccept={() => console.log("Accepted")}
            onReject={() => router.back()}
        />
    );
}