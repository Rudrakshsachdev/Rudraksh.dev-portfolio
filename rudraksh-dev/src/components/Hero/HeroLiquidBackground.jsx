import { memo, useEffect, useRef } from "react";
import { createLiquidEther } from "./liquidEtherEngine";
import "./HeroLiquidBackground.css";

/* ═══════════════════════════════════════════════════════
   HeroLiquidBackground
   -------------------------------------------------------
   Self-contained WebGL LiquidEther fluid simulation.
   Wrapped in React.memo — never re-renders from parent.

   Performance features:
   • IntersectionObserver — pauses when off-screen
   • visibilitychange    — pauses when tab hidden
   • ResizeObserver      — debounced via rAF
   • requestAnimationFrame properly cancelled on unmount
   • WebGL context created once, disposed on unmount
   • No state, no props consumed from parent
   • pointer-events: none — does not capture clicks
   ═══════════════════════════════════════════════════════ */

/* ── Default configuration (static, never changes) ── */
const CONFIG = {
  mouseForce: 20,
  cursorSize: 100,
  isViscous: false,
  viscous: 30,
  iterationsViscous: 32,
  iterationsPoisson: 32,
  dt: 0.014,
  BFECC: true,
  resolution: 0.5,
  isBounce: false,
  colors: ["#5227FF", "#FF9FFC", "#B19EEF"],
  autoDemo: true,
  autoSpeed: 0.5,
  autoIntensity: 2.2,
  takeoverDuration: 0.25,
  autoResumeDelay: 1000,
  autoRampDuration: 0.6,
  mobileResolution: 0.4,
  mobileBreakpoint: 768,
};

const HeroLiquidBackground = memo(function HeroLiquidBackground() {
  const mountRef = useRef(null);
  const engineRef = useRef(null);
  const rafRef = useRef(null);
  const resizeRafRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    /* ── Create engine ── */
    const engine = createLiquidEther(container, CONFIG, {
      isVisibleRef,
      rafRef,
      resizeRafRef,
    });
    engineRef.current = engine;
    engine.start();

    /* ── IntersectionObserver — pause when off-screen ── */
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = entry.isIntersecting && entry.intersectionRatio > 0;
        isVisibleRef.current = visible;
        if (!engineRef.current) return;
        if (visible && !document.hidden) {
          engineRef.current.start();
        } else {
          engineRef.current.pause();
        }
      },
      { threshold: [0, 0.01, 0.1] },
    );
    io.observe(container);

    /* ── ResizeObserver — debounced via rAF ── */
    const ro = new ResizeObserver(() => {
      if (!engineRef.current) return;
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(() => {
        if (!engineRef.current) return;
        engineRef.current.resize();
      });
    });
    ro.observe(container);

    /* ── Cleanup ── */
    const raf = rafRef;
    const resizeRaf = resizeRafRef;
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      if (resizeRaf.current) cancelAnimationFrame(resizeRaf.current);
      try {
        ro.disconnect();
      } catch {
        /* noop */
      }
      try {
        io.disconnect();
      } catch {
        /* noop */
      }
      if (engineRef.current) {
        engineRef.current.dispose();
      }
      engineRef.current = null;
    };
  }, []);

  return (
    <div className="heroLiquidWrapper">
      <div ref={mountRef} className="liquid-ether-container" />
    </div>
  );
});

export default HeroLiquidBackground;
