import Footer from "@/components/mainUi/Footer";
import Header from "@/components/mainUi/Header";
import { Metadata } from "next";
import MainContent from "./MainContent";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


type Props = {
    params: Promise<{ q: string }>;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const topic = decodeURIComponent(params.q || "");
    return {
        title: `${topic} Personalized Free Roadmap by AI | Roadmint`,
        description: `Start learning ${topic} with your personalized roadmap by Ai.`,
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function TopicPage(props: Props) {
    const params = await props.params;
    const topic = decodeURIComponent(params.q || "");
    return (
        <div className="w-full min-h-screen bg-neutral-900 relative">
            <Header />
            <MainContent topic={topic} />
            <Footer />
        </div>
    );
}