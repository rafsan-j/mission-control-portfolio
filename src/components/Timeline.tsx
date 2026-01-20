"use client";
import { Star } from 'lucide-react';

export default function Timeline({ achievements }: { achievements: any[] }) {
  return (
    <div className="space-y-6">
      {achievements.sort((a, b) => b.year - a.year).map((item, i) => (
        <div key={i} className="relative pl-8 border-l border-zinc-800 group">
          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-1">
            <span>{item.year}</span>
            <div className="flex">
              {[...Array(item.significance)].map((_, s) => (
                <Star key={s} size={10} className="fill-yellow-500 text-yellow-500" />
              ))}
            </div>
          </div>
          <h4 className="text-zinc-100 font-medium">{item.title}</h4>
          <p className="text-sm text-zinc-400 mt-1">{item.description}</p>
        </div>
      ))}
    </div>
  );
}