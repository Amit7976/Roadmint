'use client';
import { stats } from '@/utils/constants/stats';
import { useEffect, useState } from 'react';
import { FaCodeFork } from 'react-icons/fa6';


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function FunDevStat() {
    const [stat, setStat] = useState('');
   
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const stored = localStorage.getItem('fun_dev_stat');

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (stored) {
            const { date, value } = JSON.parse(stored);
            if (date === today) return setStat(value);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        const randomIndex = Math.floor(Math.random() * stats.length);
        const selected = stats[randomIndex];
        setStat(selected);
        localStorage.setItem('fun_dev_stat', JSON.stringify({ date: today, value: selected }));
    }, []);
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="bg-neutral-800 w-full max-w-7xl mx-auto p-8 rounded-lg shadow-lg">
            <p className="text-lg font-medium text-gray-400 mb-3 flex items-center gap-1 select-none"><FaCodeFork /> Fun Developer Stat :</p>
            <p className="mt-1 text-white font-medium text-xl">{stat}</p>
        </div>
    );
}