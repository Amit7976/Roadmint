"use client";
import React, { useEffect, useState } from "react";
import askAI from "@/utils/askAi";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { PageProps } from "@/utils/types";
import loadingStates from "@/utils/constants/loadingStates";
import ResultDisplay from "@/components/mainUi/ResultDisplay";

// Base64 encode/decode
const encrypt = (data: any) => btoa(unescape(encodeURIComponent(JSON.stringify(data))));
const decrypt = (data: string) => JSON.parse(decodeURIComponent(escape(atob(data))));

// 🔁 Helper: Converts all topics from string[] to object[] with `marked: false`
const normalizeResult = (data: any) => {
    const normalized: any = {};

    for (const subject in data) {
        if (Array.isArray(data[subject])) {
            normalized[subject] = data[subject].map((topic: any) =>
                typeof topic === "string"
                    ? { title: topic, marked: false }
                    : {
                        title: topic.title || topic,
                        marked: topic.marked ?? false,
                    }
            );
        }
    }

    return normalized;
};

function MainContent({ topic }: PageProps) {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [minimumTimePassed, setMinimumTimePassed] = useState(false);

    useEffect(() => {
        if (!topic) return;

        const cacheKey = `roadmap_${topic}`;
        const cached = localStorage.getItem(cacheKey);

        // ✅ Use cached
        if (cached) {
            try {
                const decrypted = decrypt(cached);
                setResult(normalizeResult(decrypted));
                setLoading(false);
                setMinimumTimePassed(true);
                return;
            } catch (err) {
                console.error("Decryption failed. Falling back to API...", err);
            }
        }

        // 🚀 Fetch new
        const minDuration = 8000;
        const displayDelay = 5000;

        setLoading(true);
        setResult(null);
        setMinimumTimePassed(false);

        const timer = setTimeout(() => setMinimumTimePassed(true), minDuration);

        askAI({
            topic,
            setResult: (res: string) => {
                try {
                    const json = res.match(/```json\n([\s\S]*?)\n```/);
                    const parsed = json?.[1] ? JSON.parse(json[1]) : res;
                    const normalized = normalizeResult(parsed);

                    setResult(normalized);
                    localStorage.setItem(cacheKey, encrypt(normalized));
                } catch (err) {
                    console.error("AI response parse failed:", err);
                    setResult(res);
                }
            },
            setLoading: (bool: boolean) => {
                if (!bool) {
                    setTimeout(() => setLoading(false), displayDelay);
                }
            },
        });

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="whitespace-pre-wrap text-white p-4 rounded min-h-screen">
            {loading || !minimumTimePassed ? (
                <Loader loadingStates={loadingStates} loading={true} duration={1300} />
            ) : (
                    <ResultDisplay result={result} searchTopic={topic} />
            )}
        </div>
    );
}

export default MainContent;
