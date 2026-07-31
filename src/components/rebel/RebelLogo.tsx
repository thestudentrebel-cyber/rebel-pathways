import logoAsset from "@/assets/rebel-logo.asset.json";

export function RebelLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Rebel Media HQ logo"
      className={`${className} object-contain mix-blend-screen`}
      style={{ filter: "invert(1) brightness(1.35) contrast(1.15)" }}
      loading="eager"
    />
  );
}
