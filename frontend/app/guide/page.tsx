"use client";

import Navbar from "@/components/Navbar";
import { createThirdwebClient } from "thirdweb";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import Link from "next/link";
import { 
  UserCircle, 
  Copy, 
  ExternalLink, 
  DownloadCloud, 
  FileCheck, 
  Eye,
  ArrowRight,
  FolderOpen
} from "lucide-react";

const client = createThirdwebClient({ 
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || "d17d0b2cc4f3f5690026476c819e02e9" 
});

export default function GuidePage() {
  const { lang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans pb-20">
      <Navbar client={client} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            {t.guideTitle}
          </h1>
          <p className="text-slate-400">
            {t.guideSub}
          </p>
        </div>

        {/* CONTAINER LANGKAH-LANGKAH */}
        <div className="space-y-12 relative border-l-2 border-slate-800 ml-4 md:ml-0 pl-8 md:pl-0">

          {/* STEP 1: AMBIL ALAMAT */}
          <div className="md:flex gap-8 group">
             <div className="hidden md:flex flex-col items-end w-1/3 pt-2 pr-8 border-r-2 border-slate-800 relative">
                <div className="absolute -right-[9px] top-2 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-[#050505]" />
                <h3 className="text-xl font-bold text-blue-400">{t.step111Title}</h3>
             </div>
             <div className="w-full md:w-2/3">
                <div className="flex items-center gap-3 mb-3 md:hidden">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-black">1</div>
                    <h3 className="text-xl font-bold text-white">{t.step11Title}</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-bold text-white mb-3">{t.step11Title}</h3>
                <p className="text-slate-400 mb-4">{t.step11Desc}</p>
                
                {/* Visual Aid: Simulasi Tombol Copy */}
                <div className="bg-[#111] p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-500 mb-1">Simulasi Tampilan Profil:</div>
                    <div className="flex items-center justify-between bg-black p-3 rounded border border-slate-700">
                        <span className="font-mono text-sm text-slate-300">0x71C...9A2</span>
                        <Copy size={16} className="text-blue-500 animate-pulse" />
                    </div>
                </div>
             </div>
          </div>

          {/* STEP 2 & 3: FAUCET */}
          <div className="md:flex gap-8 group">
             <div className="hidden md:flex flex-col items-end w-1/3 pt-2 pr-8 border-r-2 border-slate-800 relative">
                <div className="absolute -right-[9px] top-2 w-4 h-4 bg-green-500 rounded-full ring-4 ring-[#050505]" />
                <h3 className="text-xl font-bold text-green-400">Langkah 02 & 03</h3>
             </div>
             <div className="w-full md:w-2/3">
                <div className="flex items-center gap-3 mb-3 md:hidden">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-black">2</div>
                    <h3 className="text-xl font-bold text-white">Isi Saldo (Faucet)</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-bold text-white mb-3">{t.step22Title}</h3>
                <p className="text-slate-400 mb-4">{t.step22Desc}</p>
                <p className="text-slate-400 mb-4">{t.step33Desc}</p>

                <a 
                  href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia" 
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  {t.step22Btn} <ExternalLink size={18} />
                </a>
             </div>
          </div>

          {/* STEP 4: UPLOAD */}
          <div className="md:flex gap-8 group">
             <div className="hidden md:flex flex-col items-end w-1/3 pt-2 pr-8 border-r-2 border-slate-800 relative">
                <div className="absolute -right-[9px] top-2 w-4 h-4 bg-amber-500 rounded-full ring-4 ring-[#050505]" />
                <h3 className="text-xl font-bold text-amber-400">Langkah 04</h3>
             </div>
             <div className="w-full md:w-2/3">
                <div className="flex items-center gap-3 mb-3 md:hidden">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-black">4</div>
                    <h3 className="text-xl font-bold text-white">{t.step4Title}</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-bold text-white mb-3">{t.step4Title}</h3>
                <p className="text-slate-400 mb-4">{t.step4Desc}</p>
                <div className="flex items-center gap-2 text-amber-500 text-sm font-mono bg-amber-500/10 p-2 rounded w-fit">
                    <DownloadCloud size={16} />
                    <span>Status: Ready to Upload</span>
                </div>
             </div>
          </div>

          {/* STEP 5: VERIFIKASI (PENTING BANGET) */}
          <div className="md:flex gap-8 group">
             <div className="hidden md:flex flex-col items-end w-1/3 pt-2 pr-8 border-r-2 border-slate-800 relative">
                <div className="absolute -right-[9px] top-2 w-4 h-4 bg-purple-500 rounded-full ring-4 ring-[#050505]" />
                <h3 className="text-xl font-bold text-purple-400">Langkah 05 (Penting)</h3>
             </div>
             <div className="w-full md:w-2/3">
                <div className="flex items-center gap-3 mb-3 md:hidden">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold text-black">5</div>
                    <h3 className="text-xl font-bold text-white">{t.step5Title}</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-bold text-white mb-3">{t.step5Title}</h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                    {t.step5Desc}
                </p>

                {/* Visual Aid: Simulasi Link Transaksi */}
                <div className="bg-[#151515] p-5 rounded-xl border border-purple-500/30">
                    <div className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Contoh Tampilan Bukti:</div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                            <span className="text-slate-400">Transaction Hash:</span>
                            <span className="text-blue-400 font-mono">0x39a...8b2</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                            <span className="text-slate-400">Status:</span>
                            <span className="text-green-500 flex items-center gap-1"><FileCheck size={14}/> Success</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">View on Explorer:</span>
                            <div className="flex items-center gap-1 text-purple-400 cursor-pointer hover:text-purple-300">
                                <Eye size={14} /> <span>Etherscan</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>

        </div>
        


        

        {/* ... (Kode Langkah 5 di atas biarin aja) ... */}

          {/* STEP 6: PORTOFOLIO LINK (NEW) */}
          <div className="md:flex gap-8 group pb-8"> {/* pb-8 biar ada jarak ke tombol */}
             <div className="hidden md:flex flex-col items-end w-1/3 pt-2 pr-8 border-r-2 border-slate-800 border-dashed relative">
                {/* Warna Cyan biar beda (Kesan Link/Web) */}
                <div className="absolute -right-[9px] top-2 w-4 h-4 bg-cyan-400 rounded-full ring-4 ring-[#050505] shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <h3 className="text-xl font-bold text-cyan-400">Langkah 06 (Bonus)</h3>
             </div>
             <div className="w-full md:w-2/3">
                <div className="flex items-center gap-3 mb-3 md:hidden">
                    <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center font-bold text-black">6</div>
                    <h3 className="text-xl font-bold text-white">{t.step6Title}</h3>
                </div>
                <h3 className="hidden md:block text-2xl font-bold text-white mb-3">{t.step6Title}</h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                    {t.step6Desc}
                </p>

                {/* Visual Aid: Simulasi URL Bar */}
                <div className="bg-[#0f172a] p-4 rounded-xl border border-cyan-500/30 relative overflow-hidden group-hover:border-cyan-400/60 transition-colors">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">
                        <FolderOpen size={14} className="text-cyan-400" />
                        Rumus Link Kamu:
                    </div>
                    
                    {/* Kotak URL Simulasi */}
                    <div className="bg-black p-3 rounded-lg border border-slate-700 font-mono text-sm md:text-base break-all flex flex-wrap items-center">
                        <span className="text-slate-500 select-none">https://karsa-chain.vercel.app/</span>
                        <span className="bg-cyan-500/20 text-cyan-300 px-1 rounded border border-cyan-500/30 mx-1">
                            0x...ALAMAT_KAMU
                        </span>
                    </div>

                    {/* Contoh Hasil */}
                    <div className="mt-3 text-xs text-slate-400 italic">
                        *Contoh: karsa-chain.vercel.app/<span className="text-white">0x71C...9A2</span>
                    </div>
                </div>
             </div>
          </div>

        {/* CTA BUTTON */}
        <div className="mt-20 text-center">
            <Link href="/dashboard">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-lg rounded-full hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                    <span>{t.guideCta}</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
        </div>

      </div>
    </main>
  );
}