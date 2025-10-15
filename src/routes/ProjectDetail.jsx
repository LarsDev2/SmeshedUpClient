import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLight from "../components/NavbarLight";
import './ProjectDetail.css';
import FooterLight from "../components/FooterLight";
import NavbarWidth from "../components/NavbarWidth";

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true); // loader state
    const navigate = useNavigate();

    useEffect(() => {
        const startTime = Date.now();

        async function fetchProject() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`
                );
                const data = await res.json();
                setProject(data.data[0]); // first matching project

                // Ensure loader stays visible at least 1 second
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(200 - elapsed, 0);
                setTimeout(() => setLoading(false), remaining);
            } catch (err) {
                console.error("Error fetching project:", err);
                setLoading(false);
            }
        }

        fetchProject();
    }, [slug]);

    // Show full-screen loader while loading
    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!project) return <p>Project not found.</p>;

    const { name, media } = project;
    const words = name.split(" ");
    const lastWord = words.pop();
    const firstPart = words.join(" ");

    const playableMedia = media?.filter(
        (m) => m.mime.startsWith("image/") || m.mime === "video/mp4"
    );

    const handleShare = async () => {
        const pageUrl = window.location.href;
        const shareData = {
            title: project.name,
            text: project.description || "Check out this project!",
            url: pageUrl,
        };

        try {
            if (navigator.share) await navigator.share(shareData);
            else if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(pageUrl);
                alert("Link copied to clipboard!");
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = pageUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
            alert("Sharing failed. Please copy the link manually.");
        }
    };

    return (
        <>
            <NavbarLight />
            <div className='navbar-width'>
                <NavbarWidth />
            </div>
            <div className="layout layout-projects-detail">
                <div className="project-detail--first">
                    <div className="cover-wrapper">
                        {project.cover && (
                            project.cover.mime.startsWith("image/") ? (
                                <img
                                    src={`${import.meta.env.VITE_STRAPI_URL}${project.cover.url}`}
                                    alt={project.name}
                                    className="cover-img"
                                />
                            ) : project.cover.mime.startsWith("video/") ? (
                                <video
                                    src={`${import.meta.env.VITE_STRAPI_URL}${project.cover.url}`}
                                    className="cover-img"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : null
                        )}

                        <div className="top-actions">
                            <button className="back-btn" onClick={() => navigate(-1)}>
                                <ion-icon name="chevron-back-outline"></ion-icon>
                            </button>
                            <button className="share-btn" onClick={handleShare}>
                                <ion-icon name="share-outline"></ion-icon>
                            </button>
                        </div>
                    </div>

                    <div className="first-text">
                        <div>
                            <h6>
                                {firstPart} <span className="h6-highlight">{lastWord}</span>
                            </h6>
                            <p className="description">{project.description}</p>
                            <p className="subtitle">Briefing</p>
                            <p className="project-text">
                                {project.briefing.split("\n").map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                            <p className="subtitle">Info</p>
                            <p className="project-text">
                                {project.info.split("\n").map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                            <p className="note">{project.note}</p>
                            <ul className="links-list">
                                {project.figmalink && (
                                    <li>
                                        <a className="links-list--item" href={project.figmalink} target="_blank">
                                            <ion-icon name="logo-figma"></ion-icon>
                                        </a>
                                    </li>
                                )}
                                {project.websitelink && (
                                    <li>
                                        <a className="links-list--item" href={project.websitelink} target="_blank" >
                                            <ion-icon name="globe-outline"></ion-icon>
                                        </a>
                                    </li>
                                )}
                                {project.externlink && (
                                    <li>
                                        <a className="links-list--item" href={project.externlink} target="_blank" >
                                            <ion-icon name="link-outline"></ion-icon>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="media-gallery">
                            {playableMedia?.map((item) => {
                                const getMediaUrl = (media) => {
                                    if (!media) return '';

                                    if (media.url.startsWith('http')) {
                                        return media.url;
                                    }

                                    return `${import.meta.env.VITE_STRAPI_URL}${media.url}`;
                                };

                                const isImage = item.mime.startsWith("image/");
                                const isVideo = item.mime === "video/mp4";

                                return (
                                    <div key={item.id} className="media-item">
                                        {isImage && (
                                            <img
                                                src={getMediaUrl}
                                                alt={item.alternativeText || item.name}
                                                className="media-borders"
                                            />
                                        )}
                                        {isVideo && (
                                            <video className="media-borders" controls poster={getMediaUrl} >
                                                <source src={getMediaUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <FooterLight />
            </div>
        </>
    );
}
