import React from 'react'
import { TextAnimate } from "@/components/magicui/text-animate";
import Link from 'next/link';
import { div } from 'motion/react-client';

function Hero() {

    const trendingCSTopics = [
        "Web Development",
        "Data Structures and Algorithms",
        "Machine Learning",
        "Artificial Intelligence",
        "Python Programming",
        "C++ Programming",
        "System Design",
        "Operating Systems",
        "Computer Networks",
        "Database Management Systems",
        "Cloud Computing",
        "DevOps",
        "Cybersecurity",
        "Mobile App Development (Android/iOS)",
        "Blockchain Development",
        "Game Development",
        "Computer Architecture",
        "Linux and Shell Scripting",
        "Frontend Development (HTML, CSS, JS, React)",
        "Backend Development (Node.js, Django, Spring Boot)",
        "Software Engineering Principles",
        "Git and Version Control",
        "Data Science",
        "Natural Language Processing (NLP)",
        "Quantum Computing (Beginner Level)",
    ];


    return (
        <>
            {/* Hero */}
            <div className="relative overflow-hidden h-screen">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:pt-28">
                    <div className="text-center">
                        <TextAnimate animation="slideUp" by="character" as='h1' className="text-4xl sm:text-7xl font-bold text-gray-100">
                            Roadmap
                        </TextAnimate>


                        <TextAnimate animation="blurIn" by="word" as={'p'} className="mt-5 text-gray-300 max-w-xl mx-auto">
                            Make sure your topic is clear, specific, and well-defined - the more precise it is, the better the roadmap you'll get!
                        </TextAnimate>


                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            {/* Form */}
                            <form>
                                <div className="bg-gradient-to-br from-[#60ff1c] via-[#ff708f]  to-[#e97cff] p-0.5 rounded-xl">
                                    <div className="relative z-10 flex gap-x-3 px-3 py-2 bg-gray-300 border-4 rounded-xl shadow-2xl border-neutral-500 shadow-gray-900/20">
                                        <div className="w-full">
                                            <label htmlFor="topic-name" className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">Search Roadmap</span></label>
                                            <input type="text" name="topic-name" id="topic-name" className="py-2.5 px-4 block w-full border-transparent rounded-lg outline-none text-black font-semibold capitalize" autoFocus placeholder="Topic Name" />
                                        </div>
                                        <div>
                                            <Link className="size-11 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-gradient-to-br from-[#60ff1c] via-[#ff708f]  to-[#e97cff] text-white focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none" href="#">
                                                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {/* End Form */}

                            {/* SVG Element */}
                            <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                                <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                                    <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                                    <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                                </svg>
                            </div>
                            {/* End SVG Element */}

                            {/* SVG Element */}
                            <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                                <svg className="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                                </svg>
                            </div>
                            {/* End SVG Element */}
                        </div>

                        <div className="mt-10 sm:mt-20 flex items-center flex-wrap gap-2 justify-center">
                            {trendingCSTopics.map((topic, index) => (
                                <Link href={'/' + topic} key={index} className='bg-gray-300 text-black font-medium rounded-lg py-2.5 px-5 w-fit text-sm'>{topic}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Hero */}
        </>
    )
}

export default Hero