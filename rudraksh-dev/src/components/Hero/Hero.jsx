import styles from "./Hero.module.css";
import CubeScene from "../3d/CubeScene";
import RippleGrid from "./RippleGrid";

function Hero() {
  return (
    <section className={styles.hero}>
      {/* ── Ripple grid background — absolute layer behind everything ── */}
      <RippleGrid
        gridColor="#3b82f6"
        rippleIntensity={0.04}
        gridSize={12.0}
        gridThickness={18.0}
        fadeDistance={1.8}
        vignetteStrength={2.5}
        glowIntensity={0.08}
        opacity={0.6}
        mouseInteraction
        mouseInteractionRadius={1.2}
      />

      <div className={styles.container}>
        {/* ── Left column — copy + CTA ── */}
        <div className={styles.left}>
          <p className={styles.badge}>AI Systems Engineer</p>

          <h1 className={styles.heading}>
            I Engineer Intelligent Systems
            <br />
            That Scale.
          </h1>

          <p className={styles.subtext}>
            Building production-grade AI systems, scalable backend architectures, and high-performance frontend experiences.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>View Work</button>

            <button className={styles.secondaryBtn}>Contact</button>
          </div>
        </div>

        {/* ── Right column — 3D cube ── */}
        <div className={styles.right}>
          <div className={styles.cubeContainer}>
            <CubeScene />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
