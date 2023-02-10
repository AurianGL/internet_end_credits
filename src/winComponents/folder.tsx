import React, { useContext, useState, useRef } from 'react';
import { ConsoleContext } from '../context';
import { useOutsideAlerter } from '../hooks/onClickOutside';
import WindowsDrag from './windowsDrag'

interface Props {
  name: string
  onCloseFolder: () => void
  margin?: boolean
}

const height = `calc(${window.innerHeight}px - 30px)`

export const Folder: React.FC<Props> = ({ name, onCloseFolder, margin = true, children }) => {
  const [fullScreen, setFullScreen] = useState(false)
  const {mode} = useContext(ConsoleContext);
  const wrapperRef = useRef(null)
  const focus = useOutsideAlerter(wrapperRef)

  return (
    <WindowsDrag>
      <div ref={wrapperRef} className={`${fullScreen ? 'lg:w-full' : 'lg:w-1/2'  } absolute box-border top-0 left-0 flex sm:w-full flex-col windows`} style={{ height: height, zIndex: focus ? 40 : 1 }}>
        <div className='win-header'>

          <p className='win-title'>
            {name}
          </p>
          <div className='draggable flex-grow'></div>
          <div className='flex items-center gap-1'>
          <button onClick={() => setFullScreen(!fullScreen)} className="win-close">
            <div className='win-x '>□</div>
          </button>
          <button onClick={onCloseFolder} className="win-close">
            <div className='win-x'>x</div>
          </button>
          </div>
        </div>
        <div className="flex grow flex-column">
          <div className={`${mode === 'ANTHUME' ? 'bg-white' : 'bg-black'} ${margin ? 'generic-inner-content p-3' : 'generic-inner-content p-0'}`}>
            {children}
          </div>
          <div style={{ height: '20px' }}></div>
        </div>
      </div>
    </WindowsDrag>
  )
}

function userRef(arg0: null) {
  throw new Error('Function not implemented.');
}
