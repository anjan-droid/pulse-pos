import React from 'react';

export const useElapsed = (createdAt) => {
  const [elapsed, setElapsed] = React.useState('0 sec ago');

  React.useEffect(() => {
    if (!createdAt) {
      return undefined;
    }

    const parseDate = new Date(createdAt);

    const updateElapsed = () => {
      const diffSeconds = Math.max(0, Math.floor((Date.now() - parseDate.getTime()) / 1000));
      if (diffSeconds < 60) {
        setElapsed(`${diffSeconds} sec ago`);
        return;
      }

      const diffMinutes = Math.floor(diffSeconds / 60);
      if (diffMinutes < 60) {
        setElapsed(`${diffMinutes} min ago`);
        return;
      }

      const diffHours = Math.floor(diffMinutes / 60);
      setElapsed(`${diffHours} hr ago`);
    };

    updateElapsed();
    const interval = window.setInterval(updateElapsed, 1000);
    return () => window.clearInterval(interval);
  }, [createdAt]);

  return elapsed;
};