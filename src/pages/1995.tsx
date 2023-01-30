import React, { useContext } from 'react'
import {Welcome} from '../winComponents/welcome'
import '../winComponents/style/_index.scss'
import { ConsoleContext } from '../context';

interface HomeProps {}

export const NinetyFive: React.FC<HomeProps> = () => {
  const {mode} = useContext(ConsoleContext);

  return (
    <div className={`flex justify-start align-start fixed text-center ${mode === 'ANTHUME' ? 'bg-windows-700' : 'bg-gray-900'} w-screen`}>
      <Welcome />
      <div className="w-full h-full absolute z-10 bg-scanline bg-[length:4px_4px] pointer-events-none"></div>
      <div className="w-full h-full absolute z-10 bg-vignette pointer-events-none"></div>
    </div>
  )
}
