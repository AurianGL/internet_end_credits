import React from 'react';
import OpenMenu from './open_menu'
import {Image, CloudinaryContext} from 'cloudinary-react';


export default class Menu extends React.Component {
  state={
    open: false
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
        {this.state.open && <OpenMenu/>}
      </React.Fragment>
    )
  }
}