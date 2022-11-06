import React from 'react'
import {Welcome} from '../winComponents/welcome'
import '../winComponents/style/_index.scss'

interface HomeProps {}

export const NinetyFive: React.FC<HomeProps> = () => {
  return (
    <div className='ninetyFive'>
      <Welcome />
      <div className="w-full h-full absolute z-10 bg-scanline bg-[length:4px_4px] pointer-events-none"></div>
      <div className="w-full h-full absolute z-10 bg-vignette pointer-events-none"></div>
    </div>
  )
}
