"use client";
export default function DensityGraph({ data }: { data: any[] }) {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const getIntensity = (year: number) => data.filter(d => d.year === year).length;

  return (
    <div className="bg-zinc-900/50 p-6 border border-zinc-800 rounded-lg">
      <h3 className="text-zinc-500 text-xs uppercase mb-4 tracking-widest">Achievement Density</h3>
      <div className="flex items-end gap-2 h-32">
        {years.map(year => (
          <div key={year} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-blue-500/40 border-t-2 border-blue-400" 
              style={{ height: `${getIntensity(year) * 20}%` }}
            />
            <span className="text-[10px] text-zinc-600">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}