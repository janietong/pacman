import React, { useRef, useState } from "react";

const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-controls">
      <audio ref={audioRef} src={src} autoPlay loop />
      <button onClick={toggleMusic} className="music-button">
        {isPlaying ? "🔈 Mute" : "🔊 Unmute"}
      </button>
    </div>
  );
};

export default BackgroundMusic;
