"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  children: React.ReactNode;
  startDate: string;
}

export const CountdownTimer = ({
  children,
  startDate,
}: CountdownTimerProps) => {
  const targetDate = new Date(startDate);
  targetDate.setDate(targetDate.getDate() + 15);

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col text-center">
      {children}
      <div className="text-white/60">
        <p className="text-2xl">
          {remainingTime.days}d {remainingTime.hours}h {remainingTime.minutes}m{" "}
          {remainingTime.seconds}s
        </p>
      </div>
    </div>
  );
};
