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
   Always renders the SAME DOM structure:
     ElectricBorder → SpotlightCard → children

   The electric effects (canvas + glow layers) are hidden
   via CSS opacity when not hovered, and completely hidden
   on mobile.  This avoids unmounting/remounting children
   which would break scroll-reveal refs and cause flicker.
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
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile();

    // Build CSS classes for the wrapper
    const wrapperClasses = [
        'electric-spotlight-wrapper',
        isHovered && !isMobile ? 'electric-spotlight-active' : '',
        isMobile ? 'electric-spotlight-mobile' : '',
    ].filter(Boolean).join(' ');

    return (
        <div
            className={wrapperClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={style}
        >
            <ElectricBorder
                color={color}
                speed={speed}
                chaos={chaos}
                borderRadius={borderRadius}
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
