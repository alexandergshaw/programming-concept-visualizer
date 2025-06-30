import React from 'react';

const WhatIsBigOSection: React.FC = () => (
    <div style={{ marginBottom: 32 }}>
        <p style={{ marginBottom: 22 }}>
            <b>Big O notation</b> is a way to measure how much <b>time</b> (how long it takes) or <b>memory</b> (how much space is needed) a program will need to finish its work, especially as the amount of data gets bigger.
        </p>
        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/g2o22C3CRfU?si=aWVGtINaZqAj6Stp"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ display: 'block', marginBottom: 18 }}
        ></iframe>
        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/4TUgqm2gJkE?si=3iSAiPk8jFWs0DCV"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ display: 'block', marginBottom: 0 }}
        ></iframe>
    </div>
);

export default WhatIsBigOSection;