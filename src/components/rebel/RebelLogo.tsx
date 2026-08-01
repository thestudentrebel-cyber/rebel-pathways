import markAsset from "@/assets/rebel-mark.png.asset.json";
import fullAsset from "@/assets/rebel-logo-full.png.asset.json";

export function RebelLogo({
  className = "h-10 w-10",
  variant = "mark",
}: {
  className?: string;
  variant?: "mark" | "full";
}) {
  const asset = variant === "full" ? fullAsset : markAsset;
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
