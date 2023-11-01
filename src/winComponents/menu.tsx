import React, { useContext, useEffect, useState } from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import { ProgramsContext } from '../context';
import { Cle } from '../context/ProgramsContext';

interface Props {
  setType: (type: string) => void
}


const OpenMenu: React.FC<Props> = ({ setType }) => {
  const navigate = useNavigate()

  return (
    <div className='open-menu'>
      <div className='side-title'><p>AURIAN GL</p></div>
      <div className='app-list'>
        <div className='app-item'>
          <button onClick={() => navigate('Term')}>{'>/'}</button>
        </div>
        <div className='app-item'>
          <button onClick={() => navigate('1995')}>1995</button>
        </div>
        <div className='app-item line-through'>
          DE RAMP
        </div>
        <div className='app-item'></div>
      </div>
    </div>
  )
}
interface tabProps {
  program: Cle
  isFocus: boolean
  setCurrentProgram: React.Dispatch<Cle>
}

const ProgTab: React.FC<tabProps> = ({ program, setCurrentProgram, isFocus }) => {

  return <div 
  onClick={() => setCurrentProgram(program)}
  className={`p-1 ${ isFocus ? 'border-t-windows-300 border-x-windows-300 border-b-windows-100 border-r-windows-100 bg-windows-200' : 'border-t-windows-100 border-l-windows-100 border-b-windows-300 border-r-windows-300'} bg-windows-200 border-2 border-solid flex items-center pr-1} border-solid flex items-center pr-1`}>
    {program}
  </div>
}

export const Menu: React.FC<Props> = ({ setType }) => {
  const [open, setOpen] = useState(false)
  const [countDown, setCountdown] = useState<string | undefined>(undefined)
  const { programs, setCurrentProgram, currentProgram } = useContext(ProgramsContext)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(`${(24 - new Date().getHours())}:${(60 - new Date().getMinutes())}:${(60 - new Date().getSeconds())}`)
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <React.Fragment>
      <div className="win-menu font-death">
        <button
          className={`${open ? 'border-t-windows-300 border-x-rose-300 border-b-windows-100 border-r-windows-100' : 'border-t-windows-100 border-l-windows-100 border-b-windows-300 border-r-windows-300'} bg-windows-200 border-2 border-solid flex items-center pr-1`}
          onClick={() => setOpen(!open)}>
          <CloudinaryContext cloudName="dav38qg9f">
            <div style={{ paddingRight: '3px' }}>
              <Image publicId={`Internet_end_credit/icons/star-icon_fvekmm`} width="25" />
            </div>
          </CloudinaryContext>
          Start
        </button>
        <div className='flex align-start grow gap-1 mx-1'>
          {programs.map((program, index) => {
            return <ProgTab key={program + index} program={program} setCurrentProgram={setCurrentProgram} isFocus={currentProgram === program} />
          })}
        </div>
        <div className='win-clock mr-1'>
          {countDown}
        </div>
      </div>
      {open && <OpenMenu setType={setType} />}
    </React.Fragment>
  )
}