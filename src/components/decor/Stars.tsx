function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 4.8 2.2 6.4 7 7-4.8.6-6.4 2.2-7 7-.6-4.8-2.2-6.4-7-7 4.8-.6 6.4-2.2 7-7Z" />
    </svg>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Sparkle className="animate-bounce-soft absolute left-[10%] top-[15%] w-5 text-sunny" />
      <Sparkle className="animate-bounce-soft absolute right-[12%] top-[30%] w-4 text-pink [animation-delay:0.4s]" />
      <Sparkle className="animate-bounce-soft absolute left-[25%] top-[70%] w-3 text-lavender [animation-delay:0.8s]" />
      <Sparkle className="animate-bounce-soft absolute right-[20%] top-[80%] w-6 text-sunny [animation-delay:1.2s]" />
    </div>
  );
}
