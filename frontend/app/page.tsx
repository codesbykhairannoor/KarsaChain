"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";

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
          <div>
            {/* 2. Upload Form Komponen (Passing function reload biar otomatis refresh gallery) */}
            <UploadForm 
              client={client} 
              contract={contract} 
              onSuccess={() => window.location.reload()} 
            />

            {/* 3. Gallery Komponen */}
            <Gallery 
              contract={contract} 
              address={account.address} 
            />
          </div>
        )}
      </div>
    </main>
  );
}