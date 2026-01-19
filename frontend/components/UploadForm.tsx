"use client";

import { useState } from "react";
import { prepareContractCall, ThirdwebClient, ThirdwebContract } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { Upload, FileUp, ShieldCheck } from "lucide-react";
import { upload } from "thirdweb/storage";
import { useLanguageStore } from "@/lib/store";
import { translations } from "@/lib/translations";

interface UploadFormProps {
  client: ThirdwebClient;
  contract: ThirdwebContract;
  onSuccess: () => void;
}

export default function UploadForm({ client, contract, onSuccess }: UploadFormProps) {
  const [title, setTitle] = useState("");
  const [assetType, setAssetType] = useState("image");
  const [file, setFile] = useState<File | null>(null);
  
  const { lang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];

  const { mutate: sendTransaction, isPending, error: txError } = useSendTransaction();

  const handleUpload = async () => {
    if (!title || !file) return alert(t.errorFill);

    try {
      console.log("LOG: Uploading to IPFS...");
      const uri = await upload({ client, files: [file] });
      
      const transaction = prepareContractCall({
        contract,
        method: "function uploadAsset(string _cid, string _title, string _assetType)",
        params: [uri, title, assetType],
      });

      sendTransaction(transaction, {
        onSuccess: (txHash) => {
          alert(t.successMsg);
          setTitle("");
          setFile(null);
          onSuccess();
        },
        onError: (error) => {
          alert("Error: " + error.message);
        }
      });
    } catch (err: any) {
      alert("System Error: " + (err.message || err));
    }
  };

  return (
    /* Menggunakan bg-vault-card dan border-white/10 agar sinkron dengan globals.css */
    <div className="bg-vault-card border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Upload size={20} className="text-vault-amber" /> {t.uploadTitle}
      </h3>
      
      <div className="space-y-4">
        <input 
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-vault-amber outline-none transition-all"
          placeholder={t.inputPlaceholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div className="flex flex-col md:flex-row gap-4">
          <select 
            className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-vault-amber cursor-pointer"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            <option value="image" className="bg-zinc-900">{t.typeImage}</option>
            <option value="music" className="bg-zinc-900">{t.typeMusic}</option>
            <option value="essay" className="bg-zinc-900">{t.typeDoc}</option>
          </select>

          <label className="flex-1 flex items-center justify-between bg-black/40 border border-dashed border-white/20 rounded-xl p-4 cursor-pointer hover:border-vault-amber transition-all group">
            <span className="text-sm text-zinc-400 truncate w-40">
              {file ? file.name : "Pilih File..."}
            </span>
            <FileUp size={18} className="text-zinc-500 group-hover:text-vault-amber" />
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        <button 
          onClick={handleUpload}
          disabled={isPending}
          className="w-full bg-vault-amber hover:bg-yellow-500 text-black font-extrabold py-4 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                {t.btnProcess}
            </div>
          ) : (
            <><ShieldCheck size={20}/> {t.btnSave}</>
          )}
        </button>
        
        {txError && (
            <p className="text-red-400 text-xs text-center bg-red-950/30 p-3 rounded-xl border border-red-900/50">
               ⚠️ {txError.message}
            </p>
        )}
      </div>
    </div>
  );
}