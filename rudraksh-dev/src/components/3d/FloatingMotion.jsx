import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/* ═══════════════════════════════════════════════════════
   FloatingMotion — ambient floating animation wrapper
   ─────────────────────────────────────────────────────
   Wraps any 3D children in a <group> that animates:
   • Vertical sine-wave bob (±0.15 units)
   • Very subtle Z-axis rotation drift
   • Breathing scale pulse (±2 %)
   
   Each animation uses a different sine frequency to
   prevent mechanical-looking synchronization and create
   an organic, floating-in-space feel.
   ═══════════════════════════════════════════════════════ */

function FloatingMotion({ children }) {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();

        /* ── Vertical bob ──
           Slow sine wave at 0.6 Hz moves the entire
           cube assembly ±0.15 units on the Y axis. */
        groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;

        /* ── Rotation drift ──
           Extremely subtle Z-axis wobble prevents the
           motion from feeling purely mechanical. */
        groupRef.current.rotation.z += Math.sin(t * 0.3) * 0.0005;

        /* ── Breathing scale ──
           A 2% oscillation at a different frequency
           than the bob gives the cube a "breathing" feel. */
        const s = 1 + Math.sin(t * 0.7) * 0.02;
        groupRef.current.scale.set(s, s, s);
    });

    return <group ref={groupRef}>{children}</group>;
}

export default FloatingMotion;
