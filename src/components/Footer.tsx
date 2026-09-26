import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1b1f28] bg-[#0f1115] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="relative w-7 h-7 flex items-center justify-center rounded-lg bg-[#14161d] border border-[#222630] group-hover:border-[#c2f800]/50 transition-colors p-1">
              <Image
                src="/logo.png"
                alt="FitLog Logo"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold tracking-wider text-white font-[family-name:var(--font-oswald)] uppercase">
              FIT<span className="text-[#c2f800]">LOG</span>
            </span>
          </Link>

          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-right font-medium">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
}
