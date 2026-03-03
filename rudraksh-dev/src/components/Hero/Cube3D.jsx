import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Edges } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════
   Theme-matched color constants (from variable.css)
   ═══════════════════════════════════════════════════════ */
const ACCENT = "#3b82f6";
const ACCENT_GLOW = "#60a5fa";
const ACCENT_DIM = "#2563eb";

/* ════════════════════════════════════════════
   CubeScene — the main 3D composition
   Runs inside the R3F <Canvas> context
   ════════════════════════════════════════════ */
function CubeScene({ mouse, isMobile }) {
    const groupRef = useRef();
    const cubeRef = useRef();

    /* Smooth mouse target — we lerp toward this */
    const smoothMouse = useRef({ x: 0, y: 0 });

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();

        /* ── Continuous slow rotation ── */
        groupRef.current.rotation.y += 0.004;
        groupRef.current.rotation.x += 0.002;

        /* ── Floating bob — slow sine wave ── */
        groupRef.current.position.y = Math.sin(t * 0.5) * 0.12;

        /* ── Breathing scale — subtle 2.5% pulse ── */
        const s = 1 + Math.sin(t * 0.7) * 0.025;
        groupRef.current.scale.set(s, s, s);

        /* ── Mouse-based tilt (desktop only) ── */
        if (!isMobile) {
            /* Smoothly interpolate toward mouse target */
            smoothMouse.current.x = THREE.MathUtils.lerp(
                smoothMouse.current.x,
                mouse.current.x,
                0.04
            );
            smoothMouse.current.y = THREE.MathUtils.lerp(
                smoothMouse.current.y,
                mouse.current.y,
                0.04
            );

            /* Apply damped tilt as additional rotation */
            groupRef.current.rotation.x += smoothMouse.current.y * 0.008;
            groupRef.current.rotation.y += smoothMouse.current.x * 0.008;
        }
    });

    return (
        <group ref={groupRef}>
            {/* ── Primary glass cube ── */}
            <RoundedBox
                ref={cubeRef}
                args={[1.8, 1.8, 1.8]}  /* width, height, depth */
                radius={0.08}            /* subtle rounded corners */
                smoothness={4}
            >
                {/* Glass-like material — semi-transparent, reflective */}
                <meshPhysicalMaterial
                    color={ACCENT}
                    metalness={0.15}
                    roughness={0.08}
                    transparent
                    opacity={0.35}
                    transmission={0.6}     /* glass refraction */
                    thickness={0.5}
                    envMapIntensity={1.0}
                    clearcoat={1.0}
                    clearcoatRoughness={0.05}
                    side={THREE.DoubleSide}
                />

                {/* ── Thin glowing edges — neon accent ── */}
                <Edges
                    threshold={15}
                    scale={1.001}
                >
                    <lineBasicMaterial
                        color={ACCENT_GLOW}
                        transparent
                        opacity={0.6}
                        linewidth={1}
                    />
                </Edges>
            </RoundedBox>

            {/* ── Inner wireframe cube for depth ── */}
            <mesh>
                <boxGeometry args={[1.2, 1.2, 1.2]} />
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.05}
                />
            </mesh>

            {/* ── Outer wireframe shell — faint accent halo ── */}
            <mesh>
                <boxGeometry args={[2.4, 2.4, 2.4]} />
                <meshBasicMaterial
                    color={ACCENT}
                    wireframe
                    transparent
                    opacity={0.035}
                />
            </mesh>
        </group>
    );
}

/* ════════════════════════════════════════════
   Cube3D — public component
   Renders the Canvas + cinematic lighting
   ════════════════════════════════════════════ */
function Cube3D() {
    const mouse = useRef({ x: 0, y: 0 });
    const containerRef = useRef();
    const [isMobile, setIsMobile] = useState(false);

    /* ── Detect mobile on mount + resize ── */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    /* ── Track normalized mouse position ── */
    const handlePointerMove = (e) => {
        if (isMobile || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        /* Normalize to −1 … +1 range */
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
                dpr={[1, isMobile ? 1 : 1.5]}
                gl={{
                    alpha: true,                /* transparent background */
                    antialias: true,
                    powerPreference: "high-performance",
                }}
                camera={{ position: [0, 0, 5.5], fov: 40 }}
                style={{ background: "transparent" }}
            >
                {/* ── Cinematic lighting rig ── */}

                {/* Soft ambient fill */}
                <ambientLight intensity={0.35} />

                {/* Key light — top-right, creates primary highlights */}
                <directionalLight
                    position={[4, 5, 4]}
                    intensity={1.2}
                    color="#ffffff"
                />

                {/* Accent point light — blue neon edge glow */}
                <pointLight
                    position={[-3, 1, 3]}
                    intensity={2.5}
                    color={ACCENT_GLOW}
                    distance={10}
                    decay={2}
                />

                {/* Rim light — subtle back fill for depth */}
                <pointLight
                    position={[3, -2, -4]}
                    intensity={0.8}
                    color={ACCENT_DIM}
                    distance={8}
                    decay={2}
                />

                {/* Low fill from below for cinematic shadow lift */}
                <pointLight
                    position={[0, -4, 2]}
                    intensity={0.3}
                    color="#ffffff"
                    distance={6}
                    decay={2}
                />

                <Suspense fallback={null}>
                    <CubeScene mouse={mouse} isMobile={isMobile} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Cube3D;
