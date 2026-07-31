import logoAsset from "@/assets/rebel-logo.asset.json";

export function RebelLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Rebel Media HQ logo"
      className={`${className} object-contain mix-blend-screen`}
      style={{ filter: "invert(1) contrast(1.6) brightness(1.25)" }}
      loading="eager"
    />
  );
}
