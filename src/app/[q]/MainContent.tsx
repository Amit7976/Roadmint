"use client";
import ResultDisplay from "@/components/mainUi/ResultDisplay";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import askAI from "@/utils/askAi";
import loadingStates from "@/utils/constants/loadingStates";
import { PageProps, Roadmap, Topic } from "@/utils/types";
import { useEffect, useState } from "react";

////////////////////////////////////////////////////////////////////////////////////////

const encrypt = (data: Roadmap): string =>
    btoa(unescape(encodeURIComponent(JSON.stringify(data))));

const decrypt = (data: string): Roadmap =>
    JSON.parse(decodeURIComponent(escape(atob(data))));

////////////////////////////////////////////////////////////////////////////////////////

const convertStringToObject = (
    data: Roadmap
): Roadmap => {
    const normalized: Roadmap = {};

    for (const subject in data) {
        if (Array.isArray(data[subject])) {
            normalized[subject] = data[subject].map((topic) => {
                const baseTopic: Topic = {
                    title: typeof topic.subtopic === "string" ? topic.subtopic : topic.title,
                    marked: !!topic.marked,
                    difficulty:
                        typeof topic.difficulty === "number" ? topic.difficulty : 3,
                    note: typeof topic.note === "string" ? topic.note : "",
                    timeStamp: topic.timeStamp ? new Date(topic.timeStamp) : null,
                };
                return baseTopic;
            });
        }
    }

    return normalized;
};

////////////////////////////////////////////////////////////////////////////////////////

function MainContent({ topic }: PageProps) {
    const [result, setResult] = useState<Roadmap | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [minimumTimePassed, setMinimumTimePassed] = useState<boolean>(false);

    useEffect(() => {
        if (!topic) return;

        const cacheKey = `roadmap_${topic}`;
        const cached = localStorage.getItem(cacheKey);
       
        if (cached) {
            try {
                const decrypted = decrypt(cached);
                const normalized = convertStringToObject(decrypted);
                setResult(normalized);
                setLoading(false);
                setMinimumTimePassed(true);
                return;
            } catch (err) {
                console.error("Decryption failed. Falling back to API...", err);
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        const minDuration = 8000;
        const displayDelay = 5000;

        setLoading(true);
        setResult(null);
        setMinimumTimePassed(false);

        const timer = setTimeout(() => setMinimumTimePassed(true), minDuration);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        askAI({
            topic,
            setResult: (res: string) => {
                try {
                    const json = res.match(/```json\n([\s\S]*?)\n```/);
                    const parsed = json?.[1] ? JSON.parse(json[1]) : res;
                    const normalized = convertStringToObject(parsed);
                    console.log('====================================');
                    console.log(parsed);
                    console.log('====================================');
                    setResult(normalized);
                    localStorage.setItem(cacheKey, encrypt(normalized));
                } catch (err) {
                    console.error("AI response parse failed:", err);
                    setResult({
                        fallback: [
                            {
                                title: res,
                                difficulty: 0,
                                note: "",
                                timeStamp: null,
                                marked: false,
                            },
                        ],
                    });
                }
            },
            setLoading: (bool: boolean) => {
                if (!bool) {
                    setTimeout(() => setLoading(false), displayDelay);
                }
            },
        });

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        return () => clearTimeout(timer);
    }, [topic]);

    ////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="whitespace-pre-wrap text-white p-4 rounded min-h-screen">
            {!loading || !minimumTimePassed ? (
                <Loader loadingStates={loadingStates} loading={true} duration={1300} />
            ) : (
                <>
                    <div className="p-4 pb-2">
                            <h3 className='text-white font-medium text-lg sm:text-xl capitalize'>
                                <span className='text-neutral-400'>Roadmap: </span>{topic.replace("roadmap_", "").replace(/_/g, ' ')}
                            </h3>
                    </div>
                    {result && <ResultDisplay result={result} searchTopic={topic} />}
                </>
            )}
        </div>
    );
}

export default MainContent;
