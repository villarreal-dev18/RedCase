import { useEffect, useState } from 'react';

const getRemaining = (target) => Math.max(0, target - Date.now());

export default function useCountdown(endsAt) {
  const target = new Date(endsAt).getTime();
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    if (getRemaining(target) === 0) return undefined;

    const id = setInterval(() => {
      const next = getRemaining(target);
      setRemaining(next);
      if (next === 0) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    finished: remaining === 0,
  };
}