import React, { useContext, useState, useRef, useMemo } from 'react';
import { ConsoleContext, ProgramsContext } from '../context';
import WindowsDrag from './windowsDrag'
import { PROGRAMS } from '../constants/programs';

interface Props {
  name: string
  cle: string
  onCloseFolder: () => void
  margin?: boolean
}

const height: Record<string, string>  = {
  folder: `calc(${window.innerHeight}px - 30px)`,
  error: `20vh`,
}

export const ProgramContainer: React.FC<Props> = ({ cle, name, onCloseFolder, margin = true, children }) => {
  const [fullScreen, setFullScreen] = useState(false)
  const {mode} = useContext(ConsoleContext);
  const {currentProgram, setCurrentProgram} = useContext(ProgramsContext)
  const wrapperRef = useRef(null)

  const headerStyles: Record<string, string> = useMemo(() => {
    return {
      folder: `${fullScreen ? 'lg:w-full' : 'lg:w-1/2'  } absolute box-border top-0 left-0 flex sm:w-full flex-col windows`,
      error: 'absolute box-border error-container windows',
    }
  }, [fullScreen])
  
  return (
    <WindowsDrag>
      <div 
        onClick={() => setCurrentProgram(cle)}
        ref={wrapperRef} 
        className={`${headerStyles[PROGRAMS[cle].Wrapper]} ${currentProgram === cle ? 'z-40' : 'z-auto'}`} style={{ height: height[PROGRAMS[cle].Wrapper]}}>
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
          {PROGRAMS[cle].Wrapper === 'folder' && <div className={`${mode === 'ANTHUME' ? 'bg-white' : 'bg-black'} ${margin ? 'generic-inner-content p-3' : 'generic-inner-content p-0'}`}>
            {children}
          </div>}
          {PROGRAMS[cle].Wrapper === 'error' &&  children}
          <div style={{ height: '20px' }}></div>
        </div>
      </div>
    </WindowsDrag>
  )
}

function userRef(arg0: null) {
  throw new Error('Function not implemented.');
}
