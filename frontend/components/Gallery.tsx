"use client";

import { useReadContract, MediaRenderer } from "thirdweb/react";
import { ThirdwebContract, ThirdwebClient } from "thirdweb";
import { Clock, ExternalLink, Image as ImageIcon, Music, FileText } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/translations";

interface GalleryProps {
  contract: ThirdwebContract;
  address: string;
  client: ThirdwebClient;
}

export default function Gallery({ contract, address, client }: GalleryProps) {
  const { lang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];

  const { data: assets, isPending, refetch } = useReadContract({
    contract,
    method: "function getUserAssets(address _user) view returns ((string cid, string title, string assetType, uint256 timestamp)[])",
    params: [address],
  });

  // --- INI DIA KUNCINYA (Gue balikin!) ---
  // Fungsi ini bikin URL: https://{clientId}.ipfscdn.io/ipfs/{hash}
  const getSafeUrl = (ipfsUri: string) => {
    if (!ipfsUri) return "#";
    // Hapus "ipfs://" di depan
    const hash = ipfsUri.replace("ipfs://", "");
    // Gabungin jadi link HTTP yang aman dan bisa dibuka dimana aja
    return `https://${client.clientId}.ipfscdn.io/ipfs/${hash}`;
  };

  if (isPending) return (
    <div className="text-center py-20 text-vault-amber animate-pulse font-medium">
       Memanggil data dari Blockchain...
    </div>
  );

  return (
    <div className="bg-vault-card/50 border border-white/5 p-6 rounded-3xl min-h-[500px]">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
           🗃️ {t.galleryTitle} <span className="text-sm font-normal text-slate-500">({assets?.length || 0})</span>
        </h2>
        <button 
          onClick={() => refetch()} 
          className="text-xs bg-black border border-white/10 hover:border-vault-amber text-slate-400 hover:text-white px-3 py-2 rounded-lg transition-all"
        >
          🔄 Refresh
        </button>
      </div>

      {!assets || assets.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-500">Belum ada aset. Upload dulu di sebelah kiri, Bos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...assets].reverse().map((asset, i) => {
            // Kita generate URL-nya sekali di sini biar dipake bareng-bareng
            const publicUrl = getSafeUrl(asset.cid);

            return (
              <div key={i} className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden group hover:border-vault-amber/50 transition-all shadow-lg">
                
                {/* --- AREA VISUAL --- */}
                <div className="aspect-square w-full bg-black relative flex items-center justify-center overflow-hidden">
                  
                  {asset.assetType === "image" ? (
                     /* Gambar tetep pake MediaRenderer buat preview, tapi link luarnya pake publicUrl */
                     <MediaRenderer 
                       client={client} 
                       src={asset.cid} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                     />
                  ) : asset.assetType === "music" ? (
                     /* Musik pake URL yang udah digenerate (publicUrl) */
                     <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-black flex flex-col items-center justify-center p-4">
                        <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-vault-amber flex items-center justify-center mb-4 animate-[spin_10s_linear_infinite]">
                           <Music size={32} className="text-vault-amber" />
                        </div>
                        <audio controls className="w-full h-8 mt-2 opacity-90 hover:opacity-100">
                           <source src={publicUrl} type="audio/mpeg" />
                        </audio>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center text-slate-500">
                        <FileText size={64} className="mb-2 opacity-50" />
                        <span className="text-xs uppercase">Document</span>
                     </div>
                  )}

                  {/* Badge Tipe */}
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase border border-white/10">
                      {asset.assetType}
                  </div>
                </div>

                {/* --- TOMBOL AKSI (INI YANG PENTING) --- */}
                <div className="p-5">
                  <h4 className="font-bold text-white truncate text-lg mb-2">{asset.title}</h4>
                  
                  {/* Tombol ini akan ngebuka link HTTPS yang lo mau */}
                  <a 
                    href={publicUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-white/5 hover:bg-vault-amber hover:text-black text-slate-300 text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/5"
                  >
                    <ExternalLink size={16} /> Lihat File Asli
                  </a>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[10px] text-slate-600 font-mono">
                      CID: {asset.cid.replace("ipfs://", "").substring(0, 8)}...
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}