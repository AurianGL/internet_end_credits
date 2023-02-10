import React, { useContext, useState } from 'react';
import { InternetHasEnded } from './internettHasEnded'
import { Paint } from './paint'
import { FolderIcon } from './folder_icon';
import { Menu } from './menu'
import WindowsDrag from './windowsDrag'
import { ConsoleContext, ProgramsContext } from '../context';
import { Folder } from './folder';
import { PROGRAMS } from '../constants/programs';
import { TermIcon } from './termIcon';


const height = `calc(${window.innerHeight * 0.01}px * 100)`

const Art = () => {

  const {mode} = useContext(ConsoleContext);
  const { programs, setPrograms } = useContext(ProgramsContext)

  return (
    <div className='w-full text-left p-5 grow flex flex-col flex-start items-start' style={{ height: height }}>
      <Paint />
      {mode === 'ANTHUME'  && <FolderIcon name='Paintings' cle='painting'/>}
      {mode === 'POSTHUME'  && <FolderIcon name='As Above' cle='crux'/>}
      <FolderIcon name='Cult Dürer' cle='durer'/>
      <TermIcon name='Terminal' cle='terminal'/>
      {programs.map((program) => {
        const {name, PgrComponent, props} = PROGRAMS[program]
      return <Folder
          margin={name !== 'Terminal'}
          name={name}
          onCloseFolder={() => setPrograms(programs.filter(e => e !== program))} key={name}>
          <PgrComponent {...props}/>
      </Folder>
      })}
      <InternetHasEnded />
    </div>
  )
}
interface Props {
  setType: (type: string) => void
}

const WelcomeMessage = ({ setType }: Props) => {
  const {mode} = useContext(ConsoleContext);


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
              <button onClick={() => setType('art')} className={`win-button ${mode === 'ANTHUME' ? 'text-black' : 'text-white'}`}>
                <div className={`border-dotted border-2 ${mode === 'ANTHUME' ?  'border-black' : 'border-white'}`}>
                  1995
                </div>
              </button>
              <button onClick={() => window.location.href = 'https://www.spacejam.com/1996/'} className={`win-button ${mode === 'ANTHUME' ? 'text-black' : 'text-white'}`}>
                <div className={`border-dotted border-2 ${mode === 'ANTHUME' ?  'border-black' : 'border-white'}`}>
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
