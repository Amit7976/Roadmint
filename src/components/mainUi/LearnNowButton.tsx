import { Button } from "../ui/button";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


function LearnNowButton({
    topic,
    ui2,
    subject,
    index,
    handleComplete,
}: {
    topic: { title: string; marked: boolean, note: string };
    ui2: boolean;
    subject: string;
    index: number;
    handleComplete: (subject: string, index: number, unmark?: boolean, note?: string) => void;
}) {
    const handleClick = () => {
        if (topic.marked) {
            handleComplete(subject, index, true, topic.note);
            return;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        const query = encodeURIComponent(topic.title);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (isMobile) {
            window.location.href = `intent://www.youtube.com/results?search_query=${query}#Intent;package=com.google.android.youtube;scheme=https;end;`;
        } else {
            window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <Button
            onClick={handleClick}
            className={`${ui2 ? 'bg-neutral-900' : 'text-purple-300 border-[3px] border-pink-600 hover:bg-pink-600 hover:text-white duration-300'} cursor-pointer select-none flex items-center justify-center h-9 lg:h-12 text-xs md:text-sm border-0 font-extrabold lg:font-medium px-7 lg:px-10 py-1.5 rounded-sm lg:rounded-lg transform active:scale-95 transition-transform duration-150 ease-in-out`}
        >
            Learn {ui2 ? 'Again' : 'Now'}
        </Button>
    );
}

export default LearnNowButton;
