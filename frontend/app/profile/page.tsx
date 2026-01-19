"use client";

import { createThirdwebClient } from "thirdweb";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation"; // Buat lempar user kalo belum login

const client = createThirdwebClient({ clientId: "d17d0b2cc4f3f5690026476c819e02e9" });

export default function ProfilePage() {
  const account = useActiveAccount();
  const { data: balance } = useWalletBalance({ client, chain: sepolia, address: account?.address });

  // Proteksi sederhana: Kalau gak ada akun, lempar ke dashboard suruh login
  if (!account) {
     // Kita return null dulu karena hooks jalan di client, redirect sebaiknya di useEffect 
     // atau biarkan user melihat pesan "Please login"
     return (
        <main className="min-h-screen bg-[#050505]">
            <Navbar client={client} />
            <div className="text-center py-20 text-white">Silakan Login Wallet Dulu.</div>
        </main>
     );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200">
      <Navbar client={client} />
      
      <div className="max-w-2xl mx-auto py-10 animate-in zoom-in-95 duration-300 px-6">
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
    </main>
  );
}