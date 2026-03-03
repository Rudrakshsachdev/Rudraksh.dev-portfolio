import styles from "./Hero.module.css";
import Cube3D from "./Cube3D";
//import HeroBackground from "./HeroBackground";
import HeroLiquidBackground from "./HeroLiquidBackground";

function Hero() {
  return (
    <section className={styles.hero}>
      <HeroLiquidBackground />

      <div className={styles.container}>
        {/* ── Left column — copy + CTA ── */}
        <div className={styles.left}>
          <p className={styles.badge}>AI Systems Engineer</p>

          <h1 className={styles.heading}>
            I engineer intelligent systems
            <br />
            that scale.
          </h1>

          <p className={styles.subtext}>
            Building production-grade AI applications, scalable backend
            architectures, and performance-driven frontend systems.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>View Work</button>

            <button className={styles.secondaryBtn}>Contact</button>
          </div>
        </div>

        {/* ── Right column — 3D cube ── */}
        <div className={styles.right}>
          <div className={styles.cubeContainer}>
            <Cube3D />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
