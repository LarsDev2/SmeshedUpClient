import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLight from "../components/NavbarLight";
import FooterLight from "../components/FooterLight";
import NavbarWidth from "../components/NavbarWidth";
import "./ProjectDetail.css";

export default function PlaygroundDetail() {
    const { slug } = useParams();
    const [playground, setPlayground] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Helper to safely get media URL
    const getMediaUrl = (media) => {
        if (!media) return "";
        return media.url.startsWith("http")
            ? media.url
            : `${import.meta.env.VITE_STRAPI_URL.replace(/\/$/, "")}${media.url}`;
    };

    useEffect(() => {
        const fetchPlayground = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_STRAPI_URL.replace(/\/$/, "")}/api/playgrounds?filters[slug][$eq]=${slug}&populate=*`
                );
                const data = await res.json();
                setPlayground(data?.data?.[0] || null);
            } catch (err) {
                console.error("Error fetching playground:", err);
                setPlayground(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayground();
    }, [slug]);

    if (loading) return <div className="loader-overlay"><div className="spinner"></div></div>;
    if (!playground) return <p>Playground not found.</p>;

    const { name, media } = playground;
    const words = name.split(" ");
    const lastWord = words.pop();
    const firstPart = words.join(" ");

    // Filter playable media: images + mp4 only
    const playableMedia = media?.filter(
        (m) => m.mime.startsWith("image/") || m.mime === "video/mp4"
    );

    const handleShare = async () => {
        const pageUrl = window.location.href;

        const shareData = {
            title: playground.name,
            text: playground.description || "Check out this project!",
            url: pageUrl,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (navigator.clipboard && window.isSecureContext) {
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
            <div className="navbar-width">
                <NavbarWidth />
            </div>

            <div className="layout layout-projects-detail">
                <div className="project-detail--first">
                    {/* Cover */}
                    <div className="cover-wrapper">
                        {playground.cover?.mime?.startsWith("image/") && (
                            <img
                                src={getMediaUrl(playground.cover)}
                                alt={playground.name}
                                className="cover-img"
                            />
                        )}
                        {playground.cover?.mime?.startsWith("video/") && (
                            <video
                                src={getMediaUrl(playground.cover)}
                                className="cover-img"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
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

                    {/* Text & Media */}
                    <div className="first-text">
                        <h6>{firstPart} <span className="h6-highlight">{lastWord}</span></h6>
                        <p className="description">{playground.description}</p>

                        {playground.info && (
                            <>
                                <p className="subtitle">Info</p>
                                <p className="project-text">
                                    {playground.info.split(/\r?\n/).map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </>
                        )}

                        {playground.note && <p className="note">{playground.note}</p>}

                        <ul className="links-list">
                            {playground.figmalink && <li><a href={playground.figmalink} target="_blank"><ion-icon name="logo-figma"></ion-icon></a></li>}
                            {playground.websitelink && <li><a href={playground.websitelink} target="_blank"><ion-icon name="globe-outline"></ion-icon></a></li>}
                            {playground.externlink && <li><a href={playground.externlink} target="_blank"><ion-icon name="link-outline"></ion-icon></a></li>}
                        </ul>

                        {/* Media Gallery */}
                        <div className="media-gallery">
                            {playableMedia?.map(item => (
                                <div key={item.id} className="media-item">
                                    {item.mime.startsWith("image/") && (
                                        <img
                                            src={getMediaUrl(item)}
                                            alt={item.alternativeText || item.name}
                                            className="media-borders"
                                        />
                                    )}
                                    {item.mime === "video/mp4" && (
                                        <video className="media-borders" controls poster={getMediaUrl(item)}>
                                            <source src={getMediaUrl(item)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <FooterLight />
            </div>

        </>
    );
}
