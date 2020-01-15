import React from "react";
import PropTypes from "prop-types"
import ErrorMessage from "./errorMessage"
import WindowsDrag from "./windowsDrag";

export default class InternetHasEnded extends React.Component {
  state = {
    errorMessages: [{
      visible: true,
      active: true,
      top: 0,
      left: 0,
    },]
  }
  
  render () {
    const onClickX = (index) => {
      this.setState(state => {
        const errorMessages = state.errorMessages.map((item, i) => {
          if (i === index) {
            return {
              visible: false,
              active: false,
              top: item.top,
              left: item.left,
            }} else {
              return item
            }
          }
        )

        return  {
          errorMessages,
        }
      })      
    }
    
    const onClickOk = () => {
      this.setState(state => {
        const errorMessages = state.errorMessages.concat({
            visible: true,
            active: true,
            top: state.errorMessages[state.errorMessages.length - 1].top + 20,
            left: state.errorMessages[state.errorMessages.length - 1].left + 20,
          })
        return {
          errorMessages
        }
      })
    }
    return (
      <React.Fragment>
        <ul className='error-list'>
          {this.state.errorMessages.map((errorMessage, index) => {
            const errorPosition = {
              position: 'absolute',
              top: errorMessage.top,
              left: errorMessage.left,
            }
            return (
              <li key={index} style={errorPosition}>
                  { errorMessage.visible && 
                      <ErrorMessage 
                        active= {errorMessage.active}
                        arrInd={index} 
                        clickX={onClickX} 
                        clickOk={onClickOk}
                      />
                  }
                  { !errorMessage.visible &&                
                    <div className='blank-error'></div>
                  }
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    )
  }
}

