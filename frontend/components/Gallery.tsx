"use client";

import { useReadContract, MediaRenderer } from "thirdweb/react";
import { ThirdwebContract, ThirdwebClient } from "thirdweb";
import { ExternalLink, Music, FileText, RefreshCw, FolderOpen } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/translations";

interface GalleryProps {
  contract: ThirdwebContract;
  address: string; // Alamat ini dinamis (bisa dari login atau dari URL)
  client: ThirdwebClient;
}

export default function Gallery({ contract, address, client }: GalleryProps) {
  const { lang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];

  // Ambil data dari Smart Contract
  const { data: assets, isPending, refetch } = useReadContract({
    contract,
    // Pastikan nama method sesuai dengan yang ada di Smart Contract lo (getUserAssets)
    method: "function getUserAssets(address _user) view returns ((string cid, string title, string assetType, uint256 timestamp)[])",
    params: [address],
  });

  // Helper untuk generate URL IPFS yang bisa dibuka di browser biasa
  const getSafeUrl = (ipfsUri: string) => {
    if (!ipfsUri) return "#";
    const hash = ipfsUri.replace("ipfs://", "");
    return `https://${client.clientId}.ipfscdn.io/ipfs/${hash}`;
  };

  // State Loading
  if (isPending) return (
    <div className="flex flex-col items-center justify-center py-20 text-vault-amber animate-pulse">
        <RefreshCw className="animate-spin mb-4" size={32} />
        <p className="font-medium tracking-widest uppercase text-xs">{t.loadingBlockchain}</p>
    </div>
  );

  return (
    <div className="bg-white/[0.02] border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-sm min-h-[500px]">
      
      {/* Header Galeri */}
      <div className="flex justify-between items-center mb-10 px-2">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
             <FolderOpen className="text-vault-amber" /> 
             {t.galleryTitle} 
             <span className="bg-vault-amber/10 text-vault-amber text-[10px] px-2 py-1 rounded-md border border-vault-amber/20">
                {assets?.length || 0}
             </span>
          </h2>
        </div>
        
        <button 
          onClick={() => refetch()} 
          className="p-3 bg-white/5 border border-white/10 rounded-xl hover:border-vault-amber/50 hover:bg-vault-amber/10 transition-all group"
          title={t.refresh}
        >
          <RefreshCw size={18} className="text-slate-400 group-hover:text-vault-amber transition-transform group-active:rotate-180 duration-500" />
        </button>
      </div>

      {/* Tampilan Jika Kosong */}
      {!assets || assets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-[2rem] bg-black/20">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-600">
             <FolderOpen size={32} />
          </div>
          <p className="text-slate-500 max-w-[200px] text-center text-sm leading-relaxed">
            {t.noAssets}
          </p>
        </div>
      ) : (
        /* Grid Koleksi */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...assets].reverse().map((asset, i) => {
            const publicUrl = getSafeUrl(asset.cid);

            return (
              <div 
                key={i} 
                className="group bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden hover:border-vault-amber/40 transition-all duration-500 shadow-2xl"
              >
                {/* Visual Preview */}
                <div className="aspect-square w-full bg-[#111] relative overflow-hidden flex items-center justify-center">
                  
                  {asset.assetType === "image" ? (
                    <MediaRenderer 
                      client={client} 
                      src={asset.cid} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : asset.assetType === "music" ? (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex flex-col items-center justify-center p-6 text-center">
                       <div className="w-24 h-24 rounded-full bg-black border border-vault-amber/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.2)] transition-all">
                          <Music size={40} className="text-vault-amber animate-pulse" />
                       </div>
                       <audio controls className="w-full h-10 opacity-60 hover:opacity-100 transition-opacity">
                          <source src={publicUrl} type="audio/mpeg" />
                       </audio>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-slate-600">
                       <FileText size={80} strokeWidth={1} className="mb-4 opacity-20" />
                       <span className="text-[10px] tracking-[0.2em] font-bold uppercase">{asset.assetType}</span>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-lg tracking-tighter">
                       {asset.assetType}
                    </span>
                  </div>
                </div>

                {/* Info & Action */}
                <div className="p-6">
                  <h4 className="font-bold text-white truncate text-lg mb-4 group-hover:text-vault-amber transition-colors">
                    {asset.title}
                  </h4>
                  
                  <a 
                    href={publicUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-white/5 hover:bg-vault-amber text-slate-300 hover:text-black text-xs font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 border border-white/5 hover:border-transparent uppercase tracking-widest"
                  >
                    <ExternalLink size={14} /> {t.viewOriginal}
                  </a>
                  
                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                     <span className="text-[9px] font-mono text-slate-600 tracking-tighter">
                        HASH: {asset.cid.substring(7, 22)}...
                     </span>
                     <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-vault-amber/30"></div>
                        <div className="w-1 h-1 rounded-full bg-vault-amber/30"></div>
                        <div className="w-1 h-1 rounded-full bg-vault-amber/30"></div>
                     </div>
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