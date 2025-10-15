import './cards.css';

function ProjectCard({ project }) {
    // Helper to safely get media URL
    const getMediaUrl = (media) => {
        if (!media) return '';

        // If media.url starts with http, it's already absolute (Cloudinary)
        if (media.url.startsWith('http')) {
            return media.url;
        }

        // Otherwise, prepend your Strapi URL (for local uploads)
        return `${import.meta.env.VITE_STRAPI_URL}${media.url}`;
    };

    return (
        <div className="card">
            {/* Cover */}
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

            {/* Media Array */}
            {project.media?.length > 0 && project.media.map((m) =>
                m.mime.startsWith('image/') ? (
                    <img
                        key={m.id}
                        src={getMediaUrl(m)}
                        alt={m.alternativeText || project.name}
                        className="cover"
                    />
                ) : m.mime.startsWith('video/') ? (
                    <video
                        key={m.id}
                        src={getMediaUrl(m)}
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
