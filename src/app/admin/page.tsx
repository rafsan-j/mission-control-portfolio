"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Admin() {
  const [form, setForm] = useState({ title: '', year: 2025, significance: 3, description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('achievements').insert([form]);
    if (!error) alert("Mission Update Successful");
  };

  return (
    <div className="p-10 max-w-xl mx-auto bg-zinc-950 min-h-screen text-white">
      <h2 className="text-2xl mb-6 font-mono">APPEND_NEW_DATA</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full bg-zinc-900 p-2 border border-zinc-800" placeholder="Title" 
          onChange={e => setForm({...form, title: e.target.value})} />
        <input type="number" className="w-full bg-zinc-900 p-2 border border-zinc-800" placeholder="Year"
          onChange={e => setForm({...form, year: parseInt(e.target.value)})} />
        <textarea className="w-full bg-zinc-900 p-2 border border-zinc-800" placeholder="Description"
          onChange={e => setForm({...form, description: e.target.value})} />
        <button className="bg-blue-600 px-6 py-2 uppercase text-xs font-bold">Transmit</button>
      </form>
    </div>
  );
}