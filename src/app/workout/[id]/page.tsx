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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 aspect-square rounded-2xl bg-[#171a21] animate-pulse border border-[#232834]" />
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="h-10 bg-[#171a21] rounded w-3/4 animate-pulse" />
            <div className="h-14 bg-[#151922] rounded-xl animate-pulse" />
            <div className="h-8 bg-[#171a21] rounded-full w-1/3 animate-pulse" />
            <div className="h-56 bg-[#13161f] rounded-2xl animate-pulse" />
            <div className="h-28 bg-[#151922] rounded-xl animate-pulse" />
            <div className="h-12 bg-[#171a21] rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex p-4 rounded-full bg-[#151922] border border-[#232834] text-red-400 mb-6">
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
        <h2 className="text-3xl font-bold text-white uppercase font-[family-name:var(--font-oswald)] mb-3">
          Workout Not Found
        </h2>
        <p className="text-gray-400 mb-8 text-base">
          The lift you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] bg-[#c2f800] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b0e000] transition-colors"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-[#0f1115] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[#232834] bg-[#171a21] shadow-2xl">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold uppercase text-white font-[family-name:var(--font-oswald)] tracking-tight leading-none mb-3">
              {workout.name}
            </h1>

            <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-4">
              {workout.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="px-3.5 py-1 text-xs font-bold capitalize rounded-full bg-[#c2f800] text-black shadow-sm"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="bg-[#13161f] border border-[#222735] rounded-2xl p-5 sm:p-6 mb-8">
              <div className="flex flex-col space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    EQUIPMENT
                  </span>
                  <span className="font-medium text-gray-200 text-right">
                    {workout.equipment}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    DIFFICULTY
                  </span>
                  <span className="font-medium text-gray-200 text-right">
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    SETS
                  </span>
                  <span className="font-medium text-gray-200 text-right">
                    {workout.sets}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    REPS
                  </span>
                  <span className="font-medium text-gray-200 text-right">
                    {workout.reps}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    DURATION
                  </span>
                  <span className="font-medium text-gray-200 text-right">
                    {workout.duration} min
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    CALORIES
                  </span>
                  <span className="font-medium text-gray-200 text-right">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">
                    RATING
                  </span>
                  <span className="font-medium text-gray-200 text-right">
                    {workout.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-bold tracking-wider text-white uppercase font-[family-name:var(--font-oswald)] mb-3">
                INSTRUCTIONS
              </h2>
              <div className="space-y-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                {workout.instructions.map((step, idx) => (
                  <p key={idx} className="flex items-start gap-1.5">
                    <span className="text-gray-400 font-medium shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => addToPlan(workout)}
                disabled={isAlreadyInPlan || isPlanFull}
                className={`flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider transition-all duration-200 ${
                  isAlreadyInPlan
                    ? "bg-[#1e2330] text-gray-400 border border-[#282f40] cursor-not-allowed"
                    : isPlanFull
                    ? "bg-[#1e2330] text-gray-400 border border-[#282f40] cursor-not-allowed"
                    : "bg-[#c2f800] hover:bg-[#b0e000] text-black shadow-lg shadow-[#c2f800]/15 active:scale-95 cursor-pointer"
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
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-medium tracking-wider border transition-all duration-200 ${
                  isAlreadySaved
                    ? "bg-[#151922] text-gray-500 border-[#232834] cursor-not-allowed"
                    : "bg-transparent hover:bg-[#151922] text-gray-200 border-[#2e3444] active:scale-95 cursor-pointer"
                }`}
              >
                <svg
                  className="w-4 h-4 text-gray-300"
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
