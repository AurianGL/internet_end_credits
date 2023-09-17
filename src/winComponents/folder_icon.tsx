import React, { useContext } from 'react'
import Icon from './icon'
import { ProgramsContext } from '../context'
import { ICONS, PROGRAMS } from '../constants/programs'

interface Props {
  name: string
  cle: string
}



export const FolderIcon: React.FC<Props> = ({ name, cle }) => {
  const { programs, setPrograms, setCurrentProgram } = useContext(ProgramsContext)
  const icon = PROGRAMS[cle].icon

  return (
    <Icon
      imageId={programs.includes(cle) ? ICONS[icon].open : ICONS[icon].close}
      name={name}
      openFolder={() => {
        setPrograms(programs.includes(cle) ? programs.filter(e => e !== cle) : [...programs, cle])
        setCurrentProgram(cle)
      }}
    />
  )
} 
