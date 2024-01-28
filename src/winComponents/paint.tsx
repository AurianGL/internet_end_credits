import React, { useState } from 'react';
import WindowsDrag from './windowsDrag';
import { Canvas } from './canvas'
import {Icon} from './icon'

export const Paint = () => {
  const [open, setOpen] = useState(false)
  const [draw, setDraw] = useState(false)
  const [grayscale, setGrayscale] = useState(false)
  const [mezzotinto, setMezzotinto] = useState(false)

  return (
    <React.Fragment>
      <Icon
        imageId={'folder_close_pjgxhc'}
        name={'Paint'}
        openFolder={() => { setOpen(!open) }}
      />
      {open && (<WindowsDrag>
        <div className='paint-container windows'>
          <div className='win-header'>

            <p className='win-title'>
              Paint
            </p>
            <div className='draggable flex-grow' />
            <button type='button' onClick={() => { setOpen(false) }} className="win-close">
              <div className='win-x'>x</div>
            </button>
          </div>
          <div className="paint-content">
            <div className="paint-row">
              <div className="paint-tools">
                <button type='button' className="paint-button" onClick={() => setDraw(!draw)}>
                  <div className='p-2 bg-black' />
                </button>
                <button type='button' className="paint-button" onClick={() => setGrayscale(!grayscale)}>
                  <div className='p-2 bg-gray-700' />
                  </button>
                <button type='button' className="paint-button" onClick={() => setMezzotinto(!mezzotinto)} />
                <button type='button' className="paint-button" />
              </div>
              <Canvas 
                draw={draw} 
                setDraw={setDraw} 
                grayscale={grayscale} 
                setGrayscale={setGrayscale} 
                mezzotinto={mezzotinto}
                setMezzotinto={setMezzotinto}
              />
            </div>
            <div className="paint-row" />
          </div>
        </div>
      </WindowsDrag>)}
    </React.Fragment>
  )

}
