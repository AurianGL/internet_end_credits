import React from 'react';
import './App.scss';
import InternetHasEnded from './components/internettHasEnded'
import Paint from './components/paint'
import FolderIcon from './components/folder_icon';
import Paintings from './components/paintings'
import Menu from './components/menu'

function App() {
    const paintingsIds = [
      {id:'zvrvlurtn1vsqtbnaboy', name:'sheep'},{id:'tpdxbwogxstoittwqxtk', name:'another sheep'}
    ]

    return (
      <div className="App">
        <Paint/>
        <FolderIcon name='Paintings' content={<Paintings cloudIdCollec={paintingsIds}/>}/>
        <FolderIcon name='Cult Dürer'/>
        <InternetHasEnded/>
        <Menu/>
      </div>
    )
}


export default App;
