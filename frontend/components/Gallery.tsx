"use client";

import { useReadContract } from "thirdweb/react";
import { ThirdwebContract, ThirdwebClient } from "thirdweb"; // Import Client
import { MediaRenderer } from "thirdweb/react"; // Import Komponen Ajaib Ini
import { Clock, ExternalLink, FileText, Image as ImageIcon, Music } from "lucide-react";

interface GalleryProps {
  contract: ThirdwebContract;
  address: string;
  client: ThirdwebClient; // Tambahin tipe data client
}

export default function Gallery({ contract, address, client }: GalleryProps) {
  const { data: assets, isPending, refetch } = useReadContract({
    contract,
    method: "function getUserAssets(address _user) view returns ((string cid, string title, string assetType, uint256 timestamp)[])",
    params: [address],
  });

  if (isPending) return <div className="text-center py-20 text-slate-500 animate-pulse">Sedang mengambil data dari Blockchain...</div>;

  return (
    <div className="mt-12">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Clock size={24} className="text-blue-400" /> Galeri Aset Saya
        </h3>
        <button onClick={() => refetch()} className="text-sm text-blue-400 hover:underline">
          Refresh List
        </button>
      </div>

      {!assets || assets.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800">
          <p className="text-slate-500">Belum ada aset. Upload dulu dong!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl hover:border-blue-500 transition-all group">
              
              {/* AREA PREVIEW GAMBAR/MUSIK */}
              <div className="aspect-square w-full bg-black/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-slate-800 relative">
                
                {/* INI KUNCINYA: MediaRenderer otomatis nampilin gambar/audio dari IPFS dengan cepat */}
                <MediaRenderer 
                  client={client}
                  src={asset.cid} 
                  className="w-full h-full object-cover"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Badge Tipe Aset */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur p-2 rounded-lg text-white">
                    {asset.assetType === "music" ? <Music size={16}/> : <ImageIcon size={16}/>}
                </div>
              </div>

              {/* Detail Aset */}
              <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-lg font-bold text-white mb-1 truncate w-40">{asset.title}</h4>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">{asset.assetType}</p>
                </div>
                
                {/* Tombol Buka di Tab Baru (Pake Gateway Cepat dweb.link) */}
                <a 
                    href={`https://dweb.link/ipfs/${asset.cid.replace("ipfs://", "")}`} 
                    target="_blank" 
                    className="text-slate-500 hover:text-blue-400 transition-colors p-2"
                    title="Buka File Asli"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              {/* CID Display */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-600 font-mono break-all line-clamp-1">
                    CID: {asset.cid}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}