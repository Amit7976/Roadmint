'use client';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FaRegLightbulb } from 'react-icons/fa6';
import { AnimatedText } from '@/utils/constants/animate';
import { TriviaData } from '@/utils/types';


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function DailyTrivia() {
    const [trivia, setTrivia] = useState<TriviaData | null>(null);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [error, setError] = useState(false);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const stored = localStorage.getItem('daily_trivia');

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (stored) {
            try {
                const { date, value } = JSON.parse(stored);
                if (date === today) {
                    setTrivia(value);
                    setShowOverlay(value.answered ?? false);
                    return;
                }
            } catch (e) {
                console.error("Corrupted localStorage data:", e);
                localStorage.removeItem("daily_trivia");
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        fetch("https://opentdb.com/api.php?amount=1&type=multiple&category=18")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch trivia");
                return res.json();
            })
            .then(data => {
                if (!data?.results?.length) throw new Error("Invalid trivia data");
                const question = data.results[0];
                const value: TriviaData = {
                    question: question.question,
                    correct: question.correct_answer,
                    options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                };
                setTrivia(value);
                localStorage.setItem('daily_trivia', JSON.stringify({ date: today, value }));
            })
            .catch(err => {
                console.error("Trivia fetch error:", err);
                setError(true);
            });
    }, []);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSelect = (opt: string) => {
        if (!trivia || trivia.answered) return;
        const updatedTrivia = { ...trivia, selected: opt, answered: true };
        setTrivia(updatedTrivia);
        setShowOverlay(true); // show overlay after answer

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('daily_trivia', JSON.stringify({ date: today, value: updatedTrivia }));
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleOverlayClick = () => setShowOverlay(false);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="bg-neutral-800 w-full max-w-7xl mx-auto p-8 rounded-lg shadow-lg select-none">
            <p className="text-lg font-medium text-gray-400 mb-3 flex items-center gap-1"><FaRegLightbulb /> Daily Trivia :</p>

            {error ? (
                <div className="text-white text-center py-10">

                    <AnimatedText text="Oops!" />
                    <p className="mt-8 text-gray-300 max-w-xl mx-auto animate-fade-in-up">
                        Unable to load trivia today. <br />
                        Please check your internet or try again later.
                    </p>
                </div>
            ) : trivia ? (
                <div className="mt-2 relative p-4">
                    <p className="mt-1 text-white font-medium text-xl mb-3" dangerouslySetInnerHTML={{ __html: trivia.question }} />
                        <div className="flex flex-wrap gap-4 mt-8">
                        {trivia.options.map((opt: string) => (
                            <Button
                                key={opt}
                                className={`text-sm h-12 px-10 ${trivia.answered ?
                                    opt === trivia.correct ? 'bg-green-600 text-white' :
                                        opt === trivia.selected ? 'bg-red-400 text-white' : 'bg-neutral-400' :
                                    'bg-neutral-700 hover:bg-neutral-600 cursor-pointer active:scale-95 duration-100'} `}
                                onClick={() => handleSelect(opt)}
                                disabled={trivia.answered}
                            >
                                {opt}
                            </Button>
                        ))}
                    </div>

                    {showOverlay && trivia.answered && (
                        <div
                            className="text-base sm:text-2xl font-semibold absolute top-0 left-0 w-full h-full rounded-2xl flex items-center justify-center bg-black/30 backdrop-blur-xs text-white z-10 cursor-pointer"
                            onClick={handleOverlayClick}
                        >
                            {trivia.selected === trivia.correct
                                ? '🎉 Correct! See you tomorrow!'
                                : '❌ Oops! Try again tomorrow.'}
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-white">Loading...</p>
            )}
        </div>
    );
}