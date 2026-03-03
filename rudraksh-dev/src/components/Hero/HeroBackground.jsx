import { memo } from "react";
import { motion } from "framer-motion";
import "./HeroBackground.css";

/* ═══════════════════════════════════════════════════════
   Animation configs — hoisted outside components to
   prevent re-creation on every render.

   ALL animations use transform-only properties:
   • Grid  → translateX / translateY  (GPU-composited)
   • Circles → rotate                 (GPU-composited)
   No scale, no opacity, no width/height, no border-radius.
   ═══════════════════════════════════════════════════════ */

// Grid: translate instead of backgroundPosition (GPU-friendly)
const GRID_ANIMATE = { x: "-50%", y: "-50%" };
const GRID_TRANSITION = {
  duration: 60,
  repeat: Infinity,
  ease: "linear",
};

// Circles: rotate-only (GPU-friendly, no scale/opacity)
const CIRCLE_ANIMATE = { rotate: 360 };
const CIRCLE_CLASSES = ["circle0", "circle1", "circle2"];
const CIRCLE_TRANSITIONS = [
  { duration: 20, repeat: Infinity, ease: "linear" },
  { duration: 30, repeat: Infinity, ease: "linear" },
  { duration: 40, repeat: Infinity, ease: "linear" },
];

/* ═══════════════════════════════════════════════════════
   AnimatedGrid — subtle drifting grid overlay.
   The grid element is 200% sized; translating it via
   GPU-composited transform creates seamless movement
   without backgroundPosition repaints.
   ═══════════════════════════════════════════════════════ */
const AnimatedGrid = memo(function AnimatedGrid() {
  return (
    <div className="heroGrid">
      <motion.div
        className="heroGridLines"
        animate={GRID_ANIMATE}
        transition={GRID_TRANSITION}
      />
    </div>
  );
});

/* ═══════════════════════════════════════════════════════
   HeroBackground
   -------------------------------------------------------
   Pure visual component — no content, no state, no events.
   Wrapped in React.memo → never re-renders.
   All animations use GPU-only transforms (rotate, translate).
   Absolutely positioned to cover parent hero section.
   ═══════════════════════════════════════════════════════ */
const HeroBackground = memo(function HeroBackground() {
  return (
    <div className="heroBackground">
      {/* Layer 1 — Animated grid */}
      <AnimatedGrid />

      {/* Layer 2 — Concentric rotating circles */}
      <div className="circlesContainer">
        {CIRCLE_CLASSES.map((cls, i) => (
          <motion.div
            key={cls}
            className={`circle ${cls}`}
            animate={CIRCLE_ANIMATE}
            transition={CIRCLE_TRANSITIONS[i]}
          />
        ))}
      </div>

      {/* Layer 3 — Static gradient glow (no animation) */}
      <div className="glowContainer">
        <div className="glowTeal" />
        <div className="glowCyan" />
      </div>
    </div>
  );
});

export default HeroBackground;
