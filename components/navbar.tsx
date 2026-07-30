"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[#2b2b2b] bg-[#141414]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[10px] overflow-hidden">
              <Image src="/logo.svg" alt="Solscan Echo" width={28} height={28} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-[#e4e4e4]">
              Solscan Echo
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-[14px] pb-0.5 border-b-2 transition-colors ${
                pathname === "/"
                  ? "border-[#81a1c1] text-[#e4e4e4]"
                  : "border-transparent text-[#8a8a8a] hover:text-[#e4e4e4]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#examples"
              className="text-[14px] pb-0.5 border-b-2 border-transparent text-[#8a8a8a] hover:text-[#e4e4e4] transition-colors"
            >
              Examples
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}