type WaveDividerProps = {
  color?: string;
  flip?: boolean;
  className?: string;
};

export function WaveDivider({
  color = "#fffaf0",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        className="h-[50px] w-full sm:h-[80px]"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="M0,32 C240,80 480,80 720,48 C960,16 1200,16 1440,48 L1440,90 L0,90 Z"
        />
      </svg>
    </div>
  );
}
