"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";
import { Input } from '../ui/input';

function SearchInput() {

    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [isPending, startTransition] = useTransition();
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
        
        setProgress(20);
        setTimeout(() => setProgress(60), 50);
        setTimeout(() => setProgress(98), 100);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        setError("");

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        startTransition(() => {
            router.push(`/${encodeURIComponent(topic)}`);
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
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
            {isPending && (
                createPortal(
                    <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-[9999]">
                        <div
                            className="h-full bg-gradient-to-tr from-[#46e701] via-[#ffd86c] to-[#d400ff] rounded-r-full transition-all duration-300 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>,
                    document.body
                )
            )}
        </>
    )
}

export default SearchInput
