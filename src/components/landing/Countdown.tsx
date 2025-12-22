'use client';

import { useState, useEffect } from 'react';

type CountdownProps = {
  targetDate: string;
};

export default function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Set initial time left
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
  if (!isClient) {
    return null;
  }

  const hasEnded = !timeLeft.days && !timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds;

  return (
    <div className="mt-8 text-center">
      {hasEnded ? (
        <div className="text-2xl font-bold text-accent-foreground animate-pulse">
            The event is happening now!
        </div>
      ) : (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content bg-background/20 backdrop-blur-sm border border-white/20">
                <span className="font-mono text-5xl">
                    {String(timeLeft.days).padStart(2, '0')}
                </span>
                days
            </div> 
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content bg-background/20 backdrop-blur-sm border border-white/20">
                <span className="font-mono text-5xl">
                    {String(timeLeft.hours).padStart(2, '0')}
                </span>
                hours
            </div> 
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content bg-background/20 backdrop-blur-sm border border-white/20">
                <span className="font-mono text-5xl">
                    {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                min
            </div> 
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content bg-background/20 backdrop-blur-sm border border-white/20">
                <span className="font-mono text-5xl">
                    {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                sec
            </div>
        </div>
      )}
    </div>
  );
}
