// Served from /public so the logo works on any host (Lovable, Netlify, etc.)
const LOGOS = {
  mark: "/rebel-mark.png",
  full: "/rebel-logo-full.png",
} as const;

export function RebelLogo({
  className = "h-10 w-10",
  variant = "mark",
}: {
  className?: string;
  variant?: "mark" | "full";
}) {
  const src = LOGOS[variant];
  return (
    <img
      src={asset.url}
      alt="Rebel Media HQ logo"
      className={`${className} object-contain`}
      loading="eager"
      decoding="async"
    />
  );
}
