import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════
   Theme-matched color constants (from variable.css)
   ═══════════════════════════════════════════════════════ */
const ACCENT = "#3b82f6";
const ACCENT_DIM = "#2563eb";
const ACCENT_GLOW = "#60a5fa";

/* ════════════════════════════════════════════
   OrbScene — the main 3D composition
   Runs inside the R3F <Canvas> context
   ════════════════════════════════════════════ */
function OrbScene({ mouse, isMobile }) {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();

        /* ── Continuous slow rotation ── */
        groupRef.current.rotation.y += 0.003;
        groupRef.current.rotation.x += 0.001;

        /* ── Floating bob (sine wave) ── */
        groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;

        /* ── Pulsing scale — subtle 3 % ── */
        const s = 1 + Math.sin(t * 0.8) * 0.03;
        groupRef.current.scale.set(s, s, s);

        /* ── Mouse parallax (desktop only) ── */
        if (!isMobile) {
            const targetRotX = mouse.current.y * 0.3;
            const targetRotY = mouse.current.x * 0.3;
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                groupRef.current.rotation.x + targetRotX * 0.01,
                0.05
            );
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                groupRef.current.rotation.y + targetRotY * 0.01,
                0.05
            );
        }
    });

    /* Geometry detail — lower on mobile for perf */
    const detail = isMobile ? 1 : 2;

    return (
        <group ref={groupRef}>
            {/* ── Inner core sphere — glass-like accent orb ── */}
            <mesh>
                <icosahedronGeometry args={[1.0, detail]} />
                <MeshDistortMaterial
                    color={ACCENT}
                    emissive={ACCENT_DIM}
                    emissiveIntensity={0.25}
                    metalness={0.6}
                    roughness={0.15}
                    transparent
                    opacity={0.85}
                    distort={0.25}
                    speed={1.5}
                />
            </mesh>

            {/* ── Wireframe shell — floating grid mesh ── */}
            <mesh>
                <icosahedronGeometry args={[1.28, 1]} />
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.07}
                />
            </mesh>

            {/* ── Outer wireframe halo ── */}
            <mesh>
                <icosahedronGeometry args={[1.55, 1]} />
                <meshBasicMaterial
                    color={ACCENT}
                    wireframe
                    transparent
                    opacity={0.04}
                />
            </mesh>

            {/* ── Neon glow ring — thin torus at a tilt ── */}
            <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
                <torusGeometry args={[1.6, 0.012, 16, 100]} />
                <meshBasicMaterial
                    color={ACCENT_GLOW}
                    transparent
                    opacity={0.5}
                    toneMapped={false}
                />
            </mesh>

            {/* ── Second glow ring — perpendicular ── */}
            <mesh rotation={[-Math.PI / 5, Math.PI / 4, 0]}>
                <torusGeometry args={[1.45, 0.008, 16, 100]} />
                <meshBasicMaterial
                    color={ACCENT_GLOW}
                    transparent
                    opacity={0.3}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}

/* ════════════════════════════════════════════
   AIOrb3D — public component
   Renders the Canvas + lighting + scene
   ════════════════════════════════════════════ */
function AIOrb3D() {
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
                    alpha: true,               /* transparent background */
                    antialias: true,
                    powerPreference: "high-performance",
                }}
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                style={{ background: "transparent" }}
            >
                {/* ── Lighting rig ── */}

                {/* Ambient fill — keeps surfaces from going full black */}
                <ambientLight intensity={0.3} />

                {/* Key light — top right, warm white */}
                <directionalLight
                    position={[4, 4, 3]}
                    intensity={1.5}
                    color="#ffffff"
                />

                {/* Accent point light — blue neon edge glow */}
                <pointLight
                    position={[-2, 1, 3]}
                    intensity={2}
                    color={ACCENT_GLOW}
                    distance={8}
                    decay={2}
                />

                {/* Rim light — subtle back fill */}
                <pointLight
                    position={[2, -2, -3]}
                    intensity={0.6}
                    color={ACCENT_DIM}
                    distance={6}
                    decay={2}
                />

                <Suspense fallback={null}>
                    <Float
                        speed={1.2}
                        rotationIntensity={0.15}
                        floatIntensity={0.3}
                        floatingRange={[-0.05, 0.05]}
                    >
                        <OrbScene mouse={mouse} isMobile={isMobile} />
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default AIOrb3D;
