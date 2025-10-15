import './cards.css';

function PlaygroundCard({ playground }) {  // <-- destructure the project prop

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
        <div className='card'>
            {playground.cover && (
                playground.cover.mime.startsWith("image/") ? (
                    <img
                        src={getMediaUrl(playground.cover)}
                        alt={playground.cover.alternativeText || playground.name}
                        className="cover"
                    />
                ) : playground.cover.mime.startsWith("video/") ? (
                    <video
                        src={getMediaUrl(playground.cover)}
                        className="cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : null
            )}
        </div>
    );
};

export default PlaygroundCard;
