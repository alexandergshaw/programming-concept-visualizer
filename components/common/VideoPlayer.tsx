import React from 'react';

interface VideoPlayerProps {
    src: string; // The YouTube video URL
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    if (!src) {
        return (
            <div>
                <p>Invalid Video URL. Please provide a valid video.</p>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
                src={src}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default VideoPlayer;