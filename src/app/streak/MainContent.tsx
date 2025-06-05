"use client"
import CombinedProgressSection from '@/components/mainUi/CombinedProgressSection';
import Header from '@/components/mainUi/Header';
import { AnimatedText } from '@/utils/constants/animate';
import { Roadmap } from '@/utils/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsFire } from "react-icons/bs";
import { PiLockKeyFill } from "react-icons/pi";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const STORAGE_KEYS = {
  STREAK: 'learning_streak',
  LAST_ACTIVE_DATE: 'last_active_date',
  BADGE_VIEWED_PREFIX: 'badge_viewed_',
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const getToday = () => new Date().toISOString().split('T')[0];
const getYesterday = () => {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return y.toISOString().split('T')[0];
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Helper: Encrypt + Decrypt (base64)
const encrypt = (val: string) => btoa(val);
const decrypt = (val: string | null) => (val ? atob(val) : null);

//////////////////////////////////////////////////////////////////////////////////////////////////////////


function MainContent() {
  const [roadmaps, setRoadmaps] = useState<{ key: string; data: Roadmap }[]>([]);
  const [streak, setStreak] = useState(0);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const today = getToday();
    const lastEncrypted = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE);
    const lastDate = decrypt(lastEncrypted);
    const streakStr = decrypt(localStorage.getItem(STORAGE_KEYS.STREAK));
    let currentStreak = parseInt(streakStr || '0', 10);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (lastDate !== today) {
      currentStreak = lastDate === getYesterday() ? currentStreak + 1 : 1;

      localStorage.setItem(STORAGE_KEYS.STREAK, encrypt(currentStreak.toString()));
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE_DATE, encrypt(today));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    setStreak(currentStreak);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const keys = Object.keys(localStorage).filter(k => k.startsWith("roadmap_"));
    const loaded: { key: string; data: Roadmap }[] = [];

    keys.forEach(key => {
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const data = JSON.parse(decodeURIComponent(escape(atob(raw))));
          loaded.push({ key, data });
        }
      } catch (err) {
        console.error("Failed to parse roadmap from", key, err);
      }
    });

    setRoadmaps(loaded);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

  }, [streak]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (!streak) return null;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <main style={{scrollbarWidth: 'none'}} className='bg-neutral-800 h-screen overflow-y-scroll bg-gradient-to-b from-[#7b00d340] to-transparent w-full'>
        <Header show={false} />
        <div className='p-2 w-full'>
          <div className='w-full flex flex-col lg:flex-row items-center justify-center pt-24'>
            <section className='w-full'>
              <div className='w-full pb-3 flex items-center justify-center flex-cl gap-0'>
                <p className='font-bold font-sans antialiased text-8xl text-[#d59bff] animate-fade-in-up'>{streak}</p>
                <BsFire className='text-9xl fill-purple-600 animate-fade-in-up mb-8' />
              </div>
              <AnimatedText text={`day${streak > 1 ? 's' : ''} streak`} color={'#d59bff'} />
            </section>


            <section className='flex justify-center items-center gap-0 lg:gap-3 mt-16 w-full'>
              <div
                style={{ animationDelay: `${0}ms`, animationFillMode: "backwards" }}
                className='w-5/6 aspect-square max-w-24 max-h-24 rounded-full p-3.5 border-purple-500 relative animate-fade-in-up'>
                <Image src={'/images/badge/bronze.png'} alt='Bronze Badge' width={200} height={200} className='w-5/6 aspect-square'></Image>
                <div className={`w-5/6 aspect-square max-w-24 max-h-24 rounded-full bg-gray-600 absolute top-0 left-0 ${(streak >= 3) ? 'hidden' : 'flex'} items-center justify-center`}>
                  <PiLockKeyFill className='text-[#3c234e] text-3xl' />
                </div>
              </div>

              <div
                style={{ animationDelay: `${260}ms`, animationFillMode: "backwards" }}
                className='w-5/6 aspect-square max-w-24 max-h-24 rounded-full p-3.5 border-purple-500 relative animate-fade-in-up'>
                <Image src={'/images/badge/Silver.png'} alt='Silver Badge' width={200} height={200} className='w-5/6 aspect-square'></Image>
                <div className={`w-5/6 aspect-square max-w-24 max-h-24 rounded-full bg-gray-600 absolute top-0 left-0 ${(streak >= 7) ? 'hidden' : 'flex'} items-center justify-center`}>
                  <PiLockKeyFill className='text-[#3c234e] text-3xl' />
                </div>
              </div>

              <div
                style={{ animationDelay: `${440}ms`, animationFillMode: "backwards" }}
                className='w-5/6 aspect-square max-w-24 max-h-24 rounded-full p-3.5 border-purple-500 relative animate-fade-in-up'>
                <Image src={'/images/badge/Gold.png'} alt='Gold Badge' width={200} height={200} className='w-5/6 aspect-square'></Image>
                <div className={`w-5/6 aspect-square max-w-24 max-h-24 rounded-full bg-gray-600 absolute top-0 left-0 ${(streak >= 14) ? 'hidden' : 'flex'} items-center justify-center`}>
                  <PiLockKeyFill className='text-[#3c234e] text-3xl' />
                </div>
              </div>

              <div
                style={{ animationDelay: `${660}ms`, animationFillMode: "backwards" }}
                className='w-5/6 aspect-square max-w-24 max-h-24 rounded-full p-3.5 border-purple-500 relative animate-fade-in-up'>
                <Image src={'/images/badge/Diamond.png'} alt='Diamond Badge' width={200} height={200} className='w-5/6 aspect-square'></Image>
                <div className={`w-5/6 aspect-square max-w-24 max-h-24 rounded-full bg-gray-600 absolute top-0 left-0 ${(streak >= 30) ? 'hidden' : 'flex'} items-center justify-center`}>
                  <PiLockKeyFill className='text-[#3c234e] text-3xl' />
                </div>
              </div>
            </section>
          </div>

          <CombinedProgressSection roadmaps={roadmaps}/>

        </div>
      </main>
    </>
  )
}

export default MainContent
