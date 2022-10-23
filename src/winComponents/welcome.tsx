import React, { useState } from 'react';
import InternetHasEnded from './internettHasEnded'
import Paint from './paint'
import FolderIcon from './folder_icon';
import Paintings from './paintings'
import Menu from './menu'
import paintingsIds from './images'
import WindowsDrag from './windowsDrag'
import { Durer } from './durer'
// import { HelloYou } from './HelloYou'


const height = `calc(${window.innerHeight * 0.01}px * 100)`

const Art = () => {
  return (
    <div className='w-full text-left  p-5 grow' style={{height: height}}>
      <Paint/>
      <FolderIcon name='Paintings' content={<Paintings cloudIdCollec={paintingsIds}/>}/>
      <FolderIcon name='Cult Dürer' content={<Durer/>}/>
      <InternetHasEnded/>
      {/* <HelloYou/> */}
    </div>
  )
}

const Dev = () => {
  return (
    <div className='w-full text-left  p-5 grow' style={{height: height}}>
      <div>DEV</div>
    </div>
  )
}

interface Props {
  setType: (type: string) => void
}

const WelcomeMessage = ({setType}: Props) => {

  return (
    <div className='w-full text-left flex grow justify-center items-center'  style={{height: height}}>
      <WindowsDrag>
        <div className='error-container windows' style={{maxHeight: '100vw'}}>
          <div className='win-header'>
            <p className='win-title'>
              Welcome to AurianGL
            </p>
          </div>
          <div className="error-content">
            <div className='error-message'>
              Browse at your own risk
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button onClick={() => setType('art')} className="win-button">
                <div className="win-text-button">
                  YES
                </div>
              </button>
              <button onClick={() => setType('dev')} className="win-button">
                <div className="win-text-button">
                  NO
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
    <div className='flex flex-col' style={{height: height}}>
      {type === 'welcome' && <WelcomeMessage setType={setType}/>}
      {type === 'dev' && <Dev/>}
      {type === 'art' && <Art/>} 
      <Menu setType={setType}/>
    </div>
  )

}
