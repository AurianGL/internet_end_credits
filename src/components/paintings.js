import React from 'react';
import {Image, CloudinaryContext} from 'cloudinary-react';
import PropTypes from 'prop-types'
import NotePad from './notepad';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


function Miniature ({cloudId, onOpenContent, name}) {
  return (
    <button
      className='win-folder' 
      onClick={() => {onOpenContent(cloudId)}}>
      <CloudinaryContext cloudName="dav38qg9f">
        <Image publicId={cloudId} width="32" />
      </CloudinaryContext>
      <p style={{ color: '#282C34'}}>{name}</p>
    </button>
  )
}

Miniature.propTypes = {
  cloudId: PropTypes.string.isRequired,
  onOpenContent: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

function Collec ({collec, openContent}) {
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
  }

  return (
    <ul style={style}>
      {collec.map((elem) => {
        return (
            <li key={elem.id} >
              <Miniature 
              name={elem.name}
              cloudId={`Internet_end_credit/paintings/${elem.id}`}
              onOpenContent={openContent}/>
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
          <Image publicId={pic} width="500" />
        </div>
      </CloudinaryContext>
      
    </div>
  )
}

Galerie.propTypes = {
  pic: PropTypes.string.isRequired,
  onChangePic: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default class Paintings extends React.Component {
  state = {
    cloudIdCollec: this.props.cloudIdCollec,
    open: false,
    content: '',
    currentImage: ''
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
      currentImage: '',
      content: ''
    })
  }

  onChangePic = (direction) => {
    this.setState(state => {
      const indX = state.cloudIdCollec.findIndex(elem => `Internet_end_credit/paintings/${elem.id}` === state.currentImage)
      const nextImage = state.cloudIdCollec[indX + 1] ?  state.cloudIdCollec[indX + 1].id : state.cloudIdCollec[0].id
      const previousImage =  state.cloudIdCollec[indX - 1] ?  state.cloudIdCollec[indX - 1].id : state.cloudIdCollec[state.cloudIdCollec.length - 1].id
      const currentImage = direction === 'next' ? `Internet_end_credit/paintings/${nextImage}` : `Internet_end_credit/paintings/${previousImage}`
      console.log(currentImage)
      return ({
        currentImage
      })
    })
  }
  render () {
    return (
      <React.Fragment>
        {!this.state.open && <Miniature cloudId='Internet_end_credit/icons/bloc_note_icon_kmeia9' name='Read me' onOpenContent={this.onOpenNotePad}/>}  
        {!this.state.open && <Collec collec={this.state.cloudIdCollec} openContent={this.onOpenPaintings}/>}
        {this.state.open && this.state.content === "paintings" && <Galerie pic={this.state.currentImage} onClose={this.onClose} onChangePic={this.onChangePic}/>}
        {this.state.open && this.state.content === 'notepad' && <NotePad content={lorem} close={this.onClose}></NotePad>}
      </React.Fragment>
    )
  }
}

Paintings.propTypes = {
  cloudIdCollec: PropTypes.array.isRequired
}