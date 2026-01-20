"use client";
import { useState } from 'react';
import BootSequence from '../components/BootSequence';
import DensityGraph from '../components/DensityGraph';
import Timeline from '../components/Timeline';

export default function Dashboard() {
  const [booting, setBooting] = useState(true);
  const mockData = [
    { year: 2025, title: "National Merit Scholar (HSC)", significance: 5, description: "17th Nationally, GPA 5.00" },
    { year: 2024, title: "IYMC Silver Honour", significance: 4, description: "International Youth Math Challenge" },
    // Add other records here...
  ];

  if (booting) return <BootSequence onComplete={() => setBooting(false)} />;

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12 border-b border-zinc-800 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase italic">Mission Control</h1>
          <p className="text-zinc-500 text-sm">USER: 56TH_BATCH_PREFECT // STATUS: ACTIVE</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1"><DensityGraph data={mockData} /></div>
        <div className="lg:col-span-2"><Timeline achievements={mockData} /></div>
      </div>
    </main>
  );
}