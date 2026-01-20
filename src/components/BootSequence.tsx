"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const sequence = [
    "INITIALIZING MISSION_CONTROL_V1.0...",
    "ESTABLISHING SECURE LINK TO RAJSHAHI_CADET_COLLEGE...",
    "LOADING ACADEMIC_RECORDS... [SUCCESS]",
    "DECRYPTING LEADERSHIP_PROTOCOLS... [OK]",
    "SYSTEM READY. WELCOME, PREFECT."
  ];

  useEffect(() => {
    sequence.forEach((text, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text]);
        if (i === sequence.length - 1) setTimeout(onComplete, 1000);
      }, i * 600);
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono p-10 flex flex-col gap-2 z-50">
      {logs.map((log, i) => (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={i}>
          {`> ${log}`}
        </motion.p>
      ))}
    </div>
  );
}