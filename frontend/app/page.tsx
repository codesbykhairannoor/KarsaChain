"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { useState } from "react"; // <--- PENTING: Import ini buat trik refresh tanpa reload

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
  
  // STATE RAHASIA: Ini buat mancing Gallery biar refresh tanpa reload halaman
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
      {/* 1. Navbar Komponen */}
      <Navbar client={client} />

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {!account ? (
          /* Tampilan Belum Login */
          <div className="text-center py-32 border border-dashed border-slate-800 rounded-3xl">
            <h2 className="text-4xl font-bold text-white mb-4">Vault Masa Depan.</h2>
            <p className="text-slate-400 mb-8">Koneksikan wallet untuk mengakses brankas digital lo.</p>
            <ConnectButton client={client} theme="dark" />
          </div>
        ) : (
          /* Tampilan Dashboard Utama */
          <div className="space-y-12">
            
            {/* 2. Upload Form */}
            <UploadForm 
              client={client} 
              contract={contract} 
              onSuccess={() => {
                // RAHASIA SUKSES: Kita cuma ubah angka kunci ini, otomatis Galeri sadar ada data baru
                console.log("Upload beres, trigger refresh galeri...");
                setRefreshKey((prev) => prev + 1);
              }} 
            />

            {/* 3. Gallery Komponen */}
            <Gallery 
              key={refreshKey} // <-- Ini saklarnya. Pas angkanya berubah, komponen ini render ulang.
              contract={contract} 
              address={account.address} 
              client={client} // <-- Passing client biar bisa render gambar cepet
            />
            
          </div>
        )}
      </div>
    </main>
  );
}