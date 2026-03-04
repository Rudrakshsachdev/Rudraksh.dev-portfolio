import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import ResendCube from "./ResendCube";
import FloatingMotion from "./FloatingMotion";

/* ═══════════════════════════════════════════════════════
   CubeScene — top-level public component
   ─────────────────────────────────────────────────────
   Drop this into your Hero section. It handles:
   
   1. Normalized mouse position tracking (−1…+1)
   2. Mobile detection (disables parallax ≤768 px)
   3. The R3F <Canvas> with transparent background
   4. A cinematic multi-light rig matching Resend's
      strong top-right illumination
   5. HDR environment map ("city") for metallic reflections
   6. Contact shadows beneath the cube
   7. Composition: FloatingMotion → ResendCube
   ═══════════════════════════════════════════════════════ */

function CubeScene() {
    const mouse = useRef({ x: 0, y: 0 });
    const containerRef = useRef();
    const [isMobile, setIsMobile] = useState(false);

    /* ── Mobile detection on mount + resize ── */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    /* ── Track normalized mouse coordinates ──
       Maps pointer position to −1…+1 range relative
       to the container. Consumed by ResendCube for
       parallax tilt. */
    const handlePointerMove = (e) => {
        if (isMobile || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    return (
        <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            style={{ width: "100%", height: "100%", cursor: "default" }}
        >
            <Canvas
                /* ── Performance ──
                   DPR capped at 2 — avoids expensive rendering
                   on ultra-high-DPI screens. Mobile gets 1. */
                dpr={[1, isMobile ? 1 : 2]}
                gl={{
                    alpha: true,                /* transparent BG */
                    antialias: true,
                    powerPreference: "high-performance",
                }}
                /* ── Camera ──
                   Positioned slightly above and to the right to
                   match Resend's semi-isometric viewing angle.
                   FOV 35 gives a slightly telephoto feel that
                   reduces perspective distortion on the cube. */
                camera={{ position: [3, 2.5, 5], fov: 35 }}
                style={{ background: "transparent" }}
            >
                {/* ════════════════════════════════════
                   Cinematic Lighting Rig
                   ────────────────────────────────────
                   Designed to match Resend's strong
                   top-right directional look with a
                   bright highlight streak on the upper
                   face and soft fill everywhere else.
                   ════════════════════════════════════ */}

                {/* Ambient fill — prevents pure-black
                    shadow regions */}
                <ambientLight intensity={0.3} />

                {/* Key light — strong top-right, creates
                    the primary bright reflection on the
                    upper face of the cube */}
                <directionalLight
                    position={[5, 8, 5]}
                    intensity={1.5}
                    color="#ffffff"
                />

                {/* Secondary fill — softer front-left
                    light that reveals the left face */}
                <directionalLight
                    position={[-3, 2, 4]}
                    intensity={0.4}
                    color="#e0e0ff"
                />

                {/* Rim / back light — catches far edges
                    to separate the cube from the dark bg */}
                <pointLight
                    position={[4, -1, -5]}
                    intensity={0.5}
                    color="#ffffff"
                    distance={12}
                    decay={2}
                />

                {/* Low fill from below — subtle uplighting
                    lifts the bottom face so it's not fully
                    black, adds the faint warm tint seen on
                    Resend's render */}
                <pointLight
                    position={[0, -5, 3]}
                    intensity={0.2}
                    color="#ffeedd"
                    distance={8}
                    decay={2}
                />

                {/* ════════════════════════════════════
                   Scene Content
                   ════════════════════════════════════ */}
                <Suspense fallback={null}>
                    {/* HDR environment for realistic
                        metallic reflections — "city" preset
                        provides urban-like reflection maps
                        without loading a custom HDR file */}
                    <Environment preset="city" />

                    {/* Contact shadow — soft shadow pool
                        beneath the cube, matching the subtle
                        floor shadow visible on Resend's hero */}
                    <ContactShadows
                        position={[0, -1.5, 0]}
                        opacity={0.4}
                        scale={6}
                        blur={2.5}
                        far={4}
                        color="#000000"
                    />

                    {/* FloatingMotion adds bob + drift,
                        ResendCube handles the 27-cube
                        geometry + rotation + parallax */}
                    <FloatingMotion>
                        <ResendCube mouse={mouse} isMobile={isMobile} />
                    </FloatingMotion>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default CubeScene;
