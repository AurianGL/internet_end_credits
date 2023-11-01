import { useMemo, useRef, useState } from "react";
import { whereIsHome, whereIsHomeFR } from "../data/whereIsHome";
import { SimpleText } from "./SimpleText";
import WindowsDrag from "../winComponents/windowsDrag";
import { SongCard } from "./SongCard";

type Props = {
  lang: 'fr' | 'en'
}

export const HomeMap = ({lang}: Props) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const songs = useMemo(() => {
    return lang === 'fr' ? whereIsHomeFR : whereIsHome
  }, [lang])


  return (
    <div className='grid grid-rows-4 grid-flow-col gap-0'>
      {songs.map((text, index) => (
        <SongCard
          key={index}
          song={text}
          index={index}
          currentCardIndex={currentCardIndex}
          setCurrentCardIndex={setCurrentCardIndex}
        />
      ))}
    </div>
  );
};
