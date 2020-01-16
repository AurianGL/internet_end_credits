import React from 'react';
import {Image, CloudinaryContext} from 'cloudinary-react';
import PropTypes from 'prop-types'
import NotePad from './notepad';


function Miniature ({cloudId, onOpenContent}) {
  return (
    <button
      className='win-folder' 
      onClick={() => {onOpenContent(cloudId)}}>
      <CloudinaryContext cloudName="dav38qg9f">
        <Image publicId={cloudId.id} width="32" />
      </CloudinaryContext>
      <p style={{ color: '#282C34'}}>{cloudId.name}</p>
    </button>
  )
}

Miniature.propTypes = {
  cloudId: PropTypes.object.isRequired,
  onOpenContent: PropTypes.func.isRequired,
}

function Collec ({collec, openContent}) {
  return (
    <ul>
      {collec.map((elem) => {
        return (
            <li key={elem.id}>
              <Miniature cloudId={elem} onOpenContent={openContent}/>
            </li>
          )
        })
      }
    </ul>
  )
}

Collec.propTypes = {
  collec: PropTypes.array.isRequired,
  openContent: PropTypes.func.isRequired
}

function Galerie ({pic, onChangePic, onClose}) {
  return (
    <div>
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between'}}>
        <button className="win-button" onClick={() => {onChangePic('previous')}}>
          <div className='win-text-button'>PREVIOUS</div>
        </button>
        <button className="win-button" onClick={onClose}>
          <div className='win-text-button'>CLOSE</div>
        </button>
        <button className="win-button" onClick={() => {onChangePic('next')}}>
          <div className='win-text-button'>NEXT</div>
        </button>
      </div>
      <CloudinaryContext cloudName="dav38qg9f">
        <div>
          <Image publicId={pic.id} width="500" />
        </div>
      </CloudinaryContext>
      
    </div>
  )
}

Galerie.propTypes = {
  pic: PropTypes.object.isRequired,
  onChangePic: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default class Paintings extends React.Component {
  state = {
    cloudIdCollec: this.props.cloudIdCollec,
    open: false,
    content: '',
    currentImage: {}
  }

  onOpenPaintings = (cloudId) => {
    this.setState({
      open: true,
      content: 'paintings',
      currentImage: cloudId
    })
  }

  onOpenNotePad = () => {
    this.setState({
      open: true,
      content: 'notepad'
    })
  }

  onClose = () => {
    this.setState({
      open: false,
      currentImage: ''
    })
  }

  onChangePic = (direction) => {
    this.setState(state => {
      const indX = state.cloudIdCollec.findIndex(elem => elem.id === state.currentImage.id)
      const nextImage = state.cloudIdCollec[indX + 1] ?  state.cloudIdCollec[indX + 1] : state.cloudIdCollec[0]
      const previousImage =  state.cloudIdCollec[indX - 1] ?  state.cloudIdCollec[indX - 1] : state.cloudIdCollec[state.cloudIdCollec.length - 1]
      const currentImage = direction === 'next' ? nextImage : previousImage 
      return ({
        currentImage
      })
    })
  }
  render () {
    return (
      <React.Fragment>
        {!this.state.open && <Miniature cloudId={{id:'zvrvlurtn1vsqtbnaboy', name:'Notepad'}} onOpenContent={this.onOpenNotePad}/>}  
        {!this.state.open && <Collec collec={this.state.cloudIdCollec} openContent={this.onOpenContent}/>}
        {this.state.open && this.state.content === "paintings" && <Galerie pic={this.state.currentImage} onClose={this.onClose} onChangePic={this.onChangePic}/>}
        {this.state.open && this.state.content === 'notepad' && <NotePad content='lol this is a test'></NotePad>}
      </React.Fragment>
    )
  }
}

Paintings.propTypes = {
  cloudIdCollec: PropTypes.array.isRequired
}