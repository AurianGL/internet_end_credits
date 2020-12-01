import React from 'react';
import InternetHasEnded from './internettHasEnded'
import Paint from './paint'
import FolderIcon from './folder_icon';
import Paintings from './paintings'
import Menu from './menu'
import paintingsIds from './images'
import PropTypes from 'prop-types'
import WindowsDrag from './windowsDrag'
import { Durer } from './durer'



function Art () {
  return (
    <div className='global-content'>
      <Paint/>
      <FolderIcon name='Paintings' content={<Paintings cloudIdCollec={paintingsIds}/>}/>
      <FolderIcon name='Cult Dürer' content={<Durer/>}/>
      <InternetHasEnded/>
    </div>
  )
}

function Dev () {
  return (
    <div className='global-content'>
      <div>DEV</div>
    </div>
  )
}

function WelcomeMessage ({setType}) {
  return (
    <div className='global-content' style={{padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <WindowsDrag>
        <div className='error-container windows' style={{maxHeight: '100vw'}}>
          <div className='win-header'>
            <p className='win-title'>
              Welcome to AurianGL
            </p>
          </div>
          <div className="error-content">
            <div className='error-message'>
              What are you looking for ?
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button href="#" onClick={() => setType('art')} className="win-button">
                <div className="win-text-button">
                  ART
                </div>
              </button>
              <button href="#" onClick={() => setType('dev')} className="win-button">
                <div className="win-text-button">
                  DEV
                </div>
              </button>
            </div>
          </div>
        </div>
      </WindowsDrag>
      </div>

  )
}

WelcomeMessage.propTypes = {
  setType: PropTypes.func.isRequired
}

export default class Welcome extends React.Component {
  state = {
    type: 'welcome'
  }

  onSetType = (type) => {
    this.setState({
      type: type
    })
  }
    
  render () {
    return (
      <div className='global-context'>
        {this.state.type === 'welcome' && <WelcomeMessage setType={this.onSetType}/>}
        {this.state.type === 'dev' && <Dev/>}
        {this.state.type === 'art' && <Art/>} 
        <div className="bottom">
          <Menu setType={this.onSetType}/>
        </div>
      </div>
    )
  }
}
