import React from 'react'
import PropTypes from 'prop-types'
import Icon from './icon'
import Folder from './folder'

export default class FolderIcon extends React.Component {
  state = {
    open: false,
    name: this.props.name,
    content: this.props.content
  }

  openFolder = () => {
    this.setState({
      open: true
    })
  }

  closeFolder = () => {
    this.setState({
      open: false
    })
  }

  render () {
    return (
      <React.Fragment>
        <Icon 
          imageId={this.state.open ? 'folder_open_pbgn79' : 'folder_close_pjgxhc'}
          name={this.state.name}
          openFolder={() => this.openFolder()}
        />
        {this.state.open && (
           <Folder 
            name={this.state.name}
            onCloseFolder={this.closeFolder}>
            {this.state.content}
          </Folder>
        )}
      </React.Fragment>
    )
  }
}

FolderIcon.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.func
}