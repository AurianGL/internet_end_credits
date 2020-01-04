import React from "react";
import PropTypes from "prop-types"
import ErrorMessage from "./errorMessage"



export default class InternetHasEnded extends React.Component {
  state = {
    errorMessages: ["error"]
  }
  
  render () {
    const onClickX = (index) => {
      console.log(index)
    }
    
    const onClickOk = () => {
      this.setState(state => {
        const errorMessages = state.errorMessages.concat("error")
        return {
          errorMessages
        }
      })
    }
    return (
      <React.Fragment>
      <ul>
        {this.state.errorMessages.map((errorMessage, index) => {
          return (<li key={index}>
            <ErrorMessage 
              arrInd={index} 
              active={true} 
              clickX={onClickX} 
              clickOk={onClickOk}
            />
          </li>)
        })}
      </ul>
        
      </React.Fragment>
    )
  }
}
