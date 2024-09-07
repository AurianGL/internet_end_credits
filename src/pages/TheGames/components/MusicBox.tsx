import React, { useState } from "react";

export const MusicBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex bg-black ">
      <div
        className="flex items-start drop-shadow-[0_35px_35px_rgba(245,50,150,1)]"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ height: "416px" }}
      >
        <h2 className="font-goth text-3xl">{">"}</h2>
      </div>
      {isExpanded && (
        <div className="iframe-section">
          <div
            className="text-section font-goth"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Reckon them's what I 'ad in me 'ead when I were mullin' it over,
            innit?
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
