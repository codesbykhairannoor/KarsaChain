"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { useActiveAccount, ConnectButton, useWalletBalance } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { useState } from "react";
import { useLanguageStore } from "../lib/store";
import { translations } from "../lib/translations";
import { ArrowRight, ShieldCheck, Database, Zap } from "lucide-react";

// Components
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm"; 
import Gallery from "@/components/Gallery";

// Setup
const client = createThirdwebClient({
  clientId: "d17d0b2cc4f3f5690026476c819e02e9",
});

const contract = getContract({
  client,
  chain: sepolia,
  address: "0x801F15748D3a6dFc5A8D3a7Bc36821Cdb51d59bC",
});

export default function Page() {
  const account = useActiveAccount();
  const [currentView, setCurrentView] = useState("home"); // DEFAULT: SELALU HOME
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { data: balance } = useWalletBalance({
     client, chain: sepolia, address: account?.address,
  });

  const { lang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans pb-20 selection:bg-vault-amber selection:text-black">
      
      <Navbar client={client} currentView={currentView} setView={setCurrentView} />

      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* =========================================
            VIEW 1: HOME (LANDING PAGE) 
            Bisa dilihat siapa saja (Login/Belum)
           ========================================= */}
        {currentView === 'home' && (
          <div className="py-20 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
            {/* Hiasan Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vault-amber/5 rounded-full blur-[120px] -z-10"></div>
            
            <span className="bg-vault-amber/10 text-vault-amber border border-vault-amber/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              KarsaChain V.1.0
            </span>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
              {t.heroTitle}
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-vault-amber hover:bg-white hover:text-black text-black px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2"
              >
                {t.btnGoDashboard} <ArrowRight size={20} />
              </button>
            </div>

            {/* Fitur Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
               {[
                 {icon: ShieldCheck, title: "Immutable", desc: "Aset tidak bisa dihapus atau diubah."},
                 {icon: Database, title: "Decentralized", desc: "Disimpan di IPFS & Blockchain Sepolia."},
                 {icon: Zap, title: "Instant", desc: "Upload dan verifikasi dalam hitungan detik."}
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-vault-amber/30 transition-colors">
                    <item.icon size={32} className="text-vault-amber mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        )}


        {/* =========================================
            VIEW 2: DASHBOARD (UPLOAD & GALLERY)
            Wajib Login. Kalau belum, suruh connect.
           ========================================= */}
        {currentView === 'dashboard' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            {!account ? (
              // Tampilan jika buka Dashboard tapi belum Login
              <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/5">
                 <h2 className="text-3xl font-bold text-white mb-4">{t.dashboardTitle}</h2>
                 <p className="text-slate-400 mb-8">{t.connectMsg}</p>
                 <div className="inline-block scale-125">
                    <ConnectButton client={client} theme="dark" />
                 </div>
              </div>
            ) : (
              // Tampilan Dashboard Sebenarnya
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 sticky top-28 h-fit">
                  <UploadForm 
                    client={client} 
                    contract={contract} 
                    onSuccess={() => setRefreshTrigger(prev => prev + 1)} 
                  />
                </div>
                <div className="lg:col-span-8">
                  <Gallery 
                    key={refreshTrigger} 
                    contract={contract} 
                    address={account.address} 
                    client={client}
                  />
                </div>
              </div>
            )}
          </div>
        )}


        {/* =========================================
            VIEW 3: GLOBAL (EXPLORE)
           ========================================= */}
        {currentView === 'global' && (
           <div className="py-20 text-center border border-white/10 rounded-3xl bg-white/5">
              <h2 className="text-4xl font-bold text-white mb-4">Global Karsa</h2>
              <p className="text-slate-400">Jelajahi aset publik di KarsaChain (Segera Hadir).</p>
           </div>
        )}


        {/* =========================================
            VIEW 4: PROFILE
           ========================================= */}
        {currentView === 'profile' && account && (
           <div className="max-w-2xl mx-auto py-10 animate-in zoom-in-95 duration-300">
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 bg-vault-amber/20 w-32 h-32 rounded-full blur-[60px]"></div>
                 
                 <div className="flex items-center gap-6 mb-8 border-b border-white/5 pb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-vault-amber to-yellow-800 rounded-full flex items-center justify-center text-3xl font-bold text-black border-4 border-[#050505]">
                       {account.address.substring(0,2)}
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold text-white">Karsa Keeper</h3>
                       <p className="font-mono text-slate-500 text-sm mt-1">{account.address}</p>
                    </div>
                 </div>
                 
                 <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex justify-between">
                    <span className="text-slate-400">Saldo Sepolia</span>
                    <span className="text-vault-amber font-bold font-mono">
                      {balance?.displayValue.slice(0,6)} ETH
                    </span>
                 </div>
              </div>
           </div>
        )}

      </div>
    </main>
  );
}