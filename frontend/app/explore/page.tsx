"use client";

import { createThirdwebClient } from "thirdweb";
import Navbar from "@/components/Navbar";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { Globe, Search, Database, Cpu, FileDigit, ScanLine, Box } from "lucide-react";

const client = createThirdwebClient({ clientId: "d17d0b2cc4f3f5690026476c819e02e9" });

export default function ExplorePage() {
  const { lang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 selection:bg-vault-amber selection:text-black font-sans">
      <Navbar client={client} />
      
      {/* =========================================
          SECTION 1: HERO & GLOBAL SEARCH
      ========================================= */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Grid Animation */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
           <div className="w-20 h-20 bg-vault-amber/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-vault-amber/30 shadow-[0_0_40px_rgba(245,158,11,0.2)] animate-pulse">
              <Globe size={40} className="text-vault-amber" />
           </div>

           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
             {t.exploreHero}
           </h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
             {t.exploreSub}
           </p>

           {/* Dummy Search Bar (Visual Only) */}
           <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-0 bg-vault-amber/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-black/80 border border-white/20 rounded-full px-6 py-4 backdrop-blur-md focus-within:border-vault-amber/50 transition-colors">
                 <Search className="text-slate-500 mr-4" />
                 <input 
                   type="text" 
                   disabled
                   placeholder="0x71C... (Hash Search Coming Soon)" 
                   className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-600 cursor-not-allowed"
                 />
                 <span className="text-xs font-mono text-vault-amber bg-vault-amber/10 px-2 py-1 rounded border border-vault-amber/20">
                    BETA
                 </span>
              </div>
           </div>
        </div>
      </section>


      {/* =========================================
          SECTION 2: NETWORK STATS (MOCKUP)
      ========================================= */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Stat 1 */}
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Box size={24}/></div>
                  <div>
                     <h4 className="text-2xl font-black text-white font-mono">5,291,092</h4>
                     <p className="text-xs text-slate-500 uppercase tracking-widest">{t.stat1}</p>
                  </div>
               </div>
               {/* Stat 2 */}
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-lg text-green-500"><Cpu size={24}/></div>
                  <div>
                     <h4 className="text-2xl font-black text-white font-mono">1,024+</h4>
                     <p className="text-xs text-slate-500 uppercase tracking-widest">{t.stat2}</p>
                  </div>
               </div>
               {/* Stat 3 */}
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-vault-amber/10 rounded-lg text-vault-amber"><Database size={24}/></div>
                  <div>
                     <h4 className="text-2xl font-black text-white font-mono">UNLIMITED</h4>
                     <p className="text-xs text-slate-500 uppercase tracking-widest">{t.stat3}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>


      {/* =========================================
          SECTION 3: CATEGORIES / USE CASES
      ========================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">{t.catTitle}</h2>
            <div className="h-1 w-12 bg-vault-amber mx-auto rounded-full"></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Card 1 */}
             <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl hover:bg-white/5 transition-colors group">
                <ScanLine size={32} className="text-purple-400 mb-6 group-hover:scale-110 transition-transform"/>
                <h3 className="text-xl font-bold text-white mb-3">{t.cat1Title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.cat1Desc}</p>
             </div>
             
             {/* Card 2 */}
             <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl hover:bg-white/5 transition-colors group">
                <FileDigit size={32} className="text-blue-400 mb-6 group-hover:scale-110 transition-transform"/>
                <h3 className="text-xl font-bold text-white mb-3">{t.cat2Title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.cat2Desc}</p>
             </div>

             {/* Card 3 */}
             <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl hover:bg-white/5 transition-colors group">
                <Database size={32} className="text-vault-amber mb-6 group-hover:scale-110 transition-transform"/>
                <h3 className="text-xl font-bold text-white mb-3">{t.cat3Title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.cat3Desc}</p>
             </div>
         </div>
      </section>


      {/* =========================================
          SECTION 4: VISION / CONSTRUCTION STATUS
      ========================================= */}
      <section className="py-20 px-6">
         <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#111] to-[#050505] border border-white/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-vault-amber/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
               <h2 className="text-3xl font-bold text-white mb-6">{t.visionTitle}</h2>
               <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  {t.visionDesc}
               </p>
               
               <div className="inline-flex items-center gap-3 bg-black/50 border border-vault-amber/30 px-6 py-3 rounded-xl">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vault-amber opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-vault-amber"></span>
                  </span>
                  <span className="font-mono text-vault-amber text-sm font-bold tracking-wider">
                     {t.visionStatus}
                  </span>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}