import React from 'react';
import PropTypes from 'prop-types'
import WindowsDrag from './windowsDrag'

export default function ErrorMessage ({active, arrInd, clickOk, clickX}) {
  return (
    <WindowsDrag>
      <div className='error-container windows'>
        <div className='win-header'>
          <p className='win-title'>
            Error Message
          </p>
          <button href='#' onClick={() => clickX(arrInd)} className="win-close">
            <div className='win-x'>x</div>
          </button>
        </div>
        <div className="error-content">
          <div className='error-message'>
            The Internet has ended. <br/> Click OK to continue.
          </div>
          <a href="#" onClick={active ? clickOk : null} className="win-button">
            <div className="win-text-button">
              OK
            </div>
          </a>
        </div>
      </div>
    </WindowsDrag>
  )
}

ErrorMessage.propTypes = {
  active: PropTypes.bool,
  arrInd: PropTypes.number.isRequired,
  clickX: PropTypes.func.isRequired,
  clickOk: PropTypes.func.isRequired,
}