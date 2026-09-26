import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-[#0d0d0d] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-[#15171d] border border-[#222630] rounded-2xl p-6 sm:p-10 lg:p-14 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-10">
          <div className="flex flex-col items-start max-w-xl">
            <span className="text-[11px] font-bold text-[#c2f800] tracking-[1.2px] uppercase mb-4 sm:mb-5">
              WORKOUT LIBRARY
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-white uppercase font-[family-name:var(--font-oswald)] leading-[1.05] tracking-tight mb-5 sm:mb-6">
              TRAIN WITH INTENT. LOG<br className="hidden sm:inline" /> EVERY SET.
            </h1>

            <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8 max-w-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="inline-flex items-center justify-center bg-[#c2f800] hover:bg-[#b0e000] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-[6px] transition-all duration-200 active:scale-95 shadow-sm"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          <div className="flex items-center justify-center flex-shrink-0">
            <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[334px] lg:h-[334px]">
              <Image
                src="/banner.png"
                alt="FitLog Workout Character"
                width={334}
                height={334}
                priority
                className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
