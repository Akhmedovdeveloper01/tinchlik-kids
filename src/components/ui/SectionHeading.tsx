import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="rounded-full bg-primary-light px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-ink/70 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
