import React, { useState } from "react";

export const MusicBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex bg-slate-800 p-2">
      <div
        className="flex items-start "
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ height: "416px" }}
      >
        <h2>{">"}</h2>
      </div>
      {isExpanded && (
        <div className="iframe-section">
          <div
            className="text-section"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            I think those were what I had in mind when I was thinking about the
            game
          </div>

          <iframe
            title="spotify"
            style={{ borderRadius: "0px" }}
            src="https://open.spotify.com/embed/playlist/4O6Tkl53bnXrY6ztjWHgMA?utm_source=generator&theme=0"
            width="100%"
            height="400"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};
