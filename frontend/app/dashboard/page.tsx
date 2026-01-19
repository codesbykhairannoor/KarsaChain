"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { useState } from "react";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { WalletCards, ShieldCheck, Sparkles, Lock } from "lucide-react";

import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm"; 
import Gallery from "@/components/Gallery";

const client = createThirdwebClient({ clientId: "d17d0b2cc4f3f5690026476c819e02e9" });
const contract = getContract({ client, chain: sepolia, address: "0x801F15748D3a6dFc5A8D3a7Bc36821Cdb51d59bC" });

export default function DashboardPage() {
  const account = useActiveAccount();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Panggil Hook Bahasa
  const { lang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 selection:bg-vault-amber selection:text-black font-sans relative overflow-hidden">
      
      {/* --- BACKGROUND DECORATIONS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
         <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-vault-amber/5 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar client={client} />
        
        <div className="max-w-7xl mx-auto px-6 mt-8 pb-20 animate-in slide-in-from-bottom-4 duration-500">
          
          {!account ? (
             /* --- BELUM LOGIN (TERKUNCI) --- */
             <div className="relative flex flex-col items-center justify-center py-32 text-center">
                <div className="relative mb-8 group">
                   <div className="absolute inset-0 bg-vault-amber/20 blur-2xl rounded-full group-hover:bg-vault-amber/40 transition-all duration-500"></div>
                   <div className="relative w-24 h-24 bg-[#111] border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl">
                      <Lock size={40} className="text-slate-400 group-hover:text-vault-amber transition-colors" />
                   </div>
                </div>

                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{t.dashboardTitle}</h2>
                <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
                   {t.lockedMsg} {/* <-- Translate */}
                </p>
                
                <div className="inline-block scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-xl">
                   <ConnectButton client={client} theme="dark" />
                </div>
             </div>
          ) : (
             /* --- SUDAH LOGIN (WORKSPACE) --- */
             <div>
                {/* Header Welcome */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/5 pb-6">
                   <div>
                      <div className="flex items-center gap-2 mb-2">
                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                         <span className="text-xs font-mono text-green-500 uppercase tracking-widest">{t.sysOnline}</span> {/* <-- Translate */}
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                         {t.hello} <Sparkles size={24} className="text-vault-amber" /> {/* <-- Translate */}
                      </h1>
                      <p className="text-slate-500 font-mono mt-1 text-sm bg-white/5 inline-block px-2 py-1 rounded">
                         {account.address}
                      </p>
                   </div>
                   
                   <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                      <ShieldCheck size={18} className="text-vault-amber" />
                      <span className="text-sm font-bold text-slate-300">{t.netActive}</span> {/* <-- Translate */}
                   </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   
                   {/* Left: Upload Form */}
                   <div className="lg:col-span-4 sticky top-28 h-fit">
                      <div className="relative">
                         <div className="absolute -inset-1 bg-gradient-to-b from-vault-amber/20 to-transparent rounded-[2rem] blur-md opacity-50"></div>
                         <div className="relative">
                            <UploadForm client={client} contract={contract} onSuccess={() => setRefreshTrigger(p => p + 1)} />
                         </div>
                      </div>
                      
                      {/* Tips Gas Fee */}
                      <div className="mt-6 bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 items-start">
                         <WalletCards size={20} className="text-blue-400 mt-1 shrink-0" />
                         <p className="text-xs text-blue-200 leading-relaxed">
                            {t.gasTip} {/* <-- Translate */}
                         </p>
                      </div>
                   </div>

                   {/* Right: Gallery */}
                   <div className="lg:col-span-8">
                      <Gallery key={refreshTrigger} contract={contract} address={account.address} client={client} />
                   </div>
                </div>
             </div>
          )}
          
        </div>
      </div>
    </main>
  );
}