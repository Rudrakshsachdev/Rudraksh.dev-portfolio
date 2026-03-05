import { useEffect, useRef } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Achievements.module.css";

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENTS DATA
   ═══════════════════════════════════════════════════════ */

const ACHIEVEMENTS = [
    {
        icon: "🏆",
        title: "National Hackathon Winner",
        description: "Won HackTech Hackathon at Thapar Institute of Engineering & Technology with Team Path Predictors.",
        metadata: "Feb 2025 • HackTech",
        badge: "Winner"
    },
    {
        icon: "🥈",
        title: "2nd Runner-Up – Sustain-A-Thon 2025",
        description: "Secured 2nd runner-up position in AI/ML for Public Good theme among 600+ teams.",
        metadata: "Oct 2025 • Sharda University",
        badge: "Runner-up"
    },
    {
        icon: "🚀",
        title: "Top 30 Finalist – Paranox 2.0 Hackathon",
        description: "Selected among top 30 teams out of 20,000+ participants nationwide after a competitive 3-month process.",
        metadata: "Nov 2025 • Rishihood University",
        badge: "Finalist"
    },
    {
        icon: "🎤",
        title: "Event Lead – CODECRAFT 2026",
        description: "Led planning and execution of a university innovation event under the Center of Excellence in AI.",
        metadata: "Feb 2026 • IILM University",
        badge: "Leadership"
    },
    {
        icon: "💡",
        title: "Ideathon Leadership",
        description: "Led ideathon event focused on innovative problem solving and startup thinking among students.",
        metadata: "Nov 2025 • IILM University",
        badge: "Leadership"
    }
];

/* ═══════════════════════════════════════════════════════
   useScrollReveal
   ═══════════════════════════════════════════════════════ */
function useScrollReveal() {
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        refs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const setRef = (index) => (el) => {
        refs.current[index] = el;
    };

    return setRef;
}

/* ═══════════════════════════════════════════════════════
   AchievementCard
   ═══════════════════════════════════════════════════════ */
function AchievementCard({ data, refCallback, revealDelay }) {
    return (
        <article
            className={styles.card}
            ref={refCallback}
            style={{ transitionDelay: `${revealDelay}ms` }}
            tabIndex={0}
            aria-label={`Achievement: ${data.title}`}
        >
            {/* ── Top row: icon + badge ── */}
            <div className={styles.cardTop}>
                <div className={styles.iconWrap} aria-hidden="true">
                    <span className={styles.iconEmoji}>{data.icon}</span>
                </div>
                {data.badge && (
                    <span className={styles.badge}>{data.badge}</span>
                )}
            </div>

            {/* ── Title ── */}
            <h3 className={styles.title}>{data.title}</h3>

            {/* ── Description ── */}
            <p className={styles.description}>{data.description}</p>

            {/* ── Metadata ── */}
            {data.metadata && (
                <div className={styles.metadataWrap}>
                    <span className={styles.metadata}>{data.metadata}</span>
                </div>
            )}
        </article>
    );
}

/* ═══════════════════════════════════════════════════════
   Achievements — main section
   ═══════════════════════════════════════════════════════ */
function Achievements() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    return (
        <section
            className={styles.achievements}
            id="achievements"
            aria-labelledby="achievements-heading"
        >
            {/* ── GridLines Background ── */}
            <div className={styles.gridBg}>
                <GridLines size={40} opacity={0.15} thickness={1} maskType="radial" />
            </div>

            <div className={styles.container}>
                {/* ── Header ── */}
                <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                    <span className={styles.label}>
                        <span className={styles.dot} aria-hidden="true" />
                        ACHIEVEMENTS
                        <span className={styles.dot} aria-hidden="true" />
                    </span>
                    <h2 className={styles.sectionHeading} id="achievements-heading">
                        Milestones &amp; Impact
                    </h2>
                    <p className={styles.sectionSub}>
                        Recognitions that reflect innovation, leadership, and impact through technology at national-level hackathons and leading university events.
                    </p>
                </div>

                {/* ── Grid ── */}
                <div className={styles.grid}>
                    {ACHIEVEMENTS.map((item, i) => (
                        <AchievementCard
                            key={item.title}
                            data={item}
                            refCallback={setRef(refIndex++)}
                            revealDelay={i * 80}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Achievements;
