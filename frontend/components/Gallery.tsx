"use client";

import { useReadContract, MediaRenderer } from "thirdweb/react";
import { ThirdwebContract, ThirdwebClient } from "thirdweb";
import { Clock, ExternalLink, Image as ImageIcon, Music } from "lucide-react";

interface GalleryProps {
  contract: ThirdwebContract;
  address: string;
  client: ThirdwebClient;
}

export default function Gallery({ contract, address, client }: GalleryProps) {
  const { data: assets, isPending, refetch } = useReadContract({
    contract,
    method: "function getUserAssets(address _user) view returns ((string cid, string title, string assetType, uint256 timestamp)[])",
    params: [address],
  });

  // Fungsi helper untuk generate link yang aman dari blokir ISP Indonesia
  const getSafeUrl = (ipfsUri: string) => {
    if (!ipfsUri) return "#";
    const hash = ipfsUri.replace("ipfs://", "");
    // Menggunakan Gateway resmi Thirdweb (lebih stabil di jaringan lokal)
    return `https://${client.clientId}.ipfscdn.io/ipfs/${hash}`;
  };

  if (isPending) return (
    <div className="text-center py-20 text-slate-500 animate-pulse font-medium">
      Memanggil data dari Blockchain...
    </div>
  );

  return (
    <div className="mt-12">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Clock size={24} className="text-blue-400" /> Galeri Aset Saya
        </h3>
        <button 
          onClick={() => refetch()} 
          className="text-sm bg-slate-800 hover:bg-slate-700 text-blue-400 px-4 py-2 rounded-lg transition-colors"
        >
          Refresh List
        </button>
      </div>

      {!assets || assets.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
          <p className="text-slate-500">Belum ada aset terdaftar di wallet ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset, index) => (
            <div key={index} className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl hover:border-blue-500/50 transition-all group shadow-xl">
              
              {/* AREA PREVIEW GAMBAR/MUSIK */}
              <div className="aspect-square w-full bg-black/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-slate-800 relative">
                
                {/* MediaRenderer menggunakan jalur CDN Thirdweb secara internal */}
                <MediaRenderer 
                  client={client}
                  src={asset.cid} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Tipe Aset */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md p-2 rounded-xl text-white border border-white/10">
                    {asset.assetType === "music" ? <Music size={18}/> : <ImageIcon size={18}/>}
                </div>
              </div>

              {/* Detail Aset */}
              <div className="flex justify-between items-start px-1">
                <div className="overflow-hidden">
                    <h4 className="text-lg font-bold text-white mb-1 truncate" title={asset.title}>
                      {asset.title}
                    </h4>
                    <p className="text-xs text-blue-400 font-mono uppercase tracking-tighter opacity-80">
                      {asset.assetType}
                    </p>
                </div>
                
                {/* Tombol Buka di Tab Baru menggunakan Safe URL */}
                <a 
                    href={getSafeUrl(asset.cid)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-slate-800 p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all"
                    title="Lihat File Asli (Anti-Blokir)"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              {/* CID Display */}
              <div className="mt-4 pt-4 border-t border-slate-800/50">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span className="truncate flex-1 mr-2">CID: {asset.cid.replace("ipfs://", "")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}