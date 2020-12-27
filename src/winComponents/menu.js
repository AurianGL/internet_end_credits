import React from 'react';
import {Image, CloudinaryContext} from 'cloudinary-react';
import PropTypes from 'prop-types'

function OpenMenu ({setType}) {
    return (
      <div className='open-menu'>
        <div className='side-title'><p>AURIAN GL</p></div>
        <div className='app-list'>
          <div className='app-item'>
            <button onClick={() => setType('art')}>Contemporary Art</button>
          </div>
          <div className='app-item'>
            <button onClick={() => setType('dev')}>Web-Dev</button>
          </div>
          <div className='app-item'></div>
          <div className='app-item'></div>
        </div>
      </div>
    )
}

OpenMenu.propTypes = {
  setType: PropTypes.func.isRequired
}

export default class Menu extends React.Component {
  state={
    open: false,
  }
  
  onStart = () => {
    this.setState({
      open: this.state.open ? false : true
    })
  }

  render (){
    return (
      <React.Fragment>
        <div className="win-menu">
          <button 
            className={this.state.open ? 'start win-active' : 'start win-start'}
            onClick={this.onStart}>
              <CloudinaryContext cloudName="dav38qg9f">
                <div style={{paddingRight: '3px'}}>
                  <Image publicId={`Internet_end_credit/icons/star-icon_fvekmm`} width="25" />
                </div>
              </CloudinaryContext>
              Start
            </button>
          <div className='win-clock'>
            
            Time
          </div>
        </div>
        {this.state.open && <OpenMenu setType={this.props.setType} />}
      </React.Fragment>
    )
  }
}

Menu.propTypes = {
  setType: PropTypes.func.isRequired
}