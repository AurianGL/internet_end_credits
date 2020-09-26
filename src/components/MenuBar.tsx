import { Link } from 'gatsby';
import React from 'react'

interface MenuBarProps {

}

const OpenMenu = () => {
  return (
    <div className='open-menu'>
      <div className='side-title'><p>AURIAN GL</p></div>
      <div className='app-list'>
        <div className='app-item'>
          <Link to='/art'>Contemporary Art</Link>
        </div>
        <div className='app-item'>
          <Link to='/dev'>Web-Dev</Link>
        </div>
        <div className='app-item'></div>
        <div className='app-item'></div>
      </div>
    </div>
  )
}



export const MenuBar: React.FC<MenuBarProps> = ({}) => {
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
    );
}


