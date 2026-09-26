"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";

export default function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const workoutId = resolvedParams.id;

  const { plan, saved, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWorkout() {
      try {
        setLoading(true);
        setError(false);
        const data = await getWorkoutById(workoutId);
        setWorkout(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [workoutId]);

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = Boolean(
    workout && plan.some((item) => item.id === workout.id)
  );
  const isAlreadySaved = Boolean(
    workout && saved.some((item) => item.id === workout.id)
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-6 w-32 bg-[#1f1f1f] rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 aspect-[4/3] rounded-2xl bg-[#181818] animate-pulse border border-[#222222]" />
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="h-10 bg-[#1f1f1f] rounded w-3/4 animate-pulse" />
            <div className="h-20 bg-[#181818] rounded animate-pulse" />
            <div className="h-44 bg-[#141414] rounded-xl animate-pulse" />
            <div className="h-12 bg-[#1f1f1f] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex p-4 rounded-full bg-[#181818] border border-[#262626] text-red-400 mb-6">
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-white uppercase font-[family-name:var(--font-oswald)] mb-3">
          Workout Not Found
        </h2>
        <p className="text-gray-400 mb-8 text-base">
          The lift you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ccff00] text-black font-extrabold text-sm hover:bg-[#b8e600] transition-colors"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#0d0d0d] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/#library"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#ccff00] transition-colors font-medium"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Library</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#262626] bg-[#141414] shadow-2xl">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-md bg-black/85 text-[#ccff00] border border-[#ccff00]/40 backdrop-blur-md"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="border-b border-[#222222] pb-6 mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-[family-name:var(--font-oswald)] tracking-tight mb-3">
                {workout.name}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {workout.description}
              </p>
            </div>

            <div className="bg-[#141414] border border-[#222222] rounded-xl p-5 mb-8">
              <h2 className="text-xs font-black tracking-widest text-[#ccff00] uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                KEY SPECS
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    EQUIPMENT
                  </span>
                  <span className="font-semibold text-white">
                    {workout.equipment}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    DIFFICULTY
                  </span>
                  <span className="font-semibold text-white">
                    {workout.difficulty}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    SETS & REPS
                  </span>
                  <span className="font-semibold text-white">
                    {workout.sets} sets × {workout.reps}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    DURATION
                  </span>
                  <span className="font-semibold text-white">
                    {workout.duration} min
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    CALORIES
                  </span>
                  <span className="font-semibold text-white">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    RATING
                  </span>
                  <span className="font-semibold text-[#ccff00] flex items-center gap-1">
                    ★ {workout.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-black tracking-wider text-white uppercase font-[family-name:var(--font-oswald)] mb-4 flex items-center gap-2">
                INSTRUCTIONS
              </h2>
              <div className="space-y-3">
                {workout.instructions.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#141414] border border-[#222222]"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ccff00] text-black text-xs font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4 border-t border-[#222222]">
              <button
                type="button"
                onClick={() => addToPlan(workout)}
                disabled={isAlreadyInPlan || isPlanFull}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold tracking-wide uppercase transition-all duration-200 ${
                  isAlreadyInPlan
                    ? "bg-[#1f1f1f] text-gray-400 border border-[#2a2a2a] cursor-not-allowed"
                    : isPlanFull
                    ? "bg-[#1f1f1f] text-gray-400 border border-[#2a2a2a] cursor-not-allowed"
                    : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-lg shadow-[#ccff00]/15 active:scale-95 cursor-pointer"
                }`}
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
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>
                  {isAlreadyInPlan
                    ? "Already in Plan"
                    : isPlanFull
                    ? "Plan Full (Max 5)"
                    : "Add to today's plan"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => addToSaved(workout)}
                disabled={isAlreadySaved}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase border transition-all duration-200 ${
                  isAlreadySaved
                    ? "bg-[#161616] text-gray-500 border-[#242424] cursor-not-allowed"
                    : "bg-[#161616] hover:bg-[#202020] text-white border-[#2e2e2e] hover:border-[#ccff00]/50 active:scale-95 cursor-pointer"
                }`}
              >
                <svg
                  className="w-4 h-4 text-[#ccff00]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>{isAlreadySaved ? "Saved" : "Save for later"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
