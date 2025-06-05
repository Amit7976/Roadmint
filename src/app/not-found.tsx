import Footer from "@/components/mainUi/Footer";
import Header from "@/components/mainUi/Header";
import { LoaderLink } from "@/components/mainUi/loaderLinks";
import { AnimatedText } from "@/utils/constants/animate";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function NotFound() {
    return (
        <>
            <Header />
            <main className="p-10 text-center text-lg text-white min-h-[70vh] flex flex-col items-center justify-center my-20">
                <div className="scale-200 mb-5">
                    <AnimatedText text="404" />
                </div>
                <p className="mt-8 text-gray-300 max-w-xl font-medium text-pretty mx-auto animate-fade-in-up">
                    Page not found
                </p>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 animate-fade-in-up">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <LoaderLink
                    href={'/'}
                    className='w-fit h-12 px-10 flex items-center justify-center rounded-sm bg-neutral-800 hover:bg-neutral-700 duration-300 mt-16 text-sm font-medium hover:scale-105 active:scale-95'
                >
                    Create Your Roadmap
                </LoaderLink>
            </main>
            <Footer />
        </>
    )
}
