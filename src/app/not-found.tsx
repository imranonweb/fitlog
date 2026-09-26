import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center bg-[#0d0d0d]">
      <div className="relative mb-6">
        <span className="text-8xl sm:text-9xl font-black tracking-tighter text-[#1f1f1f] select-none font-[family-name:var(--font-oswald)]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl sm:text-4xl font-black text-[#ccff00] font-[family-name:var(--font-oswald)] tracking-wider">
            LOST YOUR REP?
          </span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-[family-name:var(--font-oswald)] mb-3">
        Page Not Found
      </h1>

      <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
        The workout route or page you are looking for does not exist, has been removed, or was never racked.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm uppercase tracking-wide transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#ccff00]/15"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
