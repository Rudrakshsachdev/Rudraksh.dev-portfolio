import { useEffect, useRef } from "react";
import styles from "./Portfolio.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import ElectricSpotlightCard from "../About/ElectricSpotlightCard";

/* ═══════════════════════════════════════════════════════
   PROJECTS DATA
   ═══════════════════════════════════════════════════════ */

const PROJECTS = [
    {
        icon: "🚗",
        category: "MOBILE APP",
        title: "Torq — AI Emergency Vehicle Support",
        description:
            "On-demand roadside assistance platform connecting stranded drivers with service providers through AI matching and real-time tracking. Built as a startup, served 500+ users.",
        duration: "6 months",
        problem:
            "No unified real-time platform for emergency roadside service in remote areas",
        role: "Founded and led product development end-to-end — architecture, AI chatbot, payment flow",
        impact:
            "Served 500+ users · Modular microservice backend · Razorpay escrow integration",
        tech: ["React Native", "Node.js", "Firebase", "PostgreSQL", "OpenAI API", "Razorpay"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        gradient:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    },
    {
        icon: "🤖",
        category: "AI / ML",
        title: "AI-Powered Resume Analyzer",
        description:
            "NLP-based resume parsing and scoring system that evaluates candidate profiles against job descriptions using ML models.",
        duration: "3 months",
        tech: ["Python", "Flask", "TensorFlow", "spaCy", "React"],
        liveUrl: "#",
        githubUrl: "#",
        gradient:
            "linear-gradient(135deg, #0d1117 0%, #161b22 40%, #1f2937 100%)",
    },
    {
        icon: "🌐",
        category: "FULL-STACK",
        title: "Real-Time Collaborative Whiteboard",
        description:
            "Multi-user drawing canvas with real-time sync, room management, and export capabilities using WebSockets.",
        duration: "2 months",
        tech: ["React", "Node.js", "Socket.io", "Redis", "Canvas API"],
        githubUrl: "#",
        gradient:
            "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #1e1145 100%)",
    },
    {
        icon: "📊",
        category: "DATA ENGINEERING",
        title: "Stock Market Sentiment Dashboard",
        description:
            "Live sentiment analysis dashboard scraping financial news and social media, powered by NLP pipelines and interactive charts.",
        duration: "4 months",
        tech: ["Python", "Django", "PostgreSQL", "Chart.js", "NLTK"],
        liveUrl: "#",
        githubUrl: "#",
        gradient:
            "linear-gradient(135deg, #0a192f 0%, #112240 40%, #1d3557 100%)",
    },
    {
        icon: "🔒",
        category: "BACKEND",
        title: "Secure Auth Microservice",
        description:
            "Production-grade authentication service with JWT, OAuth2, rate-limiting, and role-based access control.",
        duration: "1 month",
        tech: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
        githubUrl: "#",
        gradient:
            "linear-gradient(135deg, #1b1b2f 0%, #1a1a3e 40%, #252550 100%)",
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
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
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
   Portfolio — main component
   ═══════════════════════════════════════════════════════ */
function Portfolio() {
    const setRef = useScrollReveal();
    let refIndex = 0;

    return (
        <section className={styles.portfolio} id="work">
            {/* ── Section Header ── */}
            <div className={styles.sectionHeader} ref={setRef(refIndex++)}>
                <span className={styles.label}>
                    <span className={styles.dot} />
                    PROJECTS
                    <span className={styles.dot} />
                </span>
                <h2 className={styles.sectionHeading}>Selected Work & Experiments</h2>
                <p className={styles.sectionSub}>
                    A collection of projects focused on AI systems, scalable backend
                    architecture, and modern web applications.
                </p>
            </div>

            {/* ── Projects Grid ── */}
            <div className={styles.grid}>
                {PROJECTS.map((project, i) => (
                    <div
                        key={project.title}
                        className={`${styles.gridItem} ${project.featured ? styles.gridItemFeatured : ""}`}
                        ref={setRef(refIndex++)}
                        style={{ transitionDelay: `${i * 0.08}s` }}
                    >
                        <ElectricSpotlightCard
                            color="#7df9ff"
                            speed={0.6}
                            chaos={0.08}
                            borderRadius={24}
                        >
                            <ProjectCard {...project} />
                        </ElectricSpotlightCard>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Portfolio;