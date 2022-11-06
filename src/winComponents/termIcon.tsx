import React, { useState } from 'react'
import Icon from './icon'
import { Folder } from './folder'

interface Props {
  name: string
}

export const TermIcon: React.FC<Props> = ({ name, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Icon
        imageId='pgr'
        name={name}
        openFolder={() => setOpen(true)}
      />
      {open && (
        <Folder
          name={name}
          onCloseFolder={() => setOpen(false)}
          margin={false}
        >
          {children}
        </Folder>
      )}
    </>
  )
}
