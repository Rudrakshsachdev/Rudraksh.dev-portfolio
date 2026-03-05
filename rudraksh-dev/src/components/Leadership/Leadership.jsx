import { useEffect, useRef } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Leadership.module.css";

/* ═══════════════════════════════════════════════════════
   LEADERSHIP DATA
   ═══════════════════════════════════════════════════════ */

const LEADERSHIP = [
    {
        icon: "🏆",
        role: "Team Lead – Hack-Tech National Hackathon",
        org: "Thapar Institute of Engineering & Technology",
        duration: "Feb 2025",
        description:
            "Led a multidisciplinary team to develop an AI-powered accident prediction system. Coordinated architecture decisions, delegated modules, and presented the solution to a panel of industry judges.",
        highlights: [
            "Secured 1st place nationally",
            "Designed end-to-end system architecture",
            "Managed cross-functional team under 24-hour deadline",
        ],
    },
    {
        icon: "🥈",
        role: "Team Lead - SUSTAINATHON 2025",
        org: "Sharda University, Greater Noida",
        duration: "Oct 2025",
        description:
            "Led Team Path Predictors at SUSTAIN-A-THON 2025 hosted by Sharda University, where we developed TriNetraAI, an AI-powered women safety platform designed for intelligent safe-zoning, real-time alerts, and rapid emergency response. Among 600+ participating teams, our project ranked 23rd overall, reached the Top 50 finalists, and secured 2nd Runner-up in the AI/ML for Public Good category.",
        highlights: [
            "Secured 2nd place nationally",
            "Designed end-to-end system architecture",
            "Managed cross-functional team under 24-hour deadline",
        ],
    },
    {
        icon: "🚀",
        role: "Team Lead - Paranox 2.0 Hackathon",
        org: "TechxNinjas, Newton School of Technology, Rishihood University",
        duration: "Nov 2025",
        description: "Served as Team Lead of Team Path Predictors from IILM University at Paranox 2.0 National Hackathon organized by TechXNinjas at Newton School of Technology, Rishihood University. After a competitive three-month selection process, our team advanced from 1,552 project submissions and 20,119 participants to the Top 40 finalists, competing in the 24-hour grand finale and gaining valuable experience in rapid innovation, collaboration, and real-world problem solving.",
        highlights: [
            "Led Team Path Predictors through a three-month multi-stage selection process at Paranox 2.0 National Hackathon.",
            "Advanced from 1,552 project submissions and 20,119 participants to the Top 40 finalists.",
            "Competed in the 24-hour grand finale, gaining valuable experience in rapid innovation, collaboration, and real-world problem solving.",
        ],
    },
    {
        icon: "🛡️",
        role: "Core Developer – TriNetra AI",
        org: "AI Safety & Surveillance Platform",
        duration: "Sep 2025 – Present",
        description:
            "Building an AI-powered safety platform that uses computer vision, geospatial analytics, and real-time video processing for proactive threat detection and emergency response.",
        highlights: [
            "Secured 2nd place — SUSTAINATHON 2025",
            "Integrated real-time violence detection pipeline",
            "Designed emergency alert & safe-route system",
        ],
    },
    {
        icon: "📄",
        role: "Project Lead – Smart Resume Parser",
        org: "NeuroParse – AI Resume Analysis",
        duration: "3 months",
        description:
            "Designed and built an NLP-based resume analysis platform integrating AI-driven scoring, job matching, and intelligent feedback for resume optimisation.",
        highlights: [
            "Built NLP extraction pipeline (spaCy + NER)",
            "Integrated Google Gemini for AI feedback",
            "Structured scoring algorithm for candidate ranking",
        ],
    },
    {
        icon: "🎓",
        role: "Technical Lead – FacultyConnect Portal",
        org: "IILM University, Gurugram",
        duration: "3 months",
        description:
            "Developed an institutional faculty management portal from scratch using Django, enabling structured research submission workflows with role-based review by cluster heads and the dean.",
        highlights: [
            "Full-stack architecture & deployment",
            "Role-based access control system",
            "Automated research submission pipeline",
        ],
    },
    {
        icon: "🏛️",
        role: "President – AIGNITE Club",
        org: "IILM University, Gurugram",
        duration: "2025 – Present",
        description:
            "Leading the university's AI and Machine Learning club, driving technical culture through workshops, hackathon prep sessions, speaker series, and collaborative open-source projects.",
        highlights: [
            "Organised 5+ technical workshops & events",
            "Mentored juniors in AI/ML fundamentals",
            "Built an active community of 50+ members",
        ],
    },
    {
        icon: "💡",
        role: "Open-Source Contributor – GSSoC 2025",
        org: "GirlScript Summer of Code",
        duration: "2025",
        description:
            "Contributed to open-source projects as part of GirlScript Summer of Code, collaborating with maintainers to improve codebases, fix bugs, and add new features.",
        highlights: [
            "Contributed PRs across multiple repositories",
            "Collaborated with global open-source community",
            "Improved code quality & documentation",
        ],
    },
    {
        icon: "🎤",
        role: "Event Lead – CODECRAFT 2026 | From Idea to Implementation",
        org: "IILM University, Gurugram",
        duration: "Feb 2026",
        description: "Led CODECRAFT 2026, a student-driven innovation event organized under the Center of Excellence in AI, School of Computer Science & Engineering, IILM University. Managed the end-to-end execution of the event, including participant registrations, project shortlisting, judge coordination, and on-ground operations, while working closely with faculty mentors, volunteers, and student teams to ensure a seamless and impactful experience.",
        highlights: [
            "Led the planning and execution of CODECRAFT 2026, an innovation-focused student event at IILM University.",
            "Coordinated registrations, project shortlisting, judge evaluation, and event logistics.",
           "Managed cross-functional collaboration between faculty mentors, volunteers, and participants.",
        ],
    },
];

/* ═══════════════════════════════════════════════════════
   useScrollReveal — lightweight intersection observer
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
   LeadershipCard — reusable card component
   ═══════════════════════════════════════════════════════ */
function LeadershipCard({ data, refCallback, revealDelay }) {
    return (
        <article
            className={styles.card}
            ref={refCallback}
            style={{ transitionDelay: `${revealDelay}ms` }}
            tabIndex={0}
            aria-label={`Leadership: ${data.role}`}
        >
            {/* Ambient glow behind the card */}
            <div className={styles.cardGlow} aria-hidden="true" />

            {/* Icon */}
            <div className={styles.iconWrap} aria-hidden="true">
                <span className={styles.iconEmoji}>{data.icon}</span>
            </div>

            {/* Role */}
            <h3 className={styles.cardRole}>{data.role}</h3>

            {/* Org + Duration */}
            <div className={styles.meta}>
                <span className={styles.org}>{data.org}</span>
                <span className={styles.duration}>{data.duration}</span>
            </div>

            {/* Description */}
            <p className={styles.cardDesc}>{data.description}</p>

            {/* Highlights */}
            <div className={styles.highlights}>
                <span className={styles.highlightsLabel}>KEY HIGHLIGHTS</span>
                <ul className={styles.highlightsList} role="list">
                    {data.highlights.map((item) => (
                        <li key={item} className={styles.highlightItem}>
                            <span className={styles.bullet} aria-hidden="true">
                                ▸
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

/* ═══════════════════════════════════════════════════════
   Leadership — main section component
   ═══════════════════════════════════════════════════════ */
function Leadership() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    return (
        <section
            className={styles.leadership}
            id="leadership"
            aria-labelledby="leadership-heading"
        >
            {/* ── GridLines Background ── */}
            <div className={styles.gridBg}>
                <GridLines size={50} opacity={0.1} thickness={1} maskType="radial" />
            </div>

            {/* ── Ambient orbs ── */}
            <div className={styles.orbOne} aria-hidden="true" />
            <div className={styles.orbTwo} aria-hidden="true" />

            <div className={styles.container}>
                {/* ── Section Header ── */}
                <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                    <span className={styles.label}>
                        <span className={styles.dot} aria-hidden="true" />
                        LEADERSHIP
                        <span className={styles.dot} aria-hidden="true" />
                    </span>
                    <h2 className={styles.sectionHeading} id="leadership-heading">
                        Leadership &amp; Impact
                    </h2>
                    <p className={styles.sectionSub}>
                        Leading teams, winning hackathons, and building impactful projects —
                        from ideation to execution at national-level competitions and
                        real-world deployments.
                    </p>
                </div>

                {/* ── Cards Grid ── */}
                <div className={styles.grid}>
                    {LEADERSHIP.map((item, i) => (
                        <LeadershipCard
                            key={item.role}
                            data={item}
                            refCallback={setRef(refIndex++)}
                            revealDelay={i * 90}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Leadership;
