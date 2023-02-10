import React, { useContext } from 'react'
import Icon from './icon'
import { ProgramsContext } from '../context'

interface Props {
  name: string
  cle: string
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
