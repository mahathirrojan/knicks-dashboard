// components/knicks/Countdown.tsx
import { useEffect, useState } from "react";

type CountdownProps = {
  date: string;
};

export default function Countdown({ date }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(date) - +new Date();
    if (difference <= 0) return null;
    return {
      d: Math.floor(difference / (1000 * 60 * 60 * 24)),
      h: Math.floor((difference / (1000 * 60 * 60)) % 24),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] =
    useState<ReturnType<typeof calculateTimeLeft>>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [date]);

  if (!timeLeft) {
    return <span className="font-bold text-red-600">LIVE / FINAL</span>;
  }

  return (
    <div className="flex justify-center space-x-3 font-mono font-bold text-[#f58426]">
      <div>{timeLeft.d}d</div>
      <div>:</div>
      <div>{String(timeLeft.h).padStart(2, "0")}h</div>
      <div>:</div>
      <div>{String(timeLeft.m).padStart(2, "0")}m</div>
      <div>:</div>
      <div>{String(timeLeft.s).padStart(2, "0")}s</div>
    </div>
  );
}