"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "../lib/store";
import { translations } from "../lib/translations";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { Home, LayoutDashboard, Globe, User } from "lucide-react"; 

interface NavbarProps {
  client: any;
}

export default function Navbar({ client }: NavbarProps) {
  const pathname = usePathname(); // Ini buat ngecek URL sekarang
  const { lang, setLang } = useLanguageStore();
  const t = translations[lang as keyof typeof translations];
  const account = useActiveAccount();

  // Helper biar kodingan rapi
  const NavLink = ({ href, icon: Icon, label }: any) => {
    const isActive = pathname === href;
    return (
      <Link 
        href={href}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
          isActive 
            ? 'bg-vault-amber text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon size={16} /> {label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-vault-amber rounded-tl-xl rounded-br-xl flex items-center justify-center font-black text-black italic text-xl group-hover:scale-110 transition-transform">
            K
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-white uppercase">
            KARSA<span className="text-vault-amber">CHAIN</span>
          </h1>
        </Link>

        {/* MENU TENGAH */}
        <div className="flex items-center bg-white/5 border border-white/5 rounded-full p-1.5 gap-1 overflow-x-auto">
            <NavLink href="/" icon={Home} label={t.navHome} />
            <NavLink href="/dashboard" icon={LayoutDashboard} label={t.navDashboard} />
            <NavLink href="/explore" icon={Globe} label={t.navGlobal} />
            {account && <NavLink href="/profile" icon={User} label={t.navProfile} />}
        </div>

        {/* KANAN */}
        <div className="flex items-center gap-3">
          <div className="flex bg-black border border-white/10 rounded-lg p-1">
            <button onClick={() => setLang('id')} className={`px-2 py-1 text-xs rounded font-bold ${lang === 'id' ? 'bg-vault-amber text-black' : 'text-slate-500'}`}>ID</button>
            <button onClick={() => setLang('en')} className={`px-2 py-1 text-xs rounded font-bold ${lang === 'en' ? 'bg-vault-amber text-black' : 'text-slate-500'}`}>EN</button>
          </div>
          <ConnectButton client={client} theme="dark" />
        </div>
      </div>
    </nav>
  );
}