import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#1f1f1f] bg-[#0d0d0d] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#262626] text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
              WORKOUT LIBRARY
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-[family-name:var(--font-oswald)] leading-[1.08] mb-6">
              TRAIN WITH INTENT. <br />
              <span className="text-[#ccff00]">LOG EVERY SET.</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="inline-flex items-center gap-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#ccff00]/15 group"
            >
              <span>BROWSE WORKOUTS</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border border-[#222222] bg-[#141414] shadow-2xl">
              <Image
                src="/banner.png"
                alt="FitLog Training Hero"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
