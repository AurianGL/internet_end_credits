import React from 'react';
import './App.scss';
import InternetHasEnded from './components/internettHasEnded'
import Paint from './components/paint'
import FolderIcon from './components/folder_icon';
import Paintings from './components/paintings'
import Menu from './components/menu'
import paintingsIds from './components/images'

function App() {
    

    return (
      <div className="App">
        <div className='global-context'>
          <div className='global-content'>
            <Paint/>
            <FolderIcon name='Paintings' content={<Paintings cloudIdCollec={paintingsIds}/>}/>
            <FolderIcon name='Cult Dürer'/>
            <InternetHasEnded/>
          </div>
          <div className="bottom">
            <Menu/>
          </div>
        </div>
      </div>
    )
}


export default App;
