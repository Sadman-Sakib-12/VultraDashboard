interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  size?: "sm" | "md";
}

export default function Toggle({ enabled, onChange, size = "md" }: ToggleProps) {
  const width  = size === "sm" ? 32 : 40;
  const height = size === "sm" ? 18 : 22;
  const knob   = size === "sm" ? 14 : 18;
  const offset = size === "sm" ? 15 : 19;

  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
      className="relative rounded-full transition-all duration-300 shrink-0"
      style={{
        width,
        height,
        background: enabled
          ? "linear-gradient(135deg, #4f8ef7, #8b5cf6)"
          : "var(--bg-hover)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="absolute top-0.5 rounded-full transition-all duration-300"
        style={{
          width:      knob,
          height:     knob,
          background: "white",
          left:       enabled ? offset : 2,
          boxShadow:  "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}



