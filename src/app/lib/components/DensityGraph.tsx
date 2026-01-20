'use client';
import { motion } from 'framer-motion';

interface Achievement {
  year: number;
  significance: number;
}

export default function DensityGraph({ data }: { data: Achievement[] }) {
  // 1. Group data by year and calculate total significance per year
  const years = Array.from(new Set(data.map((d) => d.year))).sort();
  const densityMap = years.map((year) => {
    const yearData = data.filter((d) => d.year === year);
    const totalSignificance = yearData.reduce((sum, item) => sum + item.significance, 0);
    return {
      year,
      count: yearData.length,
      intensity: totalSignificance,
    };
  });

  const maxIntensity = Math.max(...densityMap.map((d) => d.intensity), 1);

  return (
    <div className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Achievement_Density_Matrix
        </h2>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500/20" />
          <div className="w-2 h-2 rounded-full bg-blue-500/60" />
          <div className="w-2 h-2 rounded-full bg-blue-500" />
        </div>
      </div>

      <div className="flex items-end gap-2 h-24">
        {densityMap.map((d, i) => {
          // Calculate height based on significance (intensity)
          const heightPercentage = (d.intensity / maxIntensity) * 100;

          return (
            <div key={d.year} className="flex-1 flex flex-col items-center gap-2 group">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-[10px] py-1 px-2 rounded mb-1 font-mono">
                {d.count} Events
              </div>
              
              {/* Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercentage}%` }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="w-full min-w-[12px] rounded-t-sm bg-blue-600/40 border-t border-x border-blue-400/30 group-hover:bg-blue-500 transition-colors relative"
              >
                {/* Glow effect for high intensity years */}
                {heightPercentage > 70 && (
                  <div className="absolute inset-0 bg-blue-400/20 blur-sm" />
                )}
              </motion.div>

              {/* Year Label */}
              <span className="text-[10px] font-mono text-neutral-600 group-hover:text-neutral-300">
                {d.year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}