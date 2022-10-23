import React from 'react'
import Icon from './icon'
import Folder from './folder'
import { useHistory } from 'react-router-dom';

interface Props {
  name: string
}

export const TermIcon = ({name}: Props) => {
    const history = useHistory();

    return (
        <Icon 
          imageId='pgr'
          name={name}
          openFolder={() => history.push('Term')}
        />
    )
}
