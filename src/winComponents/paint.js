import React from 'react';
import ReactDOM from 'react-dom';
import WindowsDrag from './windowsDrag';
import Canvas from './canvas'
import Icon from './icon'


export default class Paint extends React.Component {
  state={
    open: false
  }
  
  openPaint = () => {
    this.setState({
      open: true
    })
  }

  closePaint = () => {
    this.setState({
      open: false
    })
  }

  render () {
    return (
      <React.Fragment>
        <Icon
          imageId={'folder_close_pjgxhc'}
          name={'Paint'}
          openFolder={() => {this.openPaint()}}
        />
        {this.state.open && (<WindowsDrag>
          <div className='paint-container windows'>
            <div className='win-header'>
            
              <p className='win-title'>
                Paint
              </p>
              <button onClick={() => {this.closePaint()}} className="win-close">
                <div className='win-x'>x</div>
              </button>
            </div>
            <div className="paint-content">
              <div className="paint-row">
                <div className="paint-tools">
                  <button className="paint-button"></button>
                  <button className="paint-button"></button>
                  <button className="paint-button"></button>
                  <button className="paint-button"></button>
                </div>
                <Canvas/>
              </div>
              <div className="paint-row"></div>  
            </div>
          </div>
        </WindowsDrag>)}
      </React.Fragment>
    )
  }
}
