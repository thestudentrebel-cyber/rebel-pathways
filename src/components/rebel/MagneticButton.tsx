import { motion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.25,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.35,
    });
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-display text-xs uppercase tracking-[0.18em] transition-colors duration-300 sm:text-sm";
  const styles =
    variant === "primary"
      ? "bg-gradient-ember text-primary-foreground shadow-ember hover:brightness-110"
      : "border border-border text-foreground hover:border-primary hover:text-primary";

  const inner = <span className="relative z-10 flex items-center gap-2">{children}</span>;

  return (
    <motion.div
      ref={ref}
      data-cursor="cta"
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      className={`inline-block ${disabled ? "pointer-events-none opacity-60" : ""} ${className}`}
    >
      {href ? (
        <a href={href} className={`${base} ${styles}`}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
