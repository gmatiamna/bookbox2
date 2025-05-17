import React from 'react';
import YouTubeVideo from './YoutubeVd';
import ExploreButton from '../buttons/ExploreButton';
import PropTypes from "prop-types";

const NewBookA = ({ videoId }) => {
  return (
    <div className="w-[50%] mx-auto grid place-items-center text-center mt-28">
      <h1 className="text-2xl font-bold w-[318px] h-[73px] font-[Zain] text-[52px] leading-[100%] tracking-[0%] text-[#C5922D]">
        New Book Arrival
      </h1>
      <h2 className="text-[32px] font-[700] mb-4 leading-[100%] tracking-[0%] text-[#9FB11D] font-[Zain]">
        Discover Stories in Motion
      </h2>

      {/* Pass the videoId prop dynamically to YouTubeVideo */}
      <div className="mb-6 w-full">
        <YouTubeVideo videoId={videoId} />
      </div>

      {/* Explore button placed below the video */}
      <div className="mt-4">
        <ExploreButton className={"w-[120px] h-[40px]"} label={"Explore"} />
      </div>
    </div>
  );
}

NewBookA.propTypes = {
  videoId: PropTypes.string.isRequired, // Validate videoId as a string and required
};

export default NewBookA;
