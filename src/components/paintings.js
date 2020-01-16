import React from 'react';
import {Image, CloudinaryContext} from 'cloudinary-react';
import PropTypes from 'prop-types'


function Miniature ({cloudId, onOpenContent, name}) {
  return (
    <button onClick={() => {onOpenContent(cloudId)}}>
      <CloudinaryContext cloudName="dav38qg9f">
        <Image publicId={cloudId} width="32" />
      </CloudinaryContext>
      <p>{name}</p>
    </button>
  )
}

Miniature.propTypes = {
  cloudId: PropTypes.string.isRequired,
  onOpenContent: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

function Collec ({collec, openContent}) {
  return (
    <ul>
      {collec.map((elem) => {
        return (
            <li key={elem.id}>
              <Miniature cloudId={elem.id} onOpenContent={openContent} name={elem.name}/>
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

function Gallerie ({pic, onChangePic, onClose}) {
  return (
    <React.Fragment>
      <button onClick={() => {onChangePic('previous')}}>PREVIOUS</button>
      <CloudinaryContext cloudName="dav38qg9f">
        <div>
          <Image publicId={pic} width="500" />
        </div>
      </CloudinaryContext>
      <button onClick={() => {onChangePic('next')}}>NEXT</button>
      <button onClick={onClose}>CLOSE</button>
    </React.Fragment>
  )
}

Gallerie.propTypes = {
  pic: PropTypes.string.isRequired,
  onChangePic: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

function Sheep () {
  return (
    <CloudinaryContext cloudName="dav38qg9f">
      <div>
        <Image publicId={`zvrvlurtn1vsqtbnaboy`} width="500" />
      </div>
    </CloudinaryContext>
  )
}

export default class Paintings extends React.Component {
  state = {
    cloudIdCollec: this.props.cloudIdCollec,
    open: false,
    currentImage: ''
  }

  onOpenContent = (cloudId) => {
    this.setState({
      open: true,
      currentImage: cloudId
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
      const indX = state.cloudIdCollec.findIndex(elem => elem.id === state.currentImage)
      const nextImage = state.cloudIdCollec[indX + 1] ?  state.cloudIdCollec[indX + 1].id : state.cloudIdCollec[0].id
      const previousImage =  state.cloudIdCollec[indX - 1] ?  state.cloudIdCollec[indX - 1].id : state.cloudIdCollec[state.cloudIdCollec.length - 1].id
      const currentImage = direction === 'next' ? nextImage : previousImage  
      return ({
        currentImage
      })
    })
  }
  render () {
    return (
      <React.Fragment>
        {!this.state.open && <Collec collec={this.state.cloudIdCollec} openContent={this.onOpenContent}/>}
        {this.state.open && <Gallerie pic={this.state.currentImage} onClose={this.onClose} onChangePic={this.onChangePic}/>}
      </React.Fragment>
    )
  }
}

Paintings.propTypes = {
  cloudIdCollec: PropTypes.array.isRequired
}