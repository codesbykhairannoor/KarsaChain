"use client";

import { useReadContract } from "thirdweb/react";
import { ThirdwebContract } from "thirdweb";
import { Clock, ExternalLink, FileText, Image as ImageIcon, Music } from "lucide-react";

interface GalleryProps {
  contract: ThirdwebContract;
  address: string;
}

export default function Gallery({ contract, address }: GalleryProps) {
  const { data: assets, isPending, refetch } = useReadContract({
    contract,
    method: "function getUserAssets(address _user) view returns ((string cid, string title, string assetType, uint256 timestamp)[])",
    params: [address],
  });

  // Kita expose fungsi refetch biar bisa dipanggil dari luar kalau perlu
  if (isPending) return <div className="text-center py-20 text-slate-500">Loading data blockchain...</div>;

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
            <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-blue-500 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                  {asset.assetType === "music" ? <Music size={20} /> : asset.assetType === "essay" ? <FileText size={20} /> : <ImageIcon size={20} />}
                </div>
                <a href={asset.cid.replace("ipfs://", "https://ipfs.io/ipfs/")} target="_blank" className="text-slate-500 hover:text-white transition-colors">
                  <ExternalLink size={18} />
                </a>
              </div>
              <h4 className="text-lg font-bold text-white mb-1 truncate">{asset.title}</h4>
              <p className="text-xs text-slate-500 font-mono mb-4 uppercase tracking-widest">{asset.assetType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}