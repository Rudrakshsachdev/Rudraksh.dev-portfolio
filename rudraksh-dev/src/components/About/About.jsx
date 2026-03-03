import { useEffect, useRef } from "react";
import styles from "./About.module.css";
import ElectricBorder from "./ElectricBorder";

/* ═══════════════════════════════════════════════════════
   DATA — cards & timeline kept at module level
   for clean separation from rendering logic
   ═══════════════════════════════════════════════════════ */

const SKILLS = [
    {
        icon: "⚙️",
        title: "AI / ML Engineering",
        pills: ["Python", "TensorFlow", "PyTorch", "LangChain", "OpenAI"],
    },
    {
        icon: "🖥️",
        title: "Frontend Systems",
        pills: ["React", "Next.js", "Three.js", "Framer Motion", "CSS"],
    },
    {
        icon: "🛠️",
        title: "Backend & Infra",
        pills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Docker"],
    },
    {
        icon: "📐",
        title: "System Design",
        pills: ["Microservices", "REST", "GraphQL", "CI/CD", "AWS"],
    },
];

const TIMELINE = [
    {
        year: "2024",
        icon: "🚀",
        role: "AI Systems Engineer",
        subtitle: "Freelance & Open Source",
        description:
            "Building production-grade AI applications and scalable full-stack architectures for startups and enterprises.",
    },
    {
        year: "2023",
        icon: "🎓",
        role: "Computer Science",
        subtitle: "University",
        description:
            "Deep-diving into machine learning, distributed systems, and software architecture principles.",
    },
    {
        year: "2022",
        icon: "💡",
        role: "Full-Stack Developer",
        subtitle: "Projects & Internships",
        description:
            "Shipping end-to-end web applications with a focus on performance, accessibility, and clean code.",
    },
];

/* ═══════════════════════════════════════════════════════
   useScrollReveal — lightweight intersection observer
   Adds a CSS class when elements scroll into view
   ═══════════════════════════════════════════════════════ */
function useScrollReveal() {
    const refs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                        observer.unobserve(entry.target); /* animate once */
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        refs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    /* Returns a ref callback for indexed elements */
    const setRef = (index) => (el) => {
        refs.current[index] = el;
    };

    return setRef;
}

/* ═══════════════════════════════════════════════════════
   About — main component
   ═══════════════════════════════════════════════════════ */
function About() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    return (
        <section className={styles.about} id="about">
            {/* ── 1. Section Header ── */}
            <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                <span className={styles.label}>
                    <span className={styles.dot} />
                    ABOUT
                    <span className={styles.dot} />
                </span>
                <h2 className={styles.sectionHeading}>The Short Version</h2>
            </div>

            {/* ── 2. Description Block ── */}
            <div className={styles.descriptionBlock} ref={setRef(refIndex++)}>
                <p className={styles.descParagraph}>
                    I specialize in building{" "}
                    <span className={styles.highlight}>production-grade AI systems</span>{" "}
                    and scalable full-stack architectures. My work focuses on{" "}
                    <span className={styles.highlight}>performance</span>,{" "}
                    <span className={styles.highlight}>maintainability</span>, and
                    structured engineering principles.
                </p>

                <p className={styles.descParagraph}>
                    From{" "}
                    <span className={styles.highlight}>machine learning pipelines</span>{" "}
                    to responsive frontend systems, I approach every project with
                    system-level thinking and a strong emphasis on{" "}
                    <span className={styles.highlight}>clean architecture</span>.
                </p>

                <p className={styles.descStatement}>
                    I don't just write code — I design systems.
                </p>
            </div>

            {/* ── 3. CTA Links ── */}
            <div className={styles.ctaLinks} ref={setRef(refIndex++)}>
                <a href="#work" className={styles.ctaLink}>
                    View my work
                    <span className={styles.arrow}>→</span>
                </a>
                <a href="#contact" className={styles.ctaLink}>
                    Get in touch
                    <span className={styles.arrow}>→</span>
                </a>
            </div>

            {/* ── Soft divider ── */}
            <div className={styles.divider} />

            {/* ── 4. What I Work With — Cards Grid ── */}
            <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                <span className={styles.label}>
                    <span className={styles.dot} />
                    EXPERTISE
                    <span className={styles.dot} />
                </span>
                <h3 className={styles.sectionSubheading}>What I Work With</h3>
            </div>

            <div className={styles.cardsGrid}>
                {SKILLS.map((skill, i) => (
                    <ElectricBorder
                        key={skill.title}
                        color="#7df9ff"
                        speed={0.6}
                        chaos={0.08}
                        borderRadius={16}
                    >
                        <div
                            className={styles.card}
                            ref={setRef(refIndex++)}
                        >
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}>{skill.icon}</span>
                                <h4 className={styles.cardTitle}>{skill.title}</h4>
                            </div>
                            <div className={styles.pillsWrap}>
                                {skill.pills.map((pill) => (
                                    <span key={pill} className={styles.pill}>
                                        {pill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </ElectricBorder>
                ))}
            </div>

            {/* ── Soft divider ── */}
            <div className={styles.divider} />

            {/* ── 5. My Journey Timeline ── */}
            <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                <span className={styles.label}>
                    <span className={styles.dot} />
                    JOURNEY
                    <span className={styles.dot} />
                </span>
                <h3 className={styles.sectionSubheading}>My Journey</h3>
            </div>

            <div className={styles.timeline}>
                {TIMELINE.map((item, i) => (
                    <ElectricBorder
                        key={item.year}
                        color="#7df9ff"
                        speed={0.6}
                        chaos={0.08}
                        borderRadius={16}
                    >
                        <div
                            className={styles.timelineCard}
                            ref={setRef(refIndex++)}
                        >
                            <div className={styles.timelineBadge}>
                                <span className={styles.timelineIcon}>{item.icon}</span>
                                <span className={styles.timelineYear}>{item.year}</span>
                            </div>
                            <h4 className={styles.timelineRole}>{item.role}</h4>
                            <p className={styles.timelineSubtitle}>{item.subtitle}</p>
                            <p className={styles.timelineDesc}>{item.description}</p>
                        </div>
                    </ElectricBorder>
                ))}
            </div>
        </section>
    );
}

export default About;