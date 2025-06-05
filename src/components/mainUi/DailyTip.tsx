'use client';
import { tips } from '@/utils/constants/tips';
import { useEffect, useState } from 'react';
import { FaRegLightbulb } from 'react-icons/fa6';


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function DailyTip() {
    const [tip, setTip] = useState('');

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const stored = localStorage.getItem('daily_tip');

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (stored) {
            const { date, value } = JSON.parse(stored);
            if (date === today) return setTip(value);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        const randomIndex = Math.floor(Math.random() * tips.length);
        const selected = tips[randomIndex];
        setTip(selected);
        localStorage.setItem('daily_tip', JSON.stringify({ date: today, value: selected }));
    }, []);
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="bg-neutral-800 w-full max-w-7xl mx-auto p-8 rounded-lg shadow-lg">
            <p className="text-lg font-medium text-gray-400 mb-3 flex items-center gap-1 select-none"><FaRegLightbulb /> Daily Tip :</p>
            <p className="mt-1 text-white font-medium text-xl">{tip}</p>
        </div>
    );
}