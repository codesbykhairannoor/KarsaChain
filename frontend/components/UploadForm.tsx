"use client";

import { useState } from "react";
import { prepareContractCall, ThirdwebClient, ThirdwebContract } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { Upload } from "lucide-react";
import { upload } from "thirdweb/storage"; // Kita ubah importnya jadi di atas biar pasti ke-load

interface UploadFormProps {
  client: ThirdwebClient;
  contract: ThirdwebContract;
  onSuccess: () => void;
}

export default function UploadForm({ client, contract, onSuccess }: UploadFormProps) {
  const [title, setTitle] = useState("");
  const [assetType, setAssetType] = useState("image");
  const [file, setFile] = useState<File | null>(null);
  
  // Kita tambahin error log bawaan hook ini
  const { mutate: sendTransaction, isPending, error: txError } = useSendTransaction();

  const handleUpload = async () => {
    // 1. Cek Input
    console.log("LOG 1: Tombol Ditekan");
    if (!title || !file) return alert("Isi judul dan file dulu bro!");

    try {
      // 2. Mulai Upload IPFS
      console.log("LOG 2: OTW Upload ke IPFS...");
      
      // Upload file langsung
      const uri = await upload({ 
        client, 
        files: [file] 
      });
      
      console.log("LOG 3: Upload IPFS Berhasil! URI:", uri);

      // 3. Siapkan Transaksi Blockchain
      console.log("LOG 4: Menyiapkan Transaksi Blockchain...");
      const transaction = prepareContractCall({
        contract,
        method: "function uploadAsset(string _cid, string _title, string _assetType)",
        params: [uri, title, assetType],
      });

      console.log("LOG 5: Mengirim Request ke Wallet...");
      
      // 4. Kirim Transaksi
      sendTransaction(transaction, {
        onSuccess: (txHash) => {
          console.log("LOG 6: SUKSES! Hash:", txHash);
          alert("Mantap! Aset berhasil diamankan.");
          setTitle("");
          setFile(null);
          onSuccess();
        },
        onError: (error) => {
          console.error("LOG ERROR (Tx Failed):", error);
          alert("Transaksi Ditolak/Gagal: " + error.message);
        }
      });

    } catch (err: any) {
      // Tangkap Error IPFS atau Error Codingan
      console.error("LOG ERROR (Catch Block):", err);
      alert("Terjadi Error Sistem: " + (err.message || err));
    }
  };

  // Tampilkan error di layar kalau hook bermasalah
  if (txError) {
    console.error("Hook Error:", txError);
  }

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
          {isPending ? "Sedang Proses (Cek Console F12)..." : "Simpan ke Blockchain"}
        </button>
        
        {/* Tampilkan Error di Layar kalau ada */}
        {txError && (
            <p className="text-red-500 text-sm text-center bg-red-900/20 p-2 rounded">
                Error: {txError.message}
            </p>
        )}
      </div>
    </div>
  );
}