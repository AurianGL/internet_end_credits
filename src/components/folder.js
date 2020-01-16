import React from 'react';
import WindowsDrag from './windowsDrag'
import PropTypes from 'prop-types'


export default function Folder ({name, onCloseFolder, children}) {
  return (
    <WindowsDrag>
      <div className='generic-container windows'>
        <div className='win-header'>
        
          <p className='win-title'>
            {name}
          </p>
          <button onClick={onCloseFolder} className="win-close">
            <div className='win-x'>x</div>
          </button>
        </div>
        <div className="generic-content">
          <div className='generic-inner-content'>
            {children}
          </div>
          <div style={{height: '20px'}}></div>
        </div>
      </div>
    </WindowsDrag>
  )
}

Folder.propTypes = {
  name: PropTypes.string.isRequired,
  onCloseFolder: PropTypes.func.isRequired
}