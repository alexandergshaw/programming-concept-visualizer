import React, { ReactNode } from 'react';

interface VideoPlayerProps {
    children?: ReactNode; // Only accept children for custom embed content
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ children }) => {
    if (!children) {
        return (
            <div>
                <p>Invalid Video. Please provide embed content as a child.</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default VideoPlayer;