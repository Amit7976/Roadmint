"use client";

import confetti from "canvas-confetti";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";


type Topic = {
    title: string;
    marked: boolean;
};

type Roadmap = {
    [subject: string]: Topic[];
};

type Props = {
    result: Roadmap;
    searchTopic: string;
};

const encrypt = (data: any) =>
    btoa(unescape(encodeURIComponent(JSON.stringify(data))));
const decrypt = (data: string) =>
    JSON.parse(decodeURIComponent(escape(atob(data))));

const ResultDisplay: React.FC<Props> = ({ result, searchTopic }) => {
    const [roadmap, setRoadmap] = useState(result);
    const [expanded, setExpanded] = useState<{ [subject: string]: boolean }>({});


    // refs for each topic item
    const topicRefs = useRef<{ [subject: string]: Array<HTMLLIElement | null> }>({});
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




    // Scroll to current topic on mount or roadmap change
    useEffect(() => {
        // Just use `result`, no need to decrypt from localStorage
        for (const [subject, topics] of Object.entries(result)) {
            for (let i = 0; i < topics.length; i++) {
                if (!topics[i].marked) {
                    // Expand this subject if not expanded yet
                    setExpanded((prev) => ({ ...prev, [subject]: true }));

                    // Scroll to this topic ref if available
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


    const toggleExpand = (subject: string) => {
        setExpanded((prev) => ({
            ...prev,
            [subject]: !prev[subject],
        }));
    };

    const handleComplete = (subject: string, index: number) => {
        const updated = { ...roadmap };
        if (!updated[subject][index].marked) {
            updated[subject][index].marked = true;
            setRoadmap(updated);


            try {
                const encrypted = encrypt(updated);
                localStorage.setItem(`roadmap_${searchTopic}`, encrypted);


                const end = Date.now() + 1000; // 3 seconds
                const colors = ["#60ff1c", "#ff708f", "#ffd86c", "#e97cff"];
                const frame = () => {
                    if (Date.now() > end) return;

                    confetti({
                        particleCount: 2,
                        angle: 60,
                        spread: 55,
                        startVelocity: 60,
                        origin: { x: 0, y: 1 },
                        colors: colors
                    });
                    confetti({
                        particleCount: 2,
                        angle: 120,
                        spread: 55,
                        startVelocity: 60,
                        origin: { x: 1, y: 1 },
                        colors: colors
                    });

                    requestAnimationFrame(frame);
                };

                frame();

            } catch (err) {
                console.error("Failed to update localStorage:", err);
            }


            // Auto scroll to next topic if exists
            setTimeout(() => {
                const nextIndex = index + 1;
                if (topicRefs.current[subject] && topicRefs.current[subject][nextIndex]) {
                    topicRefs.current[subject][nextIndex]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            }, 1000);
        }
    };

    if (!roadmap)
        return <p className="text-white">AI response will appear here...</p>;

    return (
        <div className="space-y-6">
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
                        className="bg-zinc-900 border border-zinc-700 rounded-xl rounded-b-none shadow-lg"
                    >
                        {/* Sticky Header */}
                        <Button
                            onClick={() => toggleExpand(subject)}
                            className="w-full flex justify-between items-center h-16 cursor-pointer select-none rounded-t-2xl rounded-b-none bg-neutral-900 sticky top-0 z-20 border-b border-zinc-700 shadow-2xl"
                            aria-expanded={isExpanded}
                        >
                            <h2 className={`text-xl px-3 font-semibold ${completedCount === totalCount ? 'text-green-400' : 'text-white'}`}>
                                {subject}
                            </h2>
                            <div className="flex items-center space-x-4">
                                <span className={`text-sm ${completedCount === totalCount ? 'text-green-400' : 'text-white/70'}`}>
                                    {completedCount} / {totalCount} <b> </b> Completed {completedCount === totalCount ? '🎉' : ''}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-teal-300 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
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
                            <ul className="space-y-3 px-6 py-6">
                                {topics.map((topic, idx) => {
                                    const canMark = idx === 0 || topics[idx - 1].marked;
                                    return (
                                        <li
                                            key={idx}
                                            ref={(el) => {
                                                topicRefs.current[subject][idx] = el;
                                            }}
                                            className={`flex justify-between items-center py-3 px-5 rounded-lg transition-all duration-200 shadow-sm ${topic.marked
                                                ? "bg-green-800 border border-green-400"
                                                : canMark
                                                    ? "h-28 bg-zinc-800 border border-zinc-700"
                                                    : "bg-zinc-900 border border-zinc-700"
                                                }`}
                                        >
                                            <span
                                                className={`text-sm font-medium md:text-base ${topic.marked ? "text-green-300" : canMark
                                                    ? "font-semibold text-white"
                                                    : "text-gray-400"
                                                    }`}
                                            >
                                                {idx + 1}. {topic.title}
                                            </span>

                                            <Button
                                                onClick={() => handleComplete(subject, idx)}
                                                disabled={topic.marked || !canMark}
                                                className={`ml-4 text-xs md:text-sm font-medium px-4 py-1.5 rounded-lg transition-colors duration-150 ${topic.marked
                                                    ? "bg-transparent cursor-not-allowed"
                                                    : canMark
                                                        ? "bg-green-500 hover:bg-green-700 text-white cursor-pointer px-10 h-12 text-shadow-lg  "
                                                        : "bg-gray-600 text-gray-300 cursor-not-allowed"
                                                    }`}
                                            >
                                                {topic.marked ? "Completed 🎉" : "Mark Complete"}
                                            </Button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ResultDisplay;
