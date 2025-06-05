'use client';
import { useEffect, useState } from 'react';
import { Roadmap } from '@/utils/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { exportToCSV } from '@/utils/exportToCSV';
import DeleteRoadmapButton from '@/components/mainUi/DeleteRoadmapButton';
import ResultDisplay from '@/components/mainUi/ResultDisplay';
import { Button } from '@/components/ui/button';
import { LoaderLink } from '@/components/mainUi/loaderLinks';
import { AnimatedText, AnimatedTextSmall } from '@/utils/constants/animate';


//////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function MainContent() {
    const [roadmaps, setRoadmaps] = useState<{ key: string; data: Roadmap }[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const STORAGE_KEY = "active_roadmap_tab";

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // REFRESH TOTAL COUNTER
    const [refreshCounter, setRefreshCounter] = useState(0);
    console.log(refreshCounter); // JUST BECAUSE refreshCounter IS NOT GETTING USE ANYWHERE

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // ⏳ 2 seconds loading

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

        return () => clearTimeout(timer); // cleanup
    }, []);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const savedTab = localStorage.getItem(STORAGE_KEY);
        if (savedTab && roadmaps.some(({ key }) => key === savedTab)) {
            setActiveTab(savedTab);
        } else if (roadmaps.length > 0) {
            setActiveTab(roadmaps[0].key); // Default to first if nothing saved
        }
    }, [roadmaps])

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-white text-xl font-semibold animate-pulse">
                <AnimatedTextSmall text="Loading...." />
            </div>
        );
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (roadmaps.length === 0) {
        return (
            <div className="p-10 text-center text-lg text-white min-h-[70vh] flex flex-col items-center justify-center my-20">
                <AnimatedText text="Oops!" />
                <p className="mt-8 text-gray-300 max-w-xl mx-auto animate-fade-in-up">
                    No roadmaps yet. Wanna make one and flex your skills?
                </p>
                <LoaderLink
                    href={'/'}
                    className='w-fit h-12 px-10 flex items-center justify-center rounded-sm bg-neutral-800 hover:bg-neutral-700 duration-300 mt-16 text-sm font-medium hover:scale-105 active:scale-95'
                >
                    Create Your First Roadmap
                </LoaderLink>
            </div>
        );
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Save active tab to localStorage on change
    const handleTabChange = (value: string) => {
        setActiveTab(value);
        localStorage.setItem(STORAGE_KEY, value);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="py-4 lg:py-6">
            <Tabs value={activeTab || ""} onValueChange={handleTabChange} className='mt-0 lg:mt-0'>
                <div className='lg:hidden'>
                    <TabsList className="flex overflow-x-auto whitespace-nowrap justify-start no-scrollbar gap-2 p-2 min-h-14 h-fit mb-1 bg-transparent w-full">
                        {roadmaps.map(({ key }) => (
                            <TabsTrigger
                                key={key}
                                value={key}
                                className="capitalize bg-transparent border border-neutral-700 text-white cursor-pointer px-4 py-2 shrink-0 text-xs data-[state=active]:bg-neutral-700"
                            >
                                {key.replace("roadmap_", "").replace(/_/g, " ")}
                            </TabsTrigger>
                        ))}

                        <LoaderLink
                            href="/"
                            className="capitalize bg-transparent border border-neutral-700 text-white cursor-pointer px-4 py-2 shrink-0 text-xs font-medium flex items-center justify-center rounded-lg"
                        >
                            + Add New
                        </LoaderLink>
                    </TabsList>
                </div>
                <div className='hidden lg:block mt-4'>
                    <TabsList className="flex flex-wrap justify-start gap-2 p-1 min-h-14 h-fit max-h-full mb-6 bg-neutral-700 w-full">
                        {roadmaps.map(({ key }) => (
                            <TabsTrigger key={key} value={key} className="capitalize bg-neutral-800 text-white cursor-pointer h-12 px-10">
                                {key.replace("roadmap_", "").replace(/_/g, ' ')}
                            </TabsTrigger>
                        ))}
                        <LoaderLink href={'/'} className="capitalize bg-neutral-800 text-white cursor-pointer h-12 flex min-w-40 w-full font-medium items-center justify-center rounded-lg">
                            + Add New
                        </LoaderLink>
                    </TabsList>
                </div>


                {roadmaps.map(({ key, data }) => {
                    const displayName = key.replace("roadmap_", "").replace(/_/g, ' ');
                    const totalTopics = Object.values(data).flat().length;
                    const completedTopics = Object.values(data).flat().filter(t => t.marked).length;

                    return (
                        <TabsContent key={key} value={key} className='px-2 lg:px-4'>
                            <div className='flex justify-between items-center gap-10 px-3'>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    <h3 className='text-white font-semibold text-lg sm:text-xl capitalize'>
                                        <span className='text-neutral-400'>{displayName}</span>
                                        {completedTopics === totalTopics ?
                                            <span className='text-green-400 font-bold'> Completed</span>
                                            :
                                            <span className='text-base text-gray-400 shrink-0 whitespace-nowrap'> ({completedTopics}/{totalTopics})</span>
                                        }
                                    </h3>
                                </div>

                                <div className='gap-4 hidden lg:flex'>
                                    <Button
                                        onClick={() => exportToCSV(data, displayName)}
                                        className="bg-neutral-800 duration-300 hover:bg-neutral-700 h-10 px-6 py-2 rounded-sm cursor-pointer"
                                    >
                                        Export CSV
                                    </Button>

                                    <DeleteRoadmapButton
                                        displayName={displayName}
                                        roadmaps={roadmaps}
                                        activeTab={activeTab}
                                        setRoadmaps={setRoadmaps}
                                        setActiveTab={setActiveTab}
                                        itemKey={key}
                                    />
                                </div>
                            </div>

                            <ResultDisplay result={data} searchTopic={displayName} triggerRefresh={() => setRefreshCounter(prev => prev + 1)} />

                            <div className='gap-4 flex w-full justify-end'>
                                <Button
                                    onClick={() => exportToCSV(data, displayName)}
                                    className="bg-neutral-800 duration-300 hover:bg-neutral-700 h-10 px-6 py-2 rounded-sm cursor-pointer"
                                >
                                    Export CSV
                                </Button>

                                <DeleteRoadmapButton
                                    displayName={displayName}
                                    roadmaps={roadmaps}
                                    activeTab={activeTab}
                                    setRoadmaps={setRoadmaps}
                                    setActiveTab={setActiveTab}
                                    itemKey={key}
                                />
                            </div>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
}
