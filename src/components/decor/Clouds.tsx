function Cloud({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25 45C13.9543 45 5 36.0457 5 25C5 13.9543 13.9543 5 25 5C33.5 5 40.8 10.2 44 17.6C46.5 15.3 49.9 14 53.6 14C61.4 14 67.8 20.3 68 28C74.5 28.8 79.5 34.3 79.5 41C79.5 48.2 73.7 54 66.5 54H25C15.6 54 8 46.4 8 37"
        fill="currentColor"
        opacity="0.9"
      />
      <ellipse cx="30" cy="40" rx="30" ry="16" fill="currentColor" />
      <ellipse cx="60" cy="34" rx="22" ry="18" fill="currentColor" />
      <ellipse cx="85" cy="42" rx="18" ry="13" fill="currentColor" />
    </svg>
  );
}

export function Clouds({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Cloud className="animate-float-slow absolute left-[5%] top-[12%] w-24 text-white/80 sm:w-32" />
      <Cloud className="animate-float absolute right-[8%] top-[20%] w-20 text-white/70 sm:w-28" />
      <Cloud className="animate-float-slow absolute left-[20%] top-[55%] w-16 text-white/60 sm:w-20" />
      <Cloud className="animate-float absolute right-[15%] top-[65%] w-14 text-white/70 sm:w-24" />
    </div>
  );
}
