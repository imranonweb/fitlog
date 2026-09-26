import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-[#15171d] hover:bg-[#181a22] border border-[#222630] hover:border-[#c2f800]/50 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-[#c2f800]/5"
    >
      <div className="relative w-full aspect-[16/10] bg-[#1a1c24] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide rounded-full bg-[#c2f800] text-black shadow-sm"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-white uppercase tracking-wide font-[family-name:var(--font-oswald)] group-hover:text-[#c2f800] transition-colors line-clamp-1 mb-1.5">
          {workout.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 line-clamp-1">
          <span className="truncate">{workout.equipment}</span>
        </div>

        <div className="mt-auto pt-3 border-t border-[#222630] flex items-center justify-between text-xs text-gray-400 font-medium">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-gray-500"
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
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.316.492-.533 1.035-.688 1.581-.462 1.627-.852 3.033-1.897 4.144C6.915 9.42 6.13 9.98 5.48 10.74c-.943 1.103-1.48 2.533-1.48 4.01a6.75 6.75 0 1013.5 0c0-1.927-.866-3.765-2.227-5.023-.97-.897-1.802-1.96-2.34-3.15-.367-.812-.538-1.69-.538-2.524 0-.54.1-1.074.28-1.55a1 1 0 00-.28-1.95z"
                clipRule="evenodd"
              />
            </svg>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-gray-300">
            <svg
              className="w-3.5 h-3.5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
