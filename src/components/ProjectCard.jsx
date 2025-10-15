import './cards.css';

function ProjectCard({ project }) {
    const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

    const getMediaUrl = (media) => {
        if (!media) return '';
        return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`;
    };

    return (
        <div className="card">
            {project.cover && (
                project.cover.mime.startsWith("image/") ? (
                    <img
                        src={getMediaUrl(project.cover)}
                        alt={project.name}
                        className="cover"
                    />
                ) : project.cover.mime.startsWith("video/") ? (
                    <video
                        src={getMediaUrl(project.cover)}
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
