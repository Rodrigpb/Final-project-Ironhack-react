import React from 'react';

const BackgroundVideo = () => {
    const videoSource = "https://www.youtube.com/watch?v=hywVgqbSQ-8"
    return (
        <div >
            <video autoPlay="autoplay" loop="loop" muted  >
            <iframe width="1189" height="669" src="https://www.youtube.com/embed/hywVgqbSQ-8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default BackgroundVideo