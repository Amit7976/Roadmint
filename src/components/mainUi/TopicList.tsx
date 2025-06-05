"use client";
import { TopicListProps } from "@/utils/types";
import { useState } from "react";
import DifficultyBadge from "./DifficultyBadge";
import LearnNowButton from "./LearnNowButton";
import MarkCompleteNoteDialog from "./TopicNotes";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


function TopicList({ topics, subject, handleComplete, topicRefs }: TopicListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <ul className="space-y-3 p-3 sm:p-6">
            {topics.map((topic, idx) => {
                const canMark = idx === 0 || topics[idx - 1].marked;
                const isOpen = openIndex === idx;

                return (
                    <li key={idx} ref={(el) => { topicRefs.current[subject][idx] = el; }}>
                        <div
                            style={{ animationDelay: `${idx * 80}ms`, animationFillMode: "backwards" }}
                            className={`animate-fade-in-up overflow-hidden relative flex justify-between items-center py-3 px-5 transition-all rounded-lg duration-500 border-2 shadow-sm cursor-pointer ${topic.marked
                                ? `bg-green-800 border border-green-500 shadow-[0_0_15px_2px_#4ade80] ${isOpen && 'border-b-neutral-800 rounded-b-none'}`
                                : canMark
                                    ? "h-28 bg-zinc-800 border border-zinc-700"
                                    : "bg-zinc-900 border border-zinc-700"
                                }`}
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                        >


                            <div className="lg:hidden absolute w-full h-full">
                                {topic.marked && <div style={{ backgroundImage: `url('/images/bbburst.svg')` }} className="absolute w-full h-full bg-no-repeat bg-center bg-cover opacity-35"></div>}
                            </div>
                            <div className="hidden lg:block absolute w-full h-full">
                                {topic.marked && <div style={{ backgroundImage: `url('/images/bbburst2.svg')` }} className="absolute w-full h-full bg-no-repeat bg-center bg-cover opacity-35"></div>}
                            </div>

                            <span
                                className={`text-sm font-medium md:text-base z-10 ${topic.marked
                                    ? "text-green-300"
                                    : canMark
                                        ? "font-semibold text-white"
                                        : "text-gray-400"
                                    }`}
                            >
                                {idx + 1}. {topic.title}
                                {typeof topic.difficulty === "number" && (
                                    <DifficultyBadge level={topic.difficulty} />
                                )}
                            </span>


                            <div className="flex flex-col lg:flex-row gap-3 items-center justify-center ml-4 z-10">
                                <div className="w-full text-center">
                                    {(topic.marked || canMark) && (
                                        <LearnNowButton
                                            topic={topic}
                                            ui2={topic.marked}
                                            subject={subject}
                                            index={idx}
                                            handleComplete={handleComplete}
                                        />
                                    )}
                                </div>
                                <MarkCompleteNoteDialog
                                    subject={subject}
                                    topicIndex={idx}
                                    onComplete={(subject, index, note) =>
                                        handleComplete(subject, index, false, note)
                                    }
                                    canMark={canMark}
                                    isMarked={topic.marked}
                                />
                            </div>
                        </div>

                        {/* Note toggled here */}
                        {(isOpen && topic.marked) && (
                            <p className="text-white text-sm bg-neutral-800 border-2 border-green-500 border-t-0 p-2 rounded-b-lg select-text font-bold">
                                {topic.note || "No notes available."}
                            </p>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default TopicList;