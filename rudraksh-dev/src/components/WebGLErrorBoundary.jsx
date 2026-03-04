import { Component } from "react";

/* ═══════════════════════════════════════════════════════
   WebGLErrorBoundary
   -------------------------------------------------------
   React error boundary that catches WebGL context creation
   failures from children (e.g. R3F <Canvas>). Renders
   nothing instead of crashing the page.
   ═══════════════════════════════════════════════════════ */
class WebGLErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.warn("WebGLErrorBoundary: WebGL unavailable, hiding component.", error.message);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || null;
        }
        return this.props.children;
    }
}

/* ── Check if WebGL is available at all ── */
export function isWebGLAvailable() {
    try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        return !!gl;
    } catch {
        return false;
    }
}

export default WebGLErrorBoundary;
