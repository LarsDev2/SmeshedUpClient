import './cards.css';

function ProjectCard({ project }) {
    const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

    const getStrapiMedia = (media, format = "url") => {
        if (!media) return "";
        // Use format if available
        if (format !== "url" && media.formats?.[format]?.url) {
            return `${import.meta.env.VITE_STRAPI_URL}${media.formats[format].url}`;
        }
        return `${import.meta.env.VITE_STRAPI_URL}${media.url}`;
    };


    return (
        <div className="card">
            {project.cover && (
                project.cover.mime.startsWith("image/") ? (
                    <img
                        src={getStrapiMedia(project.cover)}
                        alt={project.name}
                        className="cover"
                    />
                ) : project.cover.mime.startsWith("video/") ? (
                    <video
                        src={getStrapiMedia(project.cover)}
                        className="cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : null
            )}

            {project.categories?.length > 0 && (
                <ul className="categories">
                    {project.categories.map((cat) => (
                        <li key={cat.id} className="category-item">
                            {cat.course}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

export default ProjectCard;
