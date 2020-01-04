import React from 'react';
import PropTypes from 'prop-types'

export default function ErrorMessage ({active, arrInd, clickOk, clickX}) {
  return (
    <div className='error-container'>
      <div className='error-header'>
        <p className='error-title'>
          Error Message
        </p>
        <a href='#' onClick={() => clickX(arrInd)} className="error-close">
          <div className='error-x'>x</div>
        </a>
      </div>
      <div className="error-content">
        <div className='error-message'>
          The Internet has ended. <br/> Click OK to continue.
        </div>
        <a href="#" onClick={active ? clickOk : null} className="error-button">
          <div className="error-text-button">
            OK
          </div>
        </a>
      </div>
    </div>
  )
}

ErrorMessage.propTypes = {
  active: PropTypes.bool,
  arrInd: PropTypes.number.isRequired,
  clickX: PropTypes.func.isRequired,
  clickOk: PropTypes.func.isRequired,
}