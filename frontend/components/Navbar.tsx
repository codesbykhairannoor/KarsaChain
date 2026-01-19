"use client";

import { ConnectButton } from "thirdweb/react";
import { ThirdwebClient } from "thirdweb";
import { Database } from "lucide-react";

interface NavbarProps {
  client: ThirdwebClient;
}

export default function Navbar({ client }: NavbarProps) {
  return (
    <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/5">
      <div className="flex items-center gap-2">
        <Database className="text-blue-500" size={28} />
        <h1 className="text-2xl font-black tracking-tighter text-white">
          KARSA<span className="text-blue-500">CHAIN</span>
        </h1>
      </div>
      <ConnectButton client={client} theme="dark" />
    </nav>
  );
}