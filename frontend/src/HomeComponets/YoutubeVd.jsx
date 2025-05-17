import React from 'react';
import PropTypes from 'prop-types';

const YouTubeVideo = ({ videoId }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className="w-full"  // Make the video container take full width
      style={{
        height: '431px',  // Set height for the video container
        borderRadius: '15px',  // Apply border-radius
      }}
    >
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px', // Apply border-radius to the thumbnail container as well
        }}
        onClick={() => {
          window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 cursor-pointer">
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
    </div>
  );
};

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,  // Ensure the videoId prop is validated
};

export default YouTubeVideo;
