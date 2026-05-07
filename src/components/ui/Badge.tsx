interface BadgeProps {
  children: React.ReactNode;
  bg: string;
  color: string;
  border?: string;
  className?: string;
}

export default function Badge({ children, bg, color, border, className = "" }: BadgeProps) {
  return (
    <span
      className={`badge ${className}`}
      style={{ background: bg, color, border: border ? `1px solid ${border}` : undefined }}
    >
      {children}
    </span>
  );
}



