import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLight from "../components/NavbarLight";
import FooterLight from "../components/FooterLight";
import './ProjectDetail.css';
import NavbarWidth from "../components/NavbarWidth";

export default function PlaygroundDetail() {
    const { slug } = useParams();
    const [playground, setPlayground] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPlayground() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_STRAPI_URL}/api/playgrounds?filters[slug][$eq]=${slug}&populate=*`
                );
                const data = await res.json();
                setPlayground(data.data[0]); // first matching project
            } catch (err) {
                console.error("Error fetching playground:", err);
            }
        }
        fetchPlayground();
    }, [slug]);

    if (!playground) return <p>Loading...</p>;

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
                // ✅ Native share dialog (mobile/modern browsers)
                await navigator.share(shareData);
            } else if (navigator.clipboard && window.isSecureContext) {
                // ✅ Copy to clipboard if secure context
                await navigator.clipboard.writeText(pageUrl);
                alert("Link copied to clipboard!");
            } else {
                // ✅ Last fallback: create temp input element
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
                        {playground.cover && (
                            playground.cover.mime.startsWith("image/") ? (
                                <img
                                    src={`${import.meta.env.VITE_STRAPI_URL}${playground.cover.url}`}
                                    alt={playground.name}
                                    className="cover-img"
                                />
                            ) : playground.cover.mime.startsWith("video/") ? (
                                <video
                                    src={`${import.meta.env.VITE_STRAPI_URL}${playground.cover.url}`}
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
                            <p className="description">{playground.description}</p>
                            <p className="subtitle">Info</p>
                            <p className="project-text">
                                {playground.info.split("\n").map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                            <p className="note">{playground.note}</p>
                            <ul className="links-list">
                                {playground.figmalink && (
                                    <li>
                                        <a className="links-list--item" href={playground.figmalink} target="_blank">
                                            <ion-icon name="logo-figma"></ion-icon>
                                        </a>
                                    </li>
                                )}
                                {playground.websitelink && (
                                    <li>
                                        <a className="links-list--item" href={playground.websitelink} target="_blank">
                                            <ion-icon name="globe-outline"></ion-icon>
                                        </a>
                                    </li>
                                )}
                                {playground.externlink && (
                                    <li>
                                        <a className="links-list--item" href={playground.externlink} target="_blank">
                                            <ion-icon name="link-outline"></ion-icon>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="media-gallery">
                            {playableMedia?.map((item) => {
                                const fileUrl = `${import.meta.env.VITE_STRAPI_URL}${item.url}`;
                                const isImage = item.mime.startsWith("image/");
                                const isVideo = item.mime === "video/mp4";

                                return (
                                    <div key={item.id} className="media-item">
                                        {isImage && (
                                            <img
                                                src={fileUrl}
                                                alt={item.alternativeText || item.name}
                                                className="media-borders"
                                            />
                                        )}
                                        {isVideo && (
                                            <video className="media-borders" controls poster={fileUrl} >
                                                <source src={fileUrl} type="video/mp4" />
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
