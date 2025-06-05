"use client"
import { AnimatedText } from "@/utils/constants/animate";
import trendingCSTopics from '@/utils/constants/trendingCSTopics';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from '../ui/input';
import { LoaderLink } from "./loaderLinks";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


function Hero() {
    const router = useRouter();
    const [error, setError] = useState("");

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const topic = formData.get("roadmapSearch")?.toString().trim();

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (!topic || topic.replace(/\s/g, "").length < 2) {
            setError("Please enter at least 2 non-space characters.");
            return;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        setError("");
        router.push(`/${encodeURIComponent(topic)}`);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="relative overflow-hidden h-full">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:pt-28">
                <div className="text-center">
                    <AnimatedText text="Roadmap"/>
                    <p className="mt-5 text-gray-300 max-w-xl mx-auto font-bold text-center flex flex-wrap gap-1">
                        Make sure your topic is clear, specific, and well-defined - the more precise it is, the better the roadmap you&#39;ll get!
                    </p>


                    <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                        <form onSubmit={submitHandler}>
                            <div className="bg-gradient-to-br from-[#60ff1c] via-[#ff708f]  to-[#e97cff] p-1 rounded-2xl">
                                <div className="relative z-10 flex gap-x-3 px-3 py-2 items-center bg-neutral-800 rounded-2xl shadow-2xl shadow-gray-900/20">
                                    <div className="w-full h-10">
                                        <Input
                                            type="text"
                                            name="roadmapSearch"
                                            id="roadmapSearch"
                                            className="outline-0 focus-visible:ring-0 focus-visible:outline-0 ring-0 border-0 text-white font-medium capitalize tracking-wider h-10"
                                            autoFocus
                                            placeholder="Topic Name..."
                                            onChange={() => setError("")}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            type="submit"
                                            className="size-11 inline-flex justify-center items-center gap-x-2 cursor-pointer text-sm font-medium rounded-lg bg-gradient-to-br from-[#60ff1c] via-[#ff708f]  to-[#e97cff] text-white focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none hover:scale-105 duration-300"
                                        >
                                            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {error && (
                                <p className="text-sm text-red-500 mt-2 font-medium">{error}</p>
                            )}
                        </form>
                    </div>

                    <div className="mt-10 sm:mt-20 flex items-center flex-wrap gap-2 justify-center">
                        {trendingCSTopics.map((topic, index) => (
                            <LoaderLink
                                href={'/' + topic}
                                key={index}
                                className='bg-transparent border-2 border-neutral-800 text-gray-300 hover:text-white duration-300 hover:scale-105 font-medium rounded-lg py-2.5 px-5 w-fit text-xs active:scale-95 cursor-pointer'
                            >
                                {topic}
                            </LoaderLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
