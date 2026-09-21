export function RainbowIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 40C4 20.67 12.5 8 24 8C35.5 8 44 20.67 44 40"
        stroke="#EF9FC8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M11 40C11 24.9 16.9 15 24 15C31.1 15 37 24.9 37 40"
        stroke="#FFD84D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M18 40C18 29.1 20.7 22 24 22C27.3 22 30 29.1 30 40"
        stroke="#3BA55C"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="40" r="3" fill="#2F6FB5" />
    </svg>
  );
}
