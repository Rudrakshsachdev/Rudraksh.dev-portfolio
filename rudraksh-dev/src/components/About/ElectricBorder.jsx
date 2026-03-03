// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN

import { useRef, useState, useEffect, useCallback, memo } from "react";
import styles from "./ElectricBorder.module.css";

/* ═══════════════════════════════════════════════════════
   ElectricBorder — animated glowing border wrapper
   ═══════════════════════════════════════════════════════
   Props:
     color      — glow color (default: theme accent cyan)
     speed      — animation speed multiplier (default: 0.6)
     chaos      — randomness in path offsets (default: 0.08)
     thickness  — border stroke width in px (default: 1.5)
     style      — additional inline styles (pass borderRadius here)
     children   — inner content
   ═══════════════════════════════════════════════════════ */

function ElectricBorder({
    color = "#7df9ff",
    speed = 0.6,
    chaos = 0.08,
    thickness = 1.5,
    style = {},
    children,
}) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    /* ── Detect mobile once on mount + resize ── */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    /* ── Animation loop — only runs when hovered & not mobile ── */
    useEffect(() => {
        if (!hovered || isMobile) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        /* Size canvas to match the wrapper (with padding for glow overshoot) */
        const rect = container.getBoundingClientRect();
        const pad = 6; /* extra space so glow doesn't clip */
        const cw = rect.width + pad * 2;
        const ch = rect.height + pad * 2;

        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        canvas.style.width = `${cw}px`;
        canvas.style.height = `${ch}px`;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const r = parseFloat(style.borderRadius) || 16;

        let startTime = performance.now();

        /* ── Draw one frame ── */
        const draw = (now) => {
            const elapsed = (now - startTime) * 0.001 * speed;

            ctx.clearRect(0, 0, cw, ch);

            /* Offset context so the rounded-rect is centered within padding */
            ctx.save();
            ctx.translate(pad, pad);

            /* Number of discrete points along the perimeter */
            const perimeter = 2 * (w + h - 4 * r) + 2 * Math.PI * r;
            const segments = Math.max(80, Math.floor(perimeter / 4));

            ctx.beginPath();
            ctx.lineWidth = thickness;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            for (let i = 0; i <= segments; i++) {
                const t = i / segments;

                /* Get base position along rounded-rect perimeter */
                const pos = getPerimeterPoint(t, w, h, r);

                /* Apply chaotic offset — sine waves at varying frequencies */
                const offset =
                    Math.sin(t * 30 + elapsed * 4) * chaos * 12 +
                    Math.sin(t * 50 - elapsed * 6) * chaos * 6 +
                    Math.sin(t * 80 + elapsed * 2.5) * chaos * 3;

                /* Normal direction for offset */
                const nx = pos.nx * offset;
                const ny = pos.ny * offset;

                const x = pos.x + nx;
                const y = pos.y + ny;

                /* Varying opacity along the path for the electric effect */
                const flicker =
                    0.4 +
                    0.6 *
                    (0.5 +
                        0.5 *
                        Math.sin(t * 20 + elapsed * 5 + Math.sin(elapsed * 1.5)));

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                /* We draw segments with varying alpha */
                if (i > 0 && i % 3 === 0) {
                    ctx.strokeStyle = hexToRgba(color, flicker * 0.8);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                }
            }

            ctx.closePath();
            ctx.strokeStyle = hexToRgba(color, 0.5);
            ctx.stroke();

            /* Soft outer glow layer on canvas */
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.globalAlpha = 0.25;

            ctx.beginPath();
            roundedRectPath(ctx, 0, 0, w, h, r);
            ctx.strokeStyle = color;
            ctx.lineWidth = thickness * 0.5;
            ctx.stroke();

            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            ctx.restore();

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [hovered, isMobile, color, speed, chaos, thickness, style.borderRadius]);

    const onEnter = useCallback(() => setHovered(true), []);
    const onLeave = useCallback(() => setHovered(false), []);

    /* Pass the color as a CSS variable for the glow layers */
    const wrapperStyle = {
        "--electric-border-color": color,
        borderRadius: style.borderRadius || 16,
        ...style,
    };

    return (
        <div
            ref={containerRef}
            className={styles.electricBorder}
            style={wrapperStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {/* ── Canvas — electric path animation (hover-only, desktop) ── */}
            {hovered && !isMobile && (
                <div className={styles.canvasContainer} style={{ width: "calc(100% + 12px)", height: "calc(100% + 12px)" }}>
                    <canvas ref={canvasRef} className={styles.canvas} />
                </div>
            )}

            {/* ── CSS glow layers (hover-only, desktop) ── */}
            {hovered && !isMobile && (
                <div className={styles.layers}>
                    <div className={styles.glow1} />
                    <div className={styles.glow2} />
                    <div className={styles.backgroundGlow} />
                </div>
            )}

            {/* ── Children — always rendered, never re-mounted ── */}
            <div className={styles.content}>{children}</div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   Utilities
   ═══════════════════════════════════════════════ */

/* Get a point + outward normal along a rounded-rect perimeter at parameter t (0–1) */
function getPerimeterPoint(t, w, h, r) {
    const topLen = w - 2 * r;
    const rightLen = h - 2 * r;
    const bottomLen = w - 2 * r;
    const leftLen = h - 2 * r;
    const cornerLen = (Math.PI / 2) * r;

    const perimeter =
        topLen + rightLen + bottomLen + leftLen + 4 * cornerLen;
    let d = t * perimeter;

    /* Top edge */
    if (d < topLen) {
        return { x: r + d, y: 0, nx: 0, ny: -1 };
    }
    d -= topLen;

    /* Top-right corner */
    if (d < cornerLen) {
        const a = d / r;
        return {
            x: w - r + Math.sin(a) * r,
            y: r - Math.cos(a) * r,
            nx: Math.sin(a),
            ny: -Math.cos(a),
        };
    }
    d -= cornerLen;

    /* Right edge */
    if (d < rightLen) {
        return { x: w, y: r + d, nx: 1, ny: 0 };
    }
    d -= rightLen;

    /* Bottom-right corner */
    if (d < cornerLen) {
        const a = d / r;
        return {
            x: w - r + Math.cos(a) * r,
            y: h - r + Math.sin(a) * r,
            nx: Math.cos(a),
            ny: Math.sin(a),
        };
    }
    d -= cornerLen;

    /* Bottom edge */
    if (d < bottomLen) {
        return { x: w - r - d, y: h, nx: 0, ny: 1 };
    }
    d -= bottomLen;

    /* Bottom-left corner */
    if (d < cornerLen) {
        const a = d / r;
        return {
            x: r - Math.sin(a) * r,
            y: h - r + Math.cos(a) * r,
            nx: -Math.sin(a),
            ny: Math.cos(a),
        };
    }
    d -= cornerLen;

    /* Left edge */
    if (d < leftLen) {
        return { x: 0, y: h - r - d, nx: -1, ny: 0 };
    }
    d -= leftLen;

    /* Top-left corner */
    const a = d / r;
    return {
        x: r - Math.cos(a) * r,
        y: r - Math.sin(a) * r,
        nx: -Math.cos(a),
        ny: -Math.sin(a),
    };
}

/* Draw a rounded-rect path (no stroke/fill) */
function roundedRectPath(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
}

/* Convert hex color to rgba string */
function hexToRgba(hex, alpha) {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default memo(ElectricBorder);
