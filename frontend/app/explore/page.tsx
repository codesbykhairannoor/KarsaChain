"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/translations";

// Setup Client (Sama kayak page utama)
const client = createThirdwebClient({
  clientId: "d17d0b2cc4f3f5690026476c819e02e9",
});

const contract = getContract({
  client,
  chain: sepolia,
  address: "0x801F15748D3a6dFc5A8D3a7Bc36821Cdb51d59bC",
});

export default function ExplorePage() {
  const { lang } = useLanguageStore();
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-vault-black text-slate-200 font-sans pb-20">
      <Navbar client={client} />

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Header Explore */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-black text-white tracking-tighter">
            EXPLORE <span className="text-vault-amber">VAULT</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.exploreSubtitle}
          </p>
        </div>

        {/* Galeri Publik */}
        {/* Catatan: Di sini kita tidak kirim prop 'address' agar Gallery tahu ini mode Public/Explore */}
        {/* Pastikan komponen Gallery lo bisa handle kalau address-nya kosong/undefined ya! */}
        <div className="bg-vault-card/50 border border-white/5 rounded-3xl p-8 min-h-[400px]">
          <Gallery 
            contract={contract} 
            client={client} 
            // address={undefined} -> Sengaja dikosongkan untuk mode "All Assets"
          />
        </div>
      </div>
    </main>
  );
}