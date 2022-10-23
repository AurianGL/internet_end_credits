import React from 'react'
import {Welcome} from '../winComponents/welcome'
import '../winComponents/style/_index.scss'

interface HomeProps {}

export const NinetyFive: React.FC<HomeProps> = () => {
  return (
    <div className='ninetyFive'>
      <Welcome />
    </div>
  )
}
