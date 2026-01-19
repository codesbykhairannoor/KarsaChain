"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { useState } from "react";

// Import State Management & Kamus
import { useLanguageStore } from "../lib/store";
import { translations } from "../lib/translations";

// Import Komponen Kita
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";
import Gallery from "@/components/Gallery";

// Setup Client & Contract
const client = createThirdwebClient({
  clientId: "d17d0b2cc4f3f5690026476c819e02e9",
});

const contract = getContract({
  client,
  chain: sepolia,
  address: "0x801F15748D3a6dFc5A8D3a7Bc36821Cdb51d59bC",
});

export default function Home() {
  const account = useActiveAccount();
  const [refreshKey, setRefreshKey] = useState(0);

  // Ambil bahasa yang aktif dari Zustand
  const { lang } = useLanguageStore();
  const t = translations[lang]; // Ambil kamus sesuai bahasa (ID/EN)

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
      {/* 1. Navbar Komponen */}
      <Navbar client={client} />

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {!account ? (
          /* Tampilan Belum Login - Menggunakan Teks dari Kamus */
          <div className="text-center py-32 border border-dashed border-slate-800 rounded-3xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.welcome}
            </h2>
            <p className="text-slate-400 mb-8">
              {t.subtitle}
            </p>
            {/* Supaya tidak error hydration, ConnectButton dibungkus div biasa */}
            <div className="inline-block">
              <ConnectButton client={client} theme="dark" />
            </div>
          </div>
        ) : (
          /* Tampilan Dashboard Utama */
          <div className="space-y-12">
            
            {/* 2. Upload Form */}
            <UploadForm 
              client={client} 
              contract={contract} 
              onSuccess={() => {
                console.log("Upload beres, trigger refresh galeri...");
                setRefreshKey((prev) => prev + 1);
              }} 
            />

            {/* 3. Gallery Komponen */}
            <Gallery 
              key={refreshKey} 
              contract={contract} 
              address={account.address} 
              client={client}
            />
            
          </div>
        )}
      </div>
    </main>
  );
}