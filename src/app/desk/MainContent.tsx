'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ResultDisplay from '@/components/mainUi/ResultDisplay';

type Topic = {
    title: string;
    marked: boolean;
};

type Roadmap = {
    [subject: string]: Topic[];
};

export default function MainContent() {
    const [roadmaps, setRoadmaps] = useState<{ key: string; data: Roadmap }[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
        const keys = Object.keys(localStorage).filter(k => k.startsWith("roadmap_"));
        const loaded: { key: string; data: Roadmap }[] = [];

        keys.forEach(key => {
            try {
                const raw = localStorage.getItem(key);
                if (raw) {
                    const data = JSON.parse(decodeURIComponent(escape(atob(raw))));
                    loaded.push({ key, data });
                }
            } catch (err) {
                console.error("Failed to parse roadmap from", key, err);
            }
        });

        setRoadmaps(loaded);
        if (loaded.length > 0) {
            setActiveTab(loaded[0].key);
        }
    }, []);

    if (roadmaps.length === 0) {
        return (
            <div className="p-10 text-center text-lg text-white">
                You have no data found.
            </div>
        );
    }

    return (
        <div className="p-6">
            <Tabs value={activeTab || ""} onValueChange={setActiveTab}>
                <TabsList className="flex flex-wrap justify-start gap-2 p-1 h-14 mb-6 bg-neutral-700 w-full">
                    {roadmaps.map(({ key }) => (
                        <TabsTrigger key={key} value={key} className="capitalize bg-neutral-800 text-white cursor-pointer">
                            {key.replace("roadmap_", "").replace(/_/g, ' ')}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {roadmaps.map(({ key, data }) => (
                    <TabsContent key={key} value={key}>

                        <div className='flex justify-between items-center gap-10'>
                            <h3>{key.replace("roadmap_", "").replace(/_/g, ' ')}</h3>
                        </div>

                        <ResultDisplay result={data} searchTopic={key.replace("roadmap_", "")} />

                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
