import React from "react";
import PropTypes from "prop-types"
import ErrorMessage from "./errorMessage"



export default class InternetHasEnded extends React.Component {
  state = {
    errorMessages: [{
      visible: true,
      active: true,
    },]
  }
  
  render () {
    const onClickX = (index) => {
      console.log(index)
      this.setState(state => {
        const errorMessages = this.state.errorMessages.map((item, i) => {
          if (i === index) {
            return {
              visible: false,
              active: false,
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
        const errorMessages = state.errorMessages.concat({visible: true, active: true})
        return {
          errorMessages
        }
      })
    }
    return (
      <React.Fragment>
        <ul>
          {this.state.errorMessages.map((errorMessage, index) => {
            return (
              <li key={index}>
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

