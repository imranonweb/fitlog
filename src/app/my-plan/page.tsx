"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { SortOption } from "@/types";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    isHydrated,
    metrics,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="py-8 sm:py-12 bg-[#0f1115] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-[#c2f800] tracking-[1.2px] uppercase mb-2">
            DAILY TRACKER
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white font-[family-name:var(--font-oswald)] tracking-tight">
            MY PLAN
          </h1>
          <p className="text-gray-400 text-sm sm:text-[15px] mt-2">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="bg-[#13161d] border border-[#232732] rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#181b24] border border-[#232732] flex items-center justify-center text-[#c2f800]">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                EXERCISES
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-oswald)]">
                {isHydrated ? metrics.exercises : 0}
                <span className="text-xs font-semibold text-gray-500 ml-1">/ 5</span>
              </span>
            </div>
          </div>

          <div className="bg-[#13161d] border border-[#232732] rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#181b24] border border-[#232732] flex items-center justify-center text-[#c2f800]">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                MINUTES
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-oswald)]">
                {isHydrated ? metrics.minutes : 0}
                <span className="text-xs font-semibold text-gray-500 ml-1">min</span>
              </span>
            </div>
          </div>

          <div className="bg-[#13161d] border border-[#232732] rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#181b24] border border-[#232732] flex items-center justify-center text-[#c2f800]">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                CALORIES
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-oswald)]">
                {isHydrated ? metrics.calories : 0}
                <span className="text-xs font-semibold text-gray-500 ml-1">kcal</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#232732]">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#13161d] border border-[#232732] self-start">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "plan"
                  ? "bg-[#c2f800] text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({isHydrated ? plan.length : 0})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#c2f800] text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({isHydrated ? saved.length : 0})
            </button>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#13161d] border border-[#232732] hover:border-[#c2f800]/50 text-white text-xs font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-[#c2f800] transition-colors cursor-pointer"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {!isHydrated ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-8 h-8 border-2 border-[#c2f800] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-sm">Loading workouts...</p>
          </div>
        ) : sortedList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-[#111317] border border-[#232732] text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#181b24] border border-[#232732] flex items-center justify-center text-gray-500 mb-5">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white uppercase font-[family-name:var(--font-oswald)] mb-2 tracking-tight">
              NOTHING HERE YET
            </h2>
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "No saved workouts yet. Save exercises from the library to build your stash."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] bg-[#c2f800] hover:bg-[#b0e000] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span>Go to workouts</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedList.map((item) => {
              const isCompleted: boolean =
                activeTab === "plan" &&
                "isDone" in item &&
                Boolean(item.isDone);

              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#11141a] border-[#1e331e] opacity-90"
                      : "bg-[#14171e] hover:bg-[#181b24] border-[#232732] hover:border-[#c2f800]/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#181b24] flex-shrink-0 border border-[#232732]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover object-center"
                      />
                      {isCompleted && (
                        <div className="absolute inset-0 bg-[#0c0d10]/60 flex items-center justify-center">
                          <span className="w-8 h-8 rounded-full bg-[#c2f800] text-black flex items-center justify-center font-black text-sm">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`text-base sm:text-lg font-bold uppercase font-[family-name:var(--font-oswald)] tracking-wide ${
                            isCompleted
                              ? "text-gray-400 line-through"
                              : "text-white"
                          }`}
                        >
                          {item.name}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#c2f800]/15 text-[#c2f800] border border-[#c2f800]/30">
                            COMPLETED
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-gray-400 mb-2">
                        {item.equipment}
                      </span>

                      <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-300">
                        <span className="flex items-center gap-1.5">
                          <svg
                            className="w-3.5 h-3.5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {item.duration} min
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg
                            className="w-3.5 h-3.5 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.316.492-.533 1.035-.688 1.581-.462 1.627-.852 3.033-1.897 4.144C6.915 9.42 6.13 9.98 5.48 10.74c-.943 1.103-1.48 2.533-1.48 4.01a6.75 6.75 0 1013.5 0c0-1.927-.866-3.765-2.227-5.023-.97-.897-1.802-1.96-2.34-3.15-.367-.812-.538-1.69-.538-2.524 0-.54.1-1.074.28-1.55a1 1 0 00-.28-1.95z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {item.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-white">
                          <span className="text-[#c2f800]">★</span>
                          <span>{item.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#232732] w-full sm:w-auto justify-end">
                    <Link
                      href={`/workout/${item.id}`}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#181b24] hover:bg-[#202430] text-gray-200 hover:text-white border border-[#282e3c] transition-colors"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && !isCompleted && (
                      <button
                        type="button"
                        onClick={() => markAsDone(item.id)}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#c2f800] hover:bg-[#b0e000] text-black transition-colors cursor-pointer"
                        title="Mark workout as done"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Done</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(item.id)
                          : removeFromSaved(item.id)
                      }
                      className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-[#282e3c] hover:border-red-500/30 transition-colors cursor-pointer"
                      title="Remove workout"
                      aria-label="Remove workout"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
