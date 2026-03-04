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
        category: "Web Application",
        title: "Travel Professor – Smart Travel Planning Platform",
        description:
            "Travel Professor is a full-stack travel agency platform built with React and Django (Django REST Framework). The application allows users to explore curated travel packages, submit enquiries, book trips, and share reviews, while an integrated admin dashboard enables seamless management of trips, bookings, users, and platform data.",
        duration: "2 months",
        problem:
            "Planning and booking trips often requires users to navigate multiple platforms for discovering destinations, managing bookings, reading reviews, and contacting travel agencies. This fragmented experience makes trip planning inefficient and difficult to manage in a single place.",
        role: "Developed the product end-to-end as a freelance developer, including system architecture implementation, AI chatbot integration, and payment workflow development.",
        impact:
            "Successfully launched the platform, enabling users to plan and book trips seamlessly through a unified interface. The admin dashboard streamlined travel agency operations, improving efficiency and customer experience.",
        tech: ["React", "Django", "REST Framework", "PostgreSQL", "OpenAI API", "Razorpay", "JWT", "Cloudinary", "Vercel", "Render", "Resend", "Stripe", "Tailwind CSS", "Framer Motion", "EmailGrid API"],
        liveUrl: "https://travelprofessor.vercel.app/",
        githubUrl: "https://github.com/Rudrakshsachdev/TravelSource",
        featured: true,
        gradient:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    },
    {
        icon: "🤖",
        category: "AI / ML",
        title: "NeuroParse – AI-Powered Resume Analysis and Optimization Platform",
        description:
            "An AI-powered Django application that parses PDF/DOCX resumes using NLP and regex techniques, extracts candidate information, evaluates profiles through a structured scoring algorithm, and provides AI-driven resume optimization, job matching, and intelligent feedback.",
        duration: "3 months",
        problem:
            "Resume parsing is a time-consuming and error-prone process that requires manual extraction of information from resumes. This can lead to delays in the hiring process and may result in missed opportunities for both candidates and employers.",
        role: "Developed the product end-to-end as a freelance developer, including system architecture implementation, AI chatbot integration, and payment workflow development.",
        impact:
            "Successfully launched the platform, enabling users to plan and book trips seamlessly through a unified interface. The admin dashboard streamlined travel agency operations, improving efficiency and customer experience.",
        tech: ["Python", "Django", "NLP", "spaCy","Google Gemini", "Named Entity Recognition(NER)", "Bootstrap", "EmailGrid API"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
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