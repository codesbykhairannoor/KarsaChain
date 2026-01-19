"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract, MediaRenderer } from "thirdweb/react";
import { useParams } from "next/navigation";

const client = createThirdwebClient({
  clientId: "d17d0b2cc4f3f5690026476c819e02e9",
});

const contract = getContract({
  client,
  chain: sepolia,
  address: "0x801F15748D3a6dFc5A8D3a7Bc36821Cdb51d59bC",
});

export default function PublicGallery() {
  const params = useParams();
  const walletAddress = params.walletAddress as string;

  const { data: assets, isPending } = useReadContract({
    contract,
    method: "function getUserAssets(address _user) view returns ((string cid, string title, string assetType, uint256 timestamp)[])",
    params: [walletAddress],
  });

  return (
    <main className="min-h-screen bg-[#020617] text-white p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Vault Explorer</h1>
        <p className="text-slate-400 mb-10 text-sm font-mono truncate">Wallet: {walletAddress}</p>

        {isPending ? (
          <div className="text-center py-20 animate-pulse text-slate-500">Membuka Brankas...</div>
        ) : !assets || assets.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
            <p className="text-slate-500">Brankas ini kosong atau alamat salah.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.map((asset, index) => (
              <div key={index} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                <div className="aspect-square">
                  <MediaRenderer 
                    client={client} 
                    src={asset.cid} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold truncate">{asset.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}