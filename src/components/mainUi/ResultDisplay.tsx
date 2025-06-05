"use client";
import { Props, Roadmap } from "@/utils/types";
import confetti from "canvas-confetti";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import TopicList from "./TopicList";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


const encrypt = (data: Roadmap) =>
    btoa(unescape(encodeURIComponent(JSON.stringify(data))));


//////////////////////////////////////////////////////////////////////////////////////////////////////////

const ResultDisplay: React.FC<Props> = ({ result, searchTopic, triggerRefresh }) => {
    const [roadmap, setRoadmap] = useState(result);
    const [expanded, setExpanded] = useState<{ [subject: string]: boolean }>({});

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const topicRefs = useRef<{ [subject: string]: Array<HTMLLIElement | null> }>({});

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const initialExpanded: { [subject: string]: boolean } = {};

        let expandedSet = false;

        for (const [subject, topics] of Object.entries(result)) {
            const hasUnmarked = topics.some((t) => !t.marked);
            if (!expandedSet && hasUnmarked) {
                initialExpanded[subject] = true;
                expandedSet = true;
            } else {
                initialExpanded[subject] = false;
            }
        }

        setExpanded(initialExpanded);
    }, [result]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        for (const [subject, topics] of Object.entries(result)) {
            for (let i = 0; i < topics.length; i++) {
                if (!topics[i].marked) {
                    setExpanded((prev) => ({ ...prev, [subject]: true }));

                    setTimeout(() => {
                        topicRefs.current[subject]?.[i]?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                    }, 100);

                    return;
                }
            }
        }
    }, [result]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const toggleExpand = (subject: string) => {
        setExpanded((prev) => ({
            ...prev,
            [subject]: !prev[subject],
        }));
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleComplete = (
        subject: string,
        index: number,
        unmark = false,
        note: string | null = null
    ) => {

        const updated = { ...roadmap };

        updated[subject][index].marked = !unmark;

        if (!unmark) {
            if (note !== null) {
                updated[subject][index].note = note;
            }
            updated[subject][index].timeStamp = new Date();
        } else {
            updated[subject][index].timeStamp = null;
            updated[subject][index].note = "";
        }

        setRoadmap(updated);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        try {
            const encrypted = encrypt(updated);
            localStorage.setItem(`roadmap_${searchTopic}`, encrypted);

            //////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (!unmark) {
                // Confetti + sound when marking complete
                const end = Date.now() + 1000;
                const colors = ["#60ff1c", "#ff708f", "#ffd86c", "#e97cff"];
                const frame = () => {
                    if (Date.now() > end) return;
                    confetti({ particleCount: 2, angle: 60, spread: 55, startVelocity: 60, origin: { x: 0, y: 1 }, colors });
                    confetti({ particleCount: 2, angle: 120, spread: 55, startVelocity: 60, origin: { x: 1, y: 1 }, colors });
                    requestAnimationFrame(frame);
                };
                frame();

                new Audio("/sounds/confetti.mp3").play().catch(console.error);
            } else {
                new Audio("/sounds/undo.mp3").play().catch(console.error);
            }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////

            triggerRefresh?.();

            //////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (!unmark) {
                const nextIndex = index + 1;
                setTimeout(() => {
                    if (topicRefs.current[subject] && topicRefs.current[subject][nextIndex]) {
                        topicRefs.current[subject][nextIndex]?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                    }
                }, 100);
            }

        } catch (err) {
            console.error("Failed to update localStorage:", err);
        }
    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!roadmap)
        return <p className="text-white">AI response will appear here...</p>;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="space-y-6 my-6">
            {Object.entries(roadmap).map(([subject, topics]) => {
                const completedCount = topics.filter((t) => t.marked).length;
                const totalCount = topics.length;
                const isExpanded = expanded[subject];

                if (!topicRefs.current[subject]) {
                    topicRefs.current[subject] = new Array(topics.length).fill(null);
                }

                return (
                    <div
                        key={subject}
                        className="bg-zinc-900 border border-zinc-700 rounded-xl rounded-b-none shadow-lg hover:scale-[1.005] hover:shadow-lg animate-fade-in-up transition-all duration-700"
                    >
                        {/* Sticky Header */}
                        <Button
                            onClick={() => toggleExpand(subject)}
                            className="w-full flex justify-between items-center h-16 cursor-pointer select-none rounded-t-2xl rounded-b-none bg-neutral-900 sticky top-0 z-20 border-b border-zinc-700 shadow-2xl"
                            aria-expanded={isExpanded}
                        >
                            <h2 className={`text-lg truncate sm:text-xl px-1 sm:px-3 font-semibold ${completedCount === totalCount ? 'text-green-400' : 'text-white'}`}>
                                {subject}
                            </h2>
                            <div className="flex items-center space-x-4">
                                <span className={`text-sm ${completedCount === totalCount ? 'text-green-400' : 'text-white/70'}`}>
                                    {completedCount} / {totalCount} <b> </b> Completed {completedCount === totalCount ? '🎉' : ''}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-purple-400 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </Button>


                        {isExpanded && (
                            <TopicList topics={topics} subject={subject} handleComplete={handleComplete} topicRefs={topicRefs} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ResultDisplay;