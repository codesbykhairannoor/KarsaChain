"use client";

import { useState } from "react";
import { prepareContractCall, ThirdwebClient, ThirdwebContract } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { Upload } from "lucide-react";

interface UploadFormProps {
  client: ThirdwebClient;
  contract: ThirdwebContract;
  onSuccess: () => void; // Callback biar Gallery bisa refresh setelah upload
}

export default function UploadForm({ client, contract, onSuccess }: UploadFormProps) {
  const [title, setTitle] = useState("");
  const [assetType, setAssetType] = useState("image");
  const [file, setFile] = useState<File | null>(null);
  
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const handleUpload = async () => {
    if (!title || !file) return alert("Isi judul dan file dulu bro!");

    try {
      // 1. Upload ke IPFS
      const { upload } = await import("thirdweb/storage");
      const uri = await upload({ client, files: [file] });

      // 2. Simpan ke Blockchain
      const transaction = prepareContractCall({
        contract,
        method: "function uploadAsset(string _cid, string _title, string _assetType)",
        params: [uri, title, assetType],
      });

      sendTransaction(transaction, {
        onSuccess: () => {
          alert("Mantap! Aset berhasil diamankan.");
          setTitle("");
          setFile(null);
          onSuccess(); // Panggil fungsi refresh
        },
      });
    } catch (err) {
      console.error(err);
      alert("Gagal upload bro.");
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Upload size={20} className="text-blue-400" /> Upload Aset Baru
      </h3>
      <div className="space-y-4">
        <input 
          className="w-full bg-black/40 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Judul Karya / Aset"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-4">
          <select 
            className="flex-1 bg-black/40 border border-slate-700 rounded-xl p-4 text-white outline-none"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            <option value="image">🎨 Gambar</option>
            <option value="music">🎵 Musik</option>
            <option value="essay">📄 Dokumen</option>
          </select>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="flex-1 bg-black/40 border border-slate-700 rounded-xl p-3 text-sm text-slate-400"
          />
        </div>
        <button 
          onClick={handleUpload}
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50"
        >
          {isPending ? "Sedang Proses..." : "Simpan ke Blockchain"}
        </button>
      </div>
    </div>
  );
}