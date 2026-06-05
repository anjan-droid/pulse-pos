import React from 'react';
import { useElapsed } from '../hooks/useElapsed';

const ElapsedTimer = ({ createdAt }) => {
  const elapsed = useElapsed(createdAt);
  return <div className="elapsed-timer">{elapsed}</div>;
};

export default ElapsedTimer;
