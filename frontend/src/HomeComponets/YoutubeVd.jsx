import React, { useState } from 'react';
import PropTypes from 'prop-types';

const YouTubeVideo = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className="w-full"
      style={{
        height: '431px',
        borderRadius: '15px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {isPlaying ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
        />
      ) : (
        <div
          className="w-full h-full relative cursor-pointer"
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={() => setIsPlaying(true)}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="9.5,16.5 16.5,12 9.5,7.5 " />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default YouTubeVideo;
