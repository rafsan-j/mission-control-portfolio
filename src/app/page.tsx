'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import BootSequence from '@/components/BootSequence';
import Timeline from '@/components/Timeline';
import DensityGraph from '@/components/DensityGraph';

export default function MissionControl() {
  const [booted, setBooted] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const supabase = createClientComponentClient();

  // Thinking Signature: 
  // We fetch Client-side here to allow the Boot Sequence to mask the latency.
  // In a pure SEO build, we would fetch in a Server Component and stream it.
  useEffect(() => {
    async function init() {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .order('year', { ascending: false });
      
      if (data) setAchievements(data);
      
      // Shadow Analytics: Log anonymous visit
      await supabase.from('analytics_events').insert({
        event_type: 'visit',
        meta: { referrer: document.referrer, screen: window.innerWidth }
      });
    }
    init();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        {!booted && <BootSequence key="boot" onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto px-6 py-12"
        >
          {/* Header Section */}
          <header className="mb-16 border-b border-neutral-800 pb-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Engineering Log</h1>
                <p className="text-neutral-500 text-sm font-mono mt-2">ID: ACADEMIC_ARCHITECT_01</p>
              </div>
              <div className="text-xs font-mono text-green-500 border border-green-500/20 px-2 py-1 rounded bg-green-500/5">
                ● SYSTEM_ONLINE
              </div>
            </div>
            
            {/* Data Viz Layer */}
            <DensityGraph data={achievements} />
          </header>

          {/* Core Timeline */}
          <Timeline data={achievements} />
          
        </motion.main>
      )}
    </div>
  );
}