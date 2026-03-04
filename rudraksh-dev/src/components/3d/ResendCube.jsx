import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════
   ResendCube — 3×3×3 Rubik's-style cube
   ─────────────────────────────────────────────────────
   Recreates the Resend.com hero cube:
   • 27 individual rounded sub-cubes in a 3×3×3 grid
   • Dark metallic material with varied roughness per cube
   • Visible gaps between sub-cubes
   • Continuous slow auto-rotation on X and Y
   • Smooth mouse-parallax tilt on desktop (lerped)
   ═══════════════════════════════════════════════════════ */

/* ── Sub-cube dimensions ── */
const CUBE_SIZE = 0.52;         // Width/height/depth of each small cube
const GAP = 0.08;               // Gap between sub-cubes
const SPACING = CUBE_SIZE + GAP; // Center-to-center spacing
const RADIUS = 0.035;           // Corner bevel radius
const SMOOTHNESS = 4;           // Bevel tessellation

/* ── Generate the 27 cube positions and per-cube roughness ──
   We pre-compute these so they don't re-allocate each render.
   Each cube gets a slightly different roughness (0.12–0.45)
   to mimic the varied surface textures visible on Resend's
   cube (some faces smooth/glossy, others brushed/matte). */
function generateCubeData() {
    const cubes = [];
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                /* Pseudorandom roughness based on position —
                   deterministic so it doesn't change on re-render */
                const hash = Math.abs(x * 7 + y * 13 + z * 19) % 5;
                const roughness = 0.12 + hash * 0.07; // Range: 0.12 – 0.40

                cubes.push({
                    key: `${x}_${y}_${z}`,
                    position: [x * SPACING, y * SPACING, z * SPACING],
                    roughness,
                });
            }
        }
    }
    return cubes;
}

function ResendCube({ mouse, isMobile }) {
    const groupRef = useRef();

    /* Smoothed mouse target — lerped each frame for cinema-feel */
    const smoothMouse = useRef({ x: 0, y: 0 });

    /* Pre-compute cube positions + roughness once */
    const cubes = useMemo(() => generateCubeData(), []);

    useFrame(() => {
        if (!groupRef.current) return;

        /* ── Continuous slow auto-rotation ──
           Very slow Y spin + even slower X tumble.
           This matches the calm, mesmerizing rotation
           on Resend's hero. */
        groupRef.current.rotation.y += 0.003;
        groupRef.current.rotation.x += 0.001;

        /* ── Mouse parallax (desktop only) ──
           Smoothly lerp toward the normalized mouse
           position at factor 0.04, then apply as a
           small additive tilt */
        if (!isMobile) {
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

            groupRef.current.rotation.x += smoothMouse.current.y * 0.008;
            groupRef.current.rotation.y += smoothMouse.current.x * 0.008;
        }
    });

    return (
        <group ref={groupRef}>
            {cubes.map(({ key, position, roughness }) => (
                <RoundedBox
                    key={key}
                    args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]}
                    radius={RADIUS}
                    smoothness={SMOOTHNESS}
                    position={position}
                >
                    {/* ── Dark metallic material ──
                        Near-black color with full metalness and
                        environment-driven reflections. Each sub-cube
                        gets a slightly different roughness to create
                        the varied surface texture effect visible on
                        the Resend cube (smooth vs brushed faces). */}
                    <meshStandardMaterial
                        color="#111111"
                        metalness={0.95}
                        roughness={roughness}
                        envMapIntensity={1.2}
                    />
                </RoundedBox>
            ))}
        </group>
    );
}

export default ResendCube;
