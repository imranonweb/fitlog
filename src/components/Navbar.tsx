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
    <header className="sticky top-0 z-50 w-full border-b border-[#1f1f1f] bg-[#0d0d0d]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] group-hover:border-[#ccff00]/50 transition-colors p-1">
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
              FIT<span className="text-[#ccff00]">LOG</span>
            </span>
          </Link>

   
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide">
            <Link
              href="/"
              className={`relative py-1.5 transition-colors duration-200 ${
                isWorkoutActive
                  ? "text-[#ccff00] font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Workout
              {isWorkoutActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00] rounded-full shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
              )}
            </Link>

            <Link
              href="/my-plan"
              className={`relative py-1.5 transition-colors duration-200 ${
                isMyPlanActive
                  ? "text-[#ccff00] font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Plan
              {isMyPlanActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00] rounded-full shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/my-plan"
              className="inline-flex items-center gap-1.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs sm:text-sm px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm shadow-[#ccff00]/10"
              title="View today's workout plan"
            >
              <span className="tracking-wide">Plan</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 bg-black/15 text-black rounded-full text-xs font-black">
                {planCount}
              </span>
            </Link>

              
            <Link
              href="/my-plan"
              className="inline-flex items-center gap-1.5 border border-[#2a2a2a] hover:border-[#ccff00]/60 bg-[#141414] hover:bg-[#1a1a1a] text-gray-200 hover:text-white font-medium text-xs sm:text-sm px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 active:scale-95"
              title="View saved workouts"
            >
              <span className="tracking-wide">Saved</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 bg-white/10 text-gray-200 rounded-full text-xs font-bold">
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
                  ? "bg-[#ccff00]/10 text-[#ccff00] font-semibold"
                  : "text-gray-300 hover:bg-[#191919]"
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isMyPlanActive
                  ? "bg-[#ccff00]/10 text-[#ccff00] font-semibold"
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
