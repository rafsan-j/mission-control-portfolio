'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
  "INITIALIZING_KERNEL...",
  "LOADING_V8_ENGINE...",
  "FETCHING_ACHIEVEMENT_MATRIX...",
  "DECRYPTING_SECURE_VAULT...",
  "SYSTEM_READY."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let delay = 0;
    bootLogs.forEach((log, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === bootLogs.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono text-green-500 text-xs md:text-sm p-8"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" }}}
    >
      <div className="w-full max-w-md">
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-1"
          >
            <span className="opacity-50">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span> {log}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="h-4 w-2 bg-green-500 mt-2"
        />
      </div>
    </motion.div>
  );
}