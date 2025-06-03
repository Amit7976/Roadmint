import { Button } from "../ui/button";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


function LearnNowButton({ topic, ui2 }: { topic: { title: string }, ui2: boolean }) {
    const handleClick = () => {
        const query = encodeURIComponent(topic.title);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (isMobile) {
            // Try to open in YouTube app
            window.location.href = `intent://www.youtube.com/results?search_query=${query}#Intent;package=com.google.android.youtube;scheme=https;end;`;
        } else {
            // Desktop fallback
            window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <Button
            onClick={handleClick}
            className={`${ui2 ? 'bg-neutral-900' : 'text-purple-300 border-[3px] border-pink-600 hover:bg-pink-600 hover:text-white duration-300'} flex items-center justify-center h-9 lg:h-12 text-xs md:text-sm font-extrabold lg:font-medium px-7 lg:px-10 py-1.5 rounded-sm lg:rounded-lg`}
        >
            Learn {ui2?'Again':'Now'}
        </Button>
    );
}

export default LearnNowButton;