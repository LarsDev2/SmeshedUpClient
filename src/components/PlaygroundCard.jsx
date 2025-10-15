import './cards.css';

function PlaygroundCard({ playground }) {  // <-- destructure the project prop


    return (
        <div className='card'>
            {playground.cover && (
                playground.cover.mime.startsWith("image/") ? (
                    <img
                        src={`${import.meta.env.VITE_STRAPI_URL}${playground.cover.url}`}
                        alt={playground.name}
                        className="cover"
                    />
                ) : playground.cover.mime.startsWith("video/") ? (
                    <video
                        src={`${import.meta.env.VITE_STRAPI_URL}${playground.cover.url}`}
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
