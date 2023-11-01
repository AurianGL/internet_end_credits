import React, { useContext } from 'react'
import Icon from './icon'
import { ProgramsContext } from '../context'
import { Cle } from '../context/ProgramsContext'

interface Props {
  name: string
  cle: Cle
}

export const TermIcon: React.FC<Props> = ({ name, cle }) => {
  const { programs, setPrograms } = useContext(ProgramsContext)
  return (
    <Icon
      imageId='pgr'
      name={name}
      openFolder={() => setPrograms(programs.includes(cle) ? programs.filter(e => e !== cle) : [...programs, cle] )}
    />
  )
}
