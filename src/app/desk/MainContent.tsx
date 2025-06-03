'use client';
import { TextAnimate } from '@/components/magicui/text-animate';
import DeleteRoadmapButton from '@/components/mainUi/DeleteRoadmapButton';
import ResultDisplay from '@/components/mainUi/ResultDisplay';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { exportToCSV } from '@/utils/exportToCSV';
import { Roadmap } from '@/utils/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function MainContent() {
    const [roadmaps, setRoadmaps] = useState<{ key: string; data: Roadmap }[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [refreshCounter, setRefreshCounter] = useState(0);
    console.log(refreshCounter);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const keys = Object.keys(localStorage).filter(k => k.startsWith("roadmap_"));
        const loaded: { key: string; data: Roadmap }[] = [];

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

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

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        setRoadmaps(loaded);
        if (loaded.length > 0) {
            setActiveTab(loaded[0].key);
        }
    }, []);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (roadmaps.length === 0) {
        return (
            <div className="p-10 text-center text-lg text-white min-h-96 flex flex-col items-center justify-center my-20">
                <TextAnimate animation="slideUp" by="character" as='h1' className="text-4xl sm:text-7xl font-bold text-gray-100">
                    Oops!
                </TextAnimate>

                <TextAnimate animation="blurIn" by="word" as='p' className="mt-8 text-gray-300 max-w-xl mx-auto">
                    No roadmaps yet. Wanna make one and flex your skills?
                </TextAnimate>

                <Link href={'/'} className='w-fit h-12 px-10 flex items-center justify-center rounded-sm bg-neutral-800 hover:bg-neutral-700 duration-300 mt-16 text-sm font-medium hover:scale-105 active:scale-95'>Create Your First Roadmap</Link>
            </div>
        );
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="p-4 lg:p-6">
            <Tabs value={activeTab || ""} onValueChange={setActiveTab} className='mt-4 lg:mt-0'>
                <TabsList className="flex flex-wrap justify-start gap-2 p-1 min-h-14 h-fit max-h-full mb-6 bg-neutral-700 w-full">
                    {roadmaps.map(({ key }) => (
                        <TabsTrigger key={key} value={key} className="capitalize bg-neutral-800 text-white cursor-pointer h-12 px-10">
                            {key.replace("roadmap_", "").replace(/_/g, ' ')}
                        </TabsTrigger>
                    ))}
                    <Link href={'/'} className="capitalize bg-neutral-800 text-white cursor-pointer h-12 flex min-w-40 w-full font-medium items-center justify-center rounded-lg">
                        + Add New
                    </Link>
                </TabsList>

                {roadmaps.map(({ key, data }) => {
                    const displayName = key.replace("roadmap_", "").replace(/_/g, ' ');
                    const totalTopics = Object.values(data).flat().length;
                    const completedTopics = Object.values(data).flat().filter(t => t.marked).length;

                    return (
                        <TabsContent key={key} value={key}>
                            <div className='flex justify-between items-center gap-10 mb-5 px-3'>
                                <h3 className='text-white font-medium text-lg sm:text-xl capitalize'>
                                    <span className='text-neutral-400'>Roadmap: </span>{displayName}
                                    {completedTopics === totalTopics ?
                                        <span className='text-green-400 font-bold'> Completed</span>
                                        :
                                        <span className='text-base text-gray-400 shrink-0 whitespace-nowrap'> ( <b>{completedTopics}</b> / {totalTopics} )</span>
                                    }
                                </h3>

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
