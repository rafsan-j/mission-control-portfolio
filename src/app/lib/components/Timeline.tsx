import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Trophy, Book, Shield, Zap, ChevronRight } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const icons = {
  Academics: Book,
  Olympiads: Trophy,
  Leadership: Shield,
  Creativity: Zap,
  Sports: Zap 
};

export default function Timeline({ data }: { data: any[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const handleExpand = async (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
      // Shadow Analytics: Track engagement
      await supabase.from('analytics_events').insert({
        event_type: 'expand_card',
        meta: { achievement_id: id }
      });
    }
  };

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const Icon = icons[item.category as keyof typeof icons] || Book;
        const isExpanded = selectedId === item.id;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            layout
            onClick={() => handleExpand(item.id)}
            className={`group relative border rounded-lg p-6 cursor-pointer overflow-hidden transition-colors duration-300
              ${isExpanded 
                ? 'bg-neutral-900 border-neutral-700 ring-1 ring-blue-500/50' 
                : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-600'
              }`}
          >
            {/* Active Glow Effect */}
            {isExpanded && (
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            )}

            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-md ${isExpanded ? 'bg-blue-500/10 text-blue-400' : 'bg-neutral-800 text-neutral-400'}`}>
                <Icon size={20} strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    {item.year} • {item.category}
                  </span>
                  {/* Significance Sparkline (Mini) */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 h-1 rounded-full ${i < item.significance ? 'bg-neutral-400' : 'bg-neutral-800'}`} 
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-neutral-200 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-neutral-400 text-sm leading-relaxed"
                    >
                      <p>{item.description}</p>
                      
                      {item.proof_url && (
                        <div className="mt-4 p-3 bg-neutral-950 border border-neutral-800 rounded flex items-center gap-3 hover:border-blue-500/50 transition-colors"
                             onClick={(e) => {
                               e.stopPropagation();
                               window.open(item.proof_url, '_blank');
                             }}>
                          <FileText size={16} className="text-blue-400" />
                          <span className="text-xs font-mono">VERIFIED_PROOF_ASSET.PDF</span>
                          <div className="ml-auto text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
                            AUTHENTICATED
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}