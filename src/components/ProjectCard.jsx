import './cards.css';

function ProjectCard({ project }) {


    return (
        <div className="card">
            {project.cover && (
                project.cover.mime.startsWith("image/") ? (
                    <img
                        src={`${import.meta.env.VITE_STRAPI_URL}${project.cover.url}`}
                        alt={project.name}
                        className="cover"
                    />
                ) : project.cover.mime.startsWith("video/") ? (
                    <video
                        src={`${import.meta.env.VITE_STRAPI_URL}${project.cover.url}`}
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
