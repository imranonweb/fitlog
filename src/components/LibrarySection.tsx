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
    <section id="library" className="py-16 sm:py-20 bg-[#0d0d0d] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#ccff00]">
              EXPLORE EXERCISES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-[family-name:var(--font-oswald)] tracking-tight">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#141414] border border-[#222222] rounded-xl overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-[16/10] bg-[#1f1f1f]" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-5 bg-[#242424] rounded w-3/4" />
                  <div className="h-4 bg-[#1f1f1f] rounded w-1/2" />
                  <div className="mt-4 pt-3 border-t border-[#222222] flex justify-between">
                    <div className="h-4 bg-[#1f1f1f] rounded w-16" />
                    <div className="h-4 bg-[#1f1f1f] rounded w-16" />
                    <div className="h-4 bg-[#1f1f1f] rounded w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#141414] border border-[#262626]">
            <p className="text-red-400 font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-full bg-[#ccff00] text-black font-bold text-sm hover:bg-[#b8e600] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
