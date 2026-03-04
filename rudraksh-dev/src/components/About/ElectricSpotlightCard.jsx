import { useState, useEffect, useMemo, memo } from 'react';
import SpotlightCard from './SpotlightCard';
import ElectricBorder from './ElectricBorder';
import './ElectricSpotlightCard.css';

/* ═══════════════════════════════════════════════════════
   useIsMobile — matchMedia hook (≤ 768 px)
   ═══════════════════════════════════════════════════════ */
function useIsMobile(breakpoint = 768) {
    const query = useMemo(() => `(max-width: ${breakpoint}px)`, [breakpoint]);

    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        const mql = window.matchMedia(query);
        const handler = (e) => setIsMobile(e.matches);

        mql.addEventListener('change', handler);
        setIsMobile(mql.matches);

        return () => mql.removeEventListener('change', handler);
    }, [query]);

    return isMobile;
}

/* ═══════════════════════════════════════════════════════
   ElectricSpotlightCard
   -------------------------------------------------------
   Hover on desktop, tap on mobile.
   Electric border animation only runs when active
   (isVisible prop pauses the canvas RAF loop).
   ═══════════════════════════════════════════════════════ */
const ElectricSpotlightCard = memo(function ElectricSpotlightCard({
    children,
    /* SpotlightCard props */
    spotlightColor = 'rgba(255, 255, 255, 0.25)',
    className = '',
    /* ElectricBorder props */
    color = '#7df9ff',
    speed = 0.6,
    chaos = 0.08,
    borderRadius = 24,
    /* Pass-through */
    style,
}) {
    const [isActive, setIsActive] = useState(false);
    const isMobile = useIsMobile();

    // Build CSS classes for the wrapper
    const wrapperClasses = [
        'electric-spotlight-wrapper',
        isActive ? 'electric-spotlight-active' : '',
        isMobile ? 'electric-spotlight-mobile' : '',
    ].filter(Boolean).join(' ');

    /* ── Desktop: hover ── */
    const handleMouseEnter = () => { if (!isMobile) setIsActive(true); };
    const handleMouseLeave = () => { if (!isMobile) setIsActive(false); };

    /* ── Mobile: tap to toggle ── */
    const handleTouchStart = () => { if (isMobile) setIsActive(true); };
    const handleTouchEnd = () => {
        if (isMobile) {
            // Keep glowing for a moment after lifting finger
            setTimeout(() => setIsActive(false), 1200);
        }
    };

    return (
        <div
            className={wrapperClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={style}
        >
            <ElectricBorder
                color={color}
                speed={speed}
                chaos={chaos}
                borderRadius={borderRadius}
                isVisible={isActive}
            >
                <SpotlightCard
                    className={className}
                    spotlightColor={spotlightColor}
                >
                    {children}
                </SpotlightCard>
            </ElectricBorder>
        </div>
    );
});

export default ElectricSpotlightCard;
