import { AnimatedText } from "@/utils/constants/animate";
import trendingCSTopics from '@/utils/constants/trendingCSTopics';
import { LoaderLink } from "./loaderLinks";
import SearchInput from "./SearchInput";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


function Hero() {
    return (
        <div className="relative overflow-hidden h-full">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:pt-28">
                <div className="text-center">
                    <AnimatedText text="Roadmap"/>
                    <p className="mt-5 text-gray-300 max-w-xl mx-auto font-bold text-center flex flex-wrap gap-1">
                        Make sure your topic is clear, specific, and well-defined - the more precise it is, the better the roadmap you&#39;ll get!
                    </p>


                    <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                        <SearchInput/>
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
