import React, { useState } from 'react';
import {InternetHasEnded} from './internettHasEnded'
import Paint from './paint'
import { FolderIcon } from './folder_icon';
import Paintings from './paintings'
import {Menu} from './menu'
import paintingsIds from './images'
import WindowsDrag from './windowsDrag'
import { Durer } from './durer'
import { TermIcon } from './termIcon';
import { Home } from '../pages/Home';
// import { HelloYou } from './HelloYou'


const height = `calc(${window.innerHeight * 0.01}px * 100)`

const Art = () => {
  return (
    <div className='w-full text-left  p-5 grow flex flex-col flex-start items-start' style={{ height: height }}>
      <Paint />
      <FolderIcon name='Paintings'>
        <Paintings cloudIdCollec={paintingsIds} />
      </FolderIcon>
      <FolderIcon name='Cult Dürer'>
        <Durer />
      </FolderIcon>
      <TermIcon name='Terminal'>
        <Home />
      </TermIcon>

      <InternetHasEnded />
      {/* <HelloYou/> */}
    </div>
  )
}
interface Props {
  setType: (type: string) => void
}

const WelcomeMessage = ({ setType }: Props) => {

  return (
    <div className='w-full text-left flex grow justify-center items-center' style={{ height: height }}>
      <WindowsDrag>
        <div className='error-container windows' style={{ maxHeight: '100vw' }}>
          <div className='win-header'>
            <p className='win-title'>
              Welcome to AurianGL
            </p>
          </div>
          <div className="error-content">
            <div className='error-message font-death text-lg'>
              As above, so below.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setType('art')} className="win-button">
                <div className="win-text-button">
                  1995 
                </div>
              </button>
              <button onClick={() => window.location.href = 'https://www.spacejam.com/1996/'} className="win-button">
                <div className="win-text-button">
                  1996
                </div>
              </button>
            </div>
          </div>
        </div>
      </WindowsDrag>
    </div>

  )
}

export const Welcome = () => {
  const [type, setType] = useState('welcome')

  return (
    <div className='flex flex-col' style={{ height: height }}>
      {type === 'welcome' && <WelcomeMessage setType={setType} />}
      {type === 'art' && <Art />}
      <Menu setType={setType} />
    </div>
  )

}
