"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/translations";
import { useParams } from "next/navigation"; 
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import { ShieldCheck, Share2, Copy } from "lucide-react"; // Nambah icon Copy biar keren
import Link from "next/link";
import { useState } from "react";

const client = createThirdwebClient({ clientId: "d17d0b2cc4f3f5690026476c819e02e9" });
const contract = getContract({ client, chain: sepolia, address: "0x801F15748D3a6dFc5A8D3a7Bc36821Cdb51d59bC" });

export default function PublicProfilePage() {
  const params = useParams();
  // Decode biar aman kalau browser ngasih karakter aneh
  const address = decodeURIComponent(params.address as string); 
  
  const { lang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];
  
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Balikin status setelah 2 detik
  };

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 selection:bg-vault-amber selection:text-black font-sans">
      <Navbar client={client} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* --- HEADER PROFIL PUBLIK --- */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 mb-12 relative overflow-hidden group">
          {/* Background Glow Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-vault-amber/5 rounded-full blur-[100px] group-hover:bg-vault-amber/10 transition-all duration-700"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Kiri: Info Address */}
            <div className="text-left w-full lg:w-auto">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-vault-amber" size={20} />
                <span className="text-xs font-black text-vault-amber uppercase tracking-[0.2em]">
                  {t.publicTitle || "PUBLIC VAULT"}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-mono font-bold text-white break-all tracking-tight">
                {address}
              </h1>
              
              <p className="text-slate-400 mt-3 text-sm max-w-xl leading-relaxed">
                {t.publicDesc || "Arsip abadi yang tersimpan di jaringan terdesentralisasi KarsaChain."}
              </p>
            </div>

            {/* Kanan: Tombol Aksi */}
            <div className="flex flex-row gap-3 w-full lg:w-auto mt-4 lg:mt-0">
               <button 
                onClick={handleCopy}
                className="flex-1 lg:flex-none bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 text-slate-300 hover:text-white px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-bold group/btn"
               >
                 {copied ? <ShieldCheck size={18} className="text-green-500"/> : <Share2 size={18} className="group-hover/btn:text-vault-amber transition-colors"/>}
                 <span>{copied ? "Tersalin!" : "Share Link"}</span>
               </button>
               
               <Link href="/" className="flex-1 lg:flex-none bg-vault-amber text-black hover:bg-white px-8 py-4 rounded-2xl font-black text-center transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                 {t.backHome || "Back Home"}
               </Link>
            </div>
          </div>
        </div>

        {/* --- LIST FILE (GALLERY) --- */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Kita lempar variable 'address' ke component Gallery */}
            <Gallery 
                contract={contract} 
                address={address} 
                client={client} 
            />
        </div>
        
      </div>
    </main>
  );
}