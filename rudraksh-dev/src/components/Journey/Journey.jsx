import { useEffect, useRef, useState } from "react";
import GridLines from "../GridLines/GridLines";
import styles from "./Journey.module.css";
import thapar from "../../assets/thapar.jpg"
import thaparTeam from "../../assets/thapar-team.jpg"
import symposium from "../../assets/symposium.jpg"
import engineers from "../../assets/engineers-day.jpg"
import sustainathon from "../../assets/sustainathon.jpg"
import saarthi from "../../assets/saarthi4.jpg"
import paranox from "../../assets/paranox.jpg"
import codecraft from "../../assets/codecraft.jpg"
import sict from "../../assets/sict-member.jpg"
/* ═══════════════════════════════════════════════════════
   JOURNEY DATA
   ═══════════════════════════════════════════════════════ */
const JOURNEY = [
    {
        id: 1,
        image: thapar,
        title: "HackTech Hackathon – Thapar Institute of Engineering & Technology",
        subtitle: "Winning the main track with Team Path Predictors",
        objectPosition: "center 20%" // Faces near the top
    },
    {
        id: 2,
        image: thaparTeam,
        title: "HackTech Hackathon – Thapar Institute of Engineering & Technology",
        subtitle: "Winning the main track with Team Path Predictors",
        objectPosition: "center 20%" // Group shot, faces up high
    },
    {
        id: 3,
        image: engineers,
        title: "Engineers Day Celebration",
        subtitle: "Participated in the Engineers Day Celebration organized by IILM University, Gurugram",
        objectPosition: "center center"
    },
    {
        id: 4,
        image: symposium,
        title: "Research Paper Presentation",
        subtitle: "Presenting findings on AI for Public Safety at international symposium held at IILM University, Gurugram",
        objectPosition: "center 30%" // Keep certificate and faces visible
    },
    {
        id: 5,
        image: sustainathon,
        title: "SUSTAIN-A-THON 2025",
        subtitle: "Secured 2nd Runner-up in the AI/ML for Public Good category",
        objectPosition: "center 60%" // This is the selfie shot, faces are at the bottom
    },
    {
        id: 6,
        image: saarthi,
        title: "Saarthi 2.0 Hackathon",
        subtitle: "Secured place in the top 30 teams out of 1000+ teams",
        objectPosition: "center 60%" // This is the selfie shot, faces are at the bottom
    },
    {
        id: 7,
        image: paranox,
        title: "Paranox 2.0 Hackathon",
        subtitle: "Secured place in the top 40 teams out of 1552 teams",
        objectPosition: "center 70%" // This is the selfie shot, faces are at the bottom
    },
    {
        id: 8,
        image: codecraft,
        title: "CODECRAFT 2026 | From Idea to Implementation",
        subtitle: "Event Lead for the CODECRAFT 2026 | From Idea to Implementation",
        objectPosition: "center 70%" // This is the selfie shot, faces are at the bottom
    },
    {
        id: 9,
        image: sict,
        title: "SICT Member",
        subtitle: "Member of the Student Industry Connect Team",
        objectPosition: "center 35%" // This is the selfie shot, faces are at the bottom
    }
];

/* ═══════════════════════════════════════════════════════
   Journey Section
   ═══════════════════════════════════════════════════════ */
function Journey() {
    const trackRef = useRef(null);
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Intersection Observer for Scroll Reveal of the whole section
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Intersection Observer to determine active centered item
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const index = Number(entry.target.dataset.index);
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: track,
                threshold: 0.5,
            }
        );

        const cards = track.querySelectorAll(`.${styles.card}`);
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    // Mouse Drag to Scroll logic
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - trackRef.current.offsetLeft);
        setScrollLeft(trackRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll speed multiplier
        trackRef.current.scrollLeft = scrollLeft - walk;
    };

    // Scroll to previous / next card
    const handleNav = (direction) => {
        if (!trackRef.current) return;
        const cardWidth = trackRef.current.querySelector(
            `.${styles.card}`
        ).offsetWidth;
        const scrollAmount = direction === "prev" ? -cardWidth : cardWidth;
        trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section
            className={styles.journey}
            id="journey"
            ref={sectionRef}
            aria-labelledby="journey-heading"
        >
            {/* Background elements */}
            <div className={styles.bgGlow} aria-hidden="true" />
            <div className={styles.gridBg}>
                <GridLines size={48} opacity={0.12} thickness={1} maskType="radial" />
            </div>

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.sectionHeader}>
                    <span className={styles.label}>
                        <span className={styles.dot} aria-hidden="true" />
                        GALLERY
                        <span className={styles.dot} aria-hidden="true" />
                    </span>
                    <h2 className={styles.sectionHeading} id="journey-heading">
                        Moments from My Journey
                    </h2>
                    <p className={styles.sectionSub}>
                        A glimpse into hackathons, innovation events, research presentations,
                        and experiences that shaped my engineering journey.
                    </p>
                </div>

                {/* Carousel Area */}
                <div className={styles.carouselWrapper}>
                    {/* Navigation Arrows */}
                    <button
                        className={`${styles.navBtn} ${styles.prevBtn}`}
                        onClick={() => handleNav("prev")}
                        aria-label="Previous image"
                        disabled={activeIndex === 0}
                    >
                        ←
                    </button>
                    <button
                        className={`${styles.navBtn} ${styles.nextBtn}`}
                        onClick={() => handleNav("next")}
                        aria-label="Next image"
                        disabled={activeIndex === JOURNEY.length - 1}
                    >
                        →
                    </button>

                    {/* Track */}
                    <div
                        className={`${styles.track} ${isDragging ? styles.dragging : ""}`}
                        ref={trackRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Added empty spacer blocks to allow the first and last card to visually center */}
                        <div className={styles.spacer} aria-hidden="true" />

                        {JOURNEY.map((item, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={item.id}
                                    data-index={index}
                                    className={`${styles.card} ${isActive ? styles.cardActive : ""
                                        }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={styles.image}
                                        draggable="false"
                                        style={{ objectPosition: item.objectPosition || "center center" }}
                                    />
                                    {/* Glass panel overlay for title */}
                                    <div className={styles.overlayPanel}>
                                        <h3 className={styles.cardTitle}>{item.title}</h3>
                                        {item.subtitle && (
                                            <p className={styles.cardSubtitle}>{item.subtitle}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className={styles.spacer} aria-hidden="true" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Journey;
