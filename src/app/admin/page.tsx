'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Thinking Signature:
// Uses native HTML forms for simplicity and speed. 
// In a larger team setting, I would use React Hook Form + Zod for validation.
export default function AdminConsole() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // File Upload Logic
    const file = formData.get('proof') as File;
    let proof_url = null;
    
    if (file.size > 0) {
      const filename = `${Date.now()}-${file.name}`;
      const { data } = await supabase.storage.from('certificates').upload(filename, file);
      if (data) {
        const { data: { publicUrl } } = supabase.storage.from('certificates').getPublicUrl(filename);
        proof_url = publicUrl;
      }
    }

    await supabase.from('achievements').insert({
      title: formData.get('title'),
      year: Number(formData.get('year')),
      category: formData.get('category'),
      significance: Number(formData.get('significance')),
      description: formData.get('description'),
      proof_url: proof_url
    });

    setLoading(false);
    alert('Entry added to database.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-8 font-mono text-sm">
      <h1 className="text-xl mb-6 text-red-500 border-b border-red-900/30 pb-2">
        ⚠ RESTRICTED_ACCESS // ADMIN_CONSOLE
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label>Year</label>
            <input name="year" type="number" defaultValue={2026} className="bg-neutral-900 border border-neutral-700 p-2 rounded text-white focus:border-red-500 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label>Significance (1-5)</label>
            <input name="significance" type="number" min="1" max="5" className="bg-neutral-900 border border-neutral-700 p-2 rounded text-white focus:border-red-500 outline-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input name="title" type="text" className="bg-neutral-900 border border-neutral-700 p-2 rounded text-white focus:border-red-500 outline-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label>Category</label>
          <select name="category" className="bg-neutral-900 border border-neutral-700 p-2 rounded text-white">
            <option>Academics</option>
            <option>Olympiads</option>
            <option>Leadership</option>
            <option>Creativity</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea name="description" rows={3} className="bg-neutral-900 border border-neutral-700 p-2 rounded text-white focus:border-red-500 outline-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label>Certificate Upload (PDF/IMG)</label>
          <input name="proof" type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"/>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded font-bold transition-all"
        >
          {loading ? 'UPLOADING_ASSET...' : 'COMMIT_TO_DATABASE'}
        </button>
      </form>
    </div>
  );
}