import { AnimatedTextSmall } from "@/utils/constants/animate";
import { Roadmap } from "@/utils/types";
import { useEffect, useState } from "react";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function CombinedProgressSection({ roadmaps }: { roadmaps: { key: string, data: Roadmap }[] }) {
    const [globalProgress, setGlobalProgress] = useState({ completed: 0, total: 0, percent: 0 });
    const [animatedPercent, setAnimatedPercent] = useState(0);
    const [individualAnimatedPercents, setIndividualAnimatedPercents] = useState<number[]>([]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        let completed = 0;
        let total = 0;
        const animatedPercents: number[] = [];

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        roadmaps.forEach(({ data }) => {
            const topics = Object.values(data).flat();
            const comp = topics.filter(t => t.marked).length;
            completed += comp;
            total += topics.length;
            animatedPercents.push(Math.round((comp / topics.length) * 100));
        });

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        const percent = total ? Math.round((completed / total) * 100) : 0;
        setGlobalProgress({ completed, total, percent });
        setIndividualAnimatedPercents(Array(animatedPercents.length).fill(0));

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        const timer = setTimeout(() => {
            setAnimatedPercent(percent);
            setIndividualAnimatedPercents(animatedPercents);
        }, 500);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        return () => clearTimeout(timer);
    }, [roadmaps]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="mt-56">
            
            <h2 className="text-4xl sm:text-7xl font-bold text-gray-400 animate-fade-in-up flex flex-wrap justify-center">Progress Report</h2>
            
            <div className="lg:flex lg:flex-row w-full lg:items-start relative lg:gap-10">
                <section className="flex flex-col items-center justify-center gap-4 mt-4 px-10 py-16 space-y-3 rounded-4xl w-full lg:sticky lg:top-10">
                    <p className="font-bold font-sans antialiased text-4xl text-[#8c61aa] space-x-0.5 animate-fade-in-up">
                        <span className="text-6xl text-gray-300">{globalProgress.completed}</span>
                        <span className="font- text-neutral-600"> / </span>
                        {globalProgress.total}
                    </p>
                    <div className="w-full rounded-full h-3 bg-neutral-600 mt-5">
                        <div
                            className="h-full rounded-full bg-white transition-all duration-700 ease-in-out"
                            style={{ width: `${animatedPercent}%` }}
                        ></div>
                    </div>
                    <AnimatedTextSmall text="Topics Completed" color="#d59bff" />
                </section>

                <section className="flex flex-col items-center justify-center gap-4 mt-10 px-10 py-16 space-y-20 rounded-4xl w-full">
                    {roadmaps.map(({ key, data }, index) => {
                        const displayName = key.replace("roadmap_", "").replace(/_/g, " ");
                        const topics = Object.values(data).flat();
                        const completedTopics = topics.filter(t => t.marked).length;
                        const totalTopics = topics.length;

                        return (
                            <div key={key} className="flex flex-col justify-between items-center gap-4 px-3 w-full max-w-xl">
                                <h3 className="text-white font-semibold text-2xl sm:text-4xl text-center capitalize">
                                    {displayName}
                                </h3>

                                {completedTopics === totalTopics ? (
                                    <p className="text-green-400 font-bold">Completed</p>
                                ) : (
                                    <p className="text-base text-gray-400 whitespace-nowrap">(<b>{completedTopics}</b> / {totalTopics})</p>
                                )}

                                <div className="w-full rounded-full h-2 bg-neutral-600 mt-2">
                                    <div
                                        className="h-full rounded-full bg-white transition-all duration-700 ease-in-out"
                                        style={{ width: `${individualAnimatedPercents[index] || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </div>
    );
}