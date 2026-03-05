import { useEffect, useRef, useCallback } from "react";
import styles from "./ResearchDetailModal.module.css";

/* ═══════════════════════════════════════════════════════
   ResearchDetailModal — overlay with staggered content
   ═══════════════════════════════════════════════════════ */

function ResearchDetailModal({ data, onClose }) {
    const overlayRef = useRef(null);
    const panelRef = useRef(null);

    /* ── Close on Escape key ── */
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden"; /* prevent bg scroll */
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [handleKeyDown]);

    /* ── Stagger reveal for sections ── */
    useEffect(() => {
        const sections = panelRef.current?.querySelectorAll(
            `.${styles.section}`
        );
        if (!sections) return;
        sections.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add(styles.sectionVisible);
            }, 120 + i * 80);
        });
    }, []);

    /* ── Close when clicking overlay bg ── */
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    if (!data) return null;

    /* Build detail sections from data */
    const sections = [];

    if (data.conferenceName || data.organizationName) {
        sections.push({
            label: "CONFERENCE",
            icon: "🏛️",
            content: (
                <>
                    {data.conferenceName && (
                        <p className={styles.sectionText}>
                            <strong>{data.conferenceName}</strong>
                        </p>
                    )}
                    {data.organizationName && (
                        <p className={styles.sectionMuted}>{data.organizationName}</p>
                    )}
                </>
            ),
        });
    }

    sections.push({
        label: "ABSTRACT",
        icon: "📝",
        content: <p className={styles.sectionText}>{data.abstract}</p>,
    });

    if (data.problemStatement) {
        sections.push({
            label: "PROBLEM STATEMENT",
            icon: "🔍",
            content: <p className={styles.sectionText}>{data.problemStatement}</p>,
        });
    }

    if (data.proposedSolution) {
        sections.push({
            label: "PROPOSED SOLUTION",
            icon: "💡",
            content: <p className={styles.sectionText}>{data.proposedSolution}</p>,
        });
    }

    if (data.novelty) {
        sections.push({
            label: "NOVELTY & CONTRIBUTION",
            icon: "⚡",
            content: <p className={styles.sectionText}>{data.novelty}</p>,
        });
    }

    return (
        <div
            className={styles.overlay}
            ref={overlayRef}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-label={`Research detail: ${data.title}`}
        >
            <div className={styles.panel} ref={panelRef}>
                {/* ── Close button ── */}
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Close research detail"
                >
                    ✕
                </button>

                {/* ── Header ── */}
                <div className={`${styles.section} ${styles.headerSection}`}>
                    <div className={styles.headerTop}>
                        <div className={styles.iconWrap} aria-hidden="true">
                            <span className={styles.iconEmoji}>{data.icon}</span>
                        </div>
                        <span className={styles.categoryBadge}>{data.category}</span>
                    </div>
                    <h2 className={styles.title}>{data.title}</h2>

                    {/* Tags */}
                    <div className={styles.tagsWrap}>
                        {data.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className={styles.divider} />

                {/* ── Content sections ── */}
                {sections.map((sec) => (
                    <div key={sec.label} className={styles.section}>
                        <div className={styles.sectionLabel}>
                            <span className={styles.sectionIcon} aria-hidden="true">
                                {sec.icon}
                            </span>
                            {sec.label}
                        </div>
                        {sec.content}
                    </div>
                ))}

                {/* ── Action links ── */}
                {(data.links.paper || data.links.project || data.links.github) && (
                    <>
                        <div className={styles.divider} />
                        <div className={`${styles.section} ${styles.actionsSection}`}>
                            {data.links.paper && (
                                <a
                                    href={data.links.paper}
                                    className={styles.actionBtn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📑 View Paper
                                </a>
                            )}
                            {data.links.project && (
                                <a
                                    href={data.links.project}
                                    className={styles.actionBtn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    🔗 View Project
                                </a>
                            )}
                            {data.links.github && (
                                <a
                                    href={data.links.github}
                                    className={styles.actionBtn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ⌨️ GitHub
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ResearchDetailModal;
