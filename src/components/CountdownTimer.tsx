"use client";

import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

export function CountdownTimer() {
  // resets to a fresh 24h window on every full page load
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 24);
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cell = (value: number, label: string) => (
    <div className="flex flex-col items-center">
      <span className="min-w-[42px] rounded-lg bg-white text-accent-dark text-center py-1.5 text-sm font-bold tabular-nums">
        {value.toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
      </span>
      <span className="text-[10px] text-white/70 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2" dir="ltr">
      {cell(time.hours, "ساعت")}
      <span className="text-white/70 font-bold">:</span>
      {cell(time.minutes, "دقیقه")}
      <span className="text-white/70 font-bold">:</span>
      {cell(time.seconds, "ثانیه")}
    </div>
  );
}
