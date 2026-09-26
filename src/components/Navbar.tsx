"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isHydrated } = usePlan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  const planCount = isHydrated ? plan.length : 0;
  const savedCount = isHydrated ? saved.length : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1c23] bg-[#0d0d0d]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-[#14161d] border border-[#222630] group-hover:border-[#c2f800]/50 transition-colors p-1">
              <Image
                src="/logo.png"
                alt="FitLog Logo"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-[family-name:var(--font-oswald)] uppercase">
              FIT<span className="text-[#c2f800]">LOG</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-3 font-medium text-xs tracking-wide">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isWorkoutActive
                  ? "bg-[#1a2312] text-[#c2f800] font-bold border border-[#c2f800]/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isMyPlanActive
                  ? "bg-[#1a2312] text-[#c2f800] font-bold border border-[#c2f800]/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/my-plan"
              className="inline-flex items-center gap-1.5 bg-[#c2f800] hover:bg-[#b0e000] text-black font-bold text-xs px-3 py-1 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
              title="View today's workout plan"
            >
              <span>Plan</span>
              <span className="w-4 h-4 rounded-full bg-black/20 text-black text-[10px] font-black flex items-center justify-center">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="inline-flex items-center gap-1.5 border border-[#2a2a2a] hover:border-[#c2f800]/60 bg-[#141414] hover:bg-[#1a1a1a] text-gray-200 hover:text-white font-medium text-xs px-3 py-1 rounded-full transition-all duration-200 active:scale-95"
              title="View saved workouts"
            >
              <span>Saved</span>
              <span className="w-4 h-4 rounded-full bg-white/10 text-gray-200 text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1f1f1f] flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isWorkoutActive
                  ? "bg-[#1a2312] text-[#c2f800] font-semibold"
                  : "text-gray-300 hover:bg-[#191919]"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isMyPlanActive
                  ? "bg-[#1a2312] text-[#c2f800] font-semibold"
                  : "text-gray-300 hover:bg-[#191919]"
              }`}
            >
              My Plan
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
