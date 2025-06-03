'use client';
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
import { useEffect, useRef, useState } from 'react';


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

// Smart Badge Generator
const getBadge = (streak: number) => {
  const icons = ['🏃‍♂️‍➡️', '✨', '🏆', '💪', '🔥'];
  const labels = ['Streak', '3-Day Streak', '7-Day Streak', '14-Day Streak', '30-Day Streak'];
  const uis = [
    'bg-neutral-800 text-pink-400',
    'bg-neutral-800 text-pink-400',
    'bg-neutral-800 text-white',
    'bg-amber-600 text-white',
    'bg-gradient-to-br from-[#60ff1c] via-[#ff708f] to-[#e97cff] text-white',
  ];

  const idx = streak >= 30 ? 4 : streak >= 14 ? 3 : streak >= 7 ? 2 : streak >= 3 ? 1 : 0;

  return {
    icon: icons[idx],
    label: labels[idx],
    ui: uis[idx],
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function StreakDisplay() {
  const [streak, setStreak] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

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

    const { label } = getBadge(currentStreak);
    if (label && streak >= 3 && !localStorage.getItem(STORAGE_KEYS.BADGE_VIEWED_PREFIX + label)) {
      setShowOverlay(true);
      localStorage.setItem(STORAGE_KEYS.BADGE_VIEWED_PREFIX + label, 'true');
    }
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (!streak) return null;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  const { icon, label, ui } = getBadge(streak);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className={`font-bold text-sm px-5 py-2 rounded-full mt-1 inline-block ${ui}`}>
        <p><b>{icon}</b> Streak - {streak} day{streak > 1 ? 's' : ''}</p>
      </div>

      {showOverlay && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center flex-col cursor-pointer space-y-8"
          onClick={() => setShowOverlay(false)}
        >
          <h2 className="text-[8vw] sm:text-6xl text-center font-extrabold font-serif text-green-400">🎉 Congratulations!</h2>
          <Confetti
            ref={confettiRef}
            className="absolute left-0 top-0 z-0 size-full"
            onMouseEnter={() => confettiRef.current?.fire({})}
          />
          <p className="text-2xl text-white font-medium font-mono text-center">
            You've unlocked the <span className="font-bold text-pink-600 whitespace-nowrap">{icon} {label}</span>
          </p>
          <p className="text-sm text-gray-200 italic">
            Click Anywhere to remove it.
          </p>
        </div>
      )}
    </>
  );
}
