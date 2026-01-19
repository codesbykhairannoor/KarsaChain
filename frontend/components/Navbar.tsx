"use client";
import { useLanguageStore } from "../lib/store";

export default function Navbar({ client }: any) {
  const { lang, setLang } = useLanguageStore(); // Panggil state bahasa

  return (
    <nav className="flex justify-between items-center p-6 border-b border-slate-800">
      <h1 className="text-xl font-bold italic tracking-tighter">VAULT.eth</h1>
      
      <div className="flex items-center gap-6">
        {/* Tombol Ganti Bahasa */}
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800 text-xs">
          <button 
            onClick={() => setLang('id')}
            className={`px-3 py-1 rounded-md transition-all ${lang === 'id' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
          >ID</button>
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-md transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
          >EN</button>
        </div>
        
        {/* Connect Button lo tetap di sini */}
      </div>
    </nav>
  );
}