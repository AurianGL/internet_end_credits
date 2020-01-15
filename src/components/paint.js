import React from 'react';
import ReactDOM from 'react-dom';
import WindowsDrag from './windowsDrag';
import Canvas from './canvas'

export default class Paint extends React.Component {
  render () {
    return (
      <WindowsDrag>
        <div className='paint-container windows'>
          <div className='win-header'>
          
            <p className='win-title'>
              Paint
            </p>
            <button href='#'  className="win-close">
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
      </WindowsDrag>
    )
  }
}
