"use client";

import React, { useState, useEffect } from "react";
import { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "@/components/WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load workout library. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="library" className="py-12 sm:py-16 bg-[#0c0d10] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-[#c2f800] tracking-[1.2px] uppercase mb-2">
            WORKOUT LIBRARY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white font-[family-name:var(--font-oswald)] tracking-tight">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm sm:text-[15px] mt-2">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#15171d] border border-[#222630] rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-[16/10] bg-[#1a1c24]" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-5 bg-[#222630] rounded w-3/4" />
                  <div className="h-4 bg-[#1e2129] rounded w-1/2" />
                  <div className="mt-4 pt-3 border-t border-[#222630] flex justify-between">
                    <div className="h-4 bg-[#1e2129] rounded w-16" />
                    <div className="h-4 bg-[#1e2129] rounded w-16" />
                    <div className="h-4 bg-[#1e2129] rounded w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#15171d] border border-[#222630]">
            <p className="text-red-400 font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-[6px] bg-[#c2f800] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b0e000] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
