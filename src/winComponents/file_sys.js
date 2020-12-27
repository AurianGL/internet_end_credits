import React from 'react';

export default class FileSys extends React.Component {
  state = {
    programs: []
  }

  onOpenProgram = ({program}) => {
    this.setState(state => {
      const programs = state.programs.concat(program)
      return {
        programs
      }
    })
  }

  onClickX = ({program}) => {
    this.setState(state => {
      const programs = state.programs.filter(items => items !== program )
      return  {
        programs,
      }
    })      
  }

  render () {
    return (
      <React.Fragment>
        {this.state.programs.map(Program => <Program/>)}
      </React.Fragment>
    )
  }
}