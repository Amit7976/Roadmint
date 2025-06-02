import Header from "@/components/mainUi/Header";
import { PagePropsQ } from '@/utils/types';
import { Metadata } from "next";
import MainContent from "./MainContent";


export async function generateMetadata({ params }: PagePropsQ): Promise<Metadata> {
    const { q } = await params;
    const topic = decodeURIComponent(q || "");

    return {
        title: `Learn ${topic} | Roadmap App`,
        description: `Start learning ${topic} with your personalized roadmap.`,
    };
}

export default async function TopicPage({ params }: PagePropsQ) {
    const { q } = await params; // 👈 and here too!
    const topic = decodeURIComponent(q || "");

    return (
        <div className="w-full min-h-screen bg-neutral-900 relative">
            <Header />
            <MainContent topic={topic} />
        </div>
    );
}
