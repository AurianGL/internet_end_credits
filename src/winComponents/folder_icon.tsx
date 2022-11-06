import React, { useState } from 'react'
import Icon from './icon'
import { Folder } from './folder'

interface Props {
  name: string
}

export const FolderIcon: React.FC<Props> = ({ name, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Icon
        imageId={open ? 'folder_open_pbgn79' : 'folder_close_pjgxhc'}
        name={name}
        openFolder={() => setOpen(true)}
        />
      {open && (
        <Folder
          name={name}
          onCloseFolder={() => setOpen(false)}>
          {children}
        </Folder>
      )}
    </React.Fragment>
  )
}
