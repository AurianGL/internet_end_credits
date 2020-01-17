import React from 'react';
import OpenMenu from './open_menu'

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
            className={this.state.open ? 'win-active' : 'win-start'}
            onClick={this.onStart}>
              Start
            </button>
          <div className='win-clock'>Time</div>
        </div>
        {this.state.open && <OpenMenu/>}
      </React.Fragment>
    )
  }
}