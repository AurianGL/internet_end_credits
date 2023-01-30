import React, { useContext } from 'react';
import { ConsoleContext } from '../context';

export const NotePad = ({content, close}: NotePadProps) => {
  const {mode} = useContext(ConsoleContext);

  return (
    <>
      <div className={`notepad font-death ${mode === 'ANTHUME' ? 'text-black' : 'text-white'}`}>
        {content}
        <button
          onClick={close}
        >
         close text
         </button>
      </div>
    </>
  )
}

interface NotePadProps{
  content: string
  close: () => void
}