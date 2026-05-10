"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import personImg from "@/public/assets/person.png";
import saFlag from "@/public/assets/sa.png";

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user } = useAuth();

  return (
    <header className="h-15 bg-white flex items-center justify-between px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-2">

        <Link
          href={`/${user?.role === "serviceProvider" ? "sp" : "bo"}/profile`}
          className="flex items-center gap-2"
        >
          <Image
            src={personImg}
            alt={user?.name ?? "Admin"}
            width={36}
            height={36}
            className="rounded-full object-cover shrink-0 ring-2 ring-[#e2e8f0]"
          />

          <div className="hidden lg:block leading-tight">
            <p className="text-sm font-semibold text-primary">
              {user?.name ?? "Ahmed Mohamed"}
            </p>

            <p className="text-xs text-[#94a3b8] capitalize">
              {user?.role ?? "Admin"}
            </p>
          </div>
        </Link>

        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-[#64748b] hover:bg-[#f1f5f9] hover:text-primary transition-colors"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#e2e8f0] text-sm font-medium text-primary hover:bg-[#f8fafc] transition-colors">
          <Image
            src={saFlag}
            alt="Saudi Arabia"
            width={20}
            height={16}
            className="rounded-sm object-cover shrink-0"
          />
          <span>Ar</span>
          <ChevronDown />
        </button>
      </div>
    </header>
  );
};