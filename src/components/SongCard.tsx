import { useState, useRef } from "react";
import WindowsDrag from "../winComponents/windowsDrag"
import { SimpleText } from "./SimpleText"

type Props = {
  song: string[][],
  index: number,
  currentCardIndex: number,
  setCurrentCardIndex: (index: number) => void,
}

export const SongCard = ({ song, index, currentCardIndex, setCurrentCardIndex }: Props) => {
  const [cardColor, setCardColor] = useState('bg-gray-200');
  const wrapperRef = useRef(null);

  return (
  <WindowsDrag>
  <div
    ref={wrapperRef}
    className={`border-black border-4 max-w-max flex flex-col ${
      index === currentCardIndex
        ? "z-40 bg-orange-200"
        : "z-auto bg-gray-200"
    }`}
  >
    <div 
      className={`draggable border-black p-1 border-b-2 font-bold ${index === currentCardIndex ? 'bg-gray-200' : 'bg-gray-200'}}`}
      onClick={() => setCurrentCardIndex(index)}
    >
      {index} - {song[0]}
    </div>
    <div className={`p-2 ${cardColor} grow`}>
      <SimpleText text={song.slice(1)} />
    </div>
    <div className={`flex justify-start items-start ${cardColor} `}>
      <button className='w-6 h-6 bg-red-600' onClick={() => setCardColor('bg-red-600')}></button>
      <button className='w-6 h-6 bg-green-600' onClick={() => setCardColor('bg-green-600')}></button>
      <button className='w-6 h-6 bg-blue-600' onClick={() => setCardColor('bg-blue-600')}></button>
      <button className='w-6 h-6 bg-yellow-400' onClick={() => setCardColor('bg-yellow-400')}></button>
    </div>
  </div>
</WindowsDrag>)
}