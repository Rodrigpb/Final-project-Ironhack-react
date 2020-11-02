import React from 'react';
import './backgroundVideo.css'


export default function BackgroundVideo() {
  return (
      <div className="video-background">
        <div className="video-foreground">
          <iframe
          src="https://www.youtube.com/embed/hywVgqbSQ-8?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&autohide=0" 
          frameborder="0" 
          allowfullscreen
          >
          </iframe>
        </div>
      </div>
  )
}

