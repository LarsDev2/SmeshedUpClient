import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLight from "../components/NavbarLight";
import FooterLight from "../components/FooterLight";
import NavbarWidth from "../components/NavbarWidth";
import "./ProjectDetail.css";

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getMediaUrl = (media) => {
        if (!media) return "";
        return media.url.startsWith("http")
            ? media.url
            : `${import.meta.env.VITE_STRAPI_URL}${media.url}`;
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`
                );
                const data = await res.json();
                setProject(data?.data?.[0] || null);
            } catch (err) {
                console.error("Error fetching project:", err);
                setProject(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (loading) return <div className="loader-overlay"><div className="spinner"></div></div>;
    if (!project) return <p>Project not found.</p>;

    const { name, media } = project;
    const words = name.split(" ");
    const lastWord = words.pop();
    const firstPart = words.join(" ");
    const playableMedia = media?.filter(m => m.mime.startsWith("image/") || m.mime === "video/mp4");

    return (
        <>
            <NavbarLight />
            <div className="navbar-width"><NavbarWidth /></div>

            <div className="layout layout-projects-detail">
                <div className="project-detail--first">
                    <div className="cover-wrapper">
                        {project.cover?.mime?.startsWith("image/") && <img src={getMediaUrl(project.cover)} alt={project.cover.alternativeText || project.name} className="cover-img" />}
                        {project.cover?.mime?.startsWith("video/") && <video src={getMediaUrl(project.cover)} className="cover-img" autoPlay loop muted playsInline />}
                        <div className="top-actions">
                            <button className="back-btn" onClick={() => navigate(-1)}>
                                <ion-icon name="chevron-back-outline"></ion-icon>
                            </button>
                        </div>
                    </div>

                    <div className="first-text">
                        <h6>{firstPart} <span className="h6-highlight">{lastWord}</span></h6>
                        <p className="description">{project.description}</p>

                        {project.briefing && <><p className="subtitle">Briefing</p><p className="project-text">{project.briefing.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p></>}
                        {project.info && <><p className="subtitle">Info</p><p className="project-text">{project.info.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</p></>}
                        {project.note && <p className="note">{project.note}</p>}

                        <ul className="links-list">
                            {project.figmalink && <li><a href={project.figmalink} target="_blank"><ion-icon name="logo-figma"></ion-icon></a></li>}
                            {project.websitelink && <li><a href={project.websitelink} target="_blank"><ion-icon name="globe-outline"></ion-icon></a></li>}
                            {project.externlink && <li><a href={project.externlink} target="_blank"><ion-icon name="link-outline"></ion-icon></a></li>}
                        </ul>

                        <div className="media-gallery">
                            {playableMedia?.map(item => (
                                <div key={item.id} className="media-item">
                                    {item.mime.startsWith("image/") && <img src={getMediaUrl(item)} alt={item.alternativeText || item.name} className="media-borders" />}
                                    {item.mime === "video/mp4" && <video className="media-borders" controls poster={getMediaUrl(item)}><source src={getMediaUrl(item)} type="video/mp4" />Your browser does not support the video tag.</video>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <FooterLight />
        </>
    );
}
