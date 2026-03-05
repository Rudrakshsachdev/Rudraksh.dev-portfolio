import React from 'react';
import './GridLines.css';

/**
 * GridLines Component
 * Provides a futuristic, strong white grid background.
 * Optimized with CSS background-image gradients.
 */
const GridLines = ({
    size = 40,
    opacity = 0.15,
    color = "rgba(255, 255, 255, " + opacity + ")",
    maskType = "radial" // 'radial' or 'none'
}) => {
    const gridStyle = {
        backgroundImage: `
      linear-gradient(to right, ${color} 1px, transparent 1px),
      linear-gradient(to bottom, ${color} 1px, transparent 1px)
    `,
        backgroundSize: `${size}px ${size}px`,
    };

    return (
        <div className="grid-lines-container" aria-hidden="true">
            <div
                className={`grid-lines-overlay ${maskType === 'radial' ? 'mask-radial' : ''}`}
                style={gridStyle}
            />
        </div>
    );
};

export default GridLines;
