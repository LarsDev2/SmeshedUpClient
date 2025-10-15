import './cards.css';

function ProjectCard({ project }) {
    const getMediaUrl = (media) => {
        if (!media) return '';

        if (media.url.startsWith('http')) {
            return media.url;
        }
        
        return `${import.meta.env.VITE_STRAPI_URL}${media.url}`;
    };

    return (
        <div className="card">
            {project.cover && (
                project.cover.mime.startsWith('image/') ? (
                    <img
                        src={getMediaUrl(project.cover)}
                        alt={project.cover.alternativeText || project.name}
                        className="cover"
                    />
                ) : project.cover.mime.startsWith('video/') ? (
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

            {/* Categories */}
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
