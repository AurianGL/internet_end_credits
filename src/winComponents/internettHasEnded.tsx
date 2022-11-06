import React, { Reducer, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./errorMessage"
import Icon from './icon'

interface errorMessage {
  visible: boolean
  active: boolean
  top: number
  left: number
}

const initialError: errorMessage[] = []

const errorReducer: Reducer<errorMessage[] | undefined, { action: string, index?: number }> = (state, payload) => {
  const { action, index } = payload
  if (typeof state === 'undefined') state = []
  switch (action) {
    case 'INIT':
      return [{
        visible: true,
        active: true,
        top: 0,
        left: 0,
      }]
    case 'OK':
      return [...state, {
        visible: true,
        active: true,
        top: state[state.length - 1].top + 20,
        left: state[state.length - 1].left + 20,
      }]
    case 'X':
      const update = state.map((item, i) => {
        if (i === index) {
          return {
            visible: false,
            active: false,
            top: item.top,
            left: item.left,
          }
        } else {
          return item
        }
      })
      if (!update?.some((errorMessage) => errorMessage.visible)) return []
      return update
    case 'BUG':
      return [...state, {
        visible: true,
        active: true,
        top: Math.floor(Math.random() * window.innerHeight + 1),
        left: Math.floor(Math.random() * window.innerWidth + 1),
      }]
    default:
      break;
  }

}


export const InternetHasEnded: React.FC = () => {
  const [internet, setInternet] = useState(false)
  const [errorMessages, dispathErrorMessages] = useReducer(errorReducer, initialError)
  const history = useHistory()

  useEffect(() => {
    if (errorMessages?.length === 0 && internet) {
      setInternet(false)
    }
    if (errorMessages && errorMessages.length > 10 && internet) {
      const interval = setInterval(() => {
        dispathErrorMessages({ action: 'BUG' })
      }, 100)
      if (errorMessages && errorMessages.length > 200) {
        clearInterval(interval)
        history.push('/bluescreen')
      }
    }
  }, [errorMessages, internet, history])


  return (
    <React.Fragment>
      <Icon
        imageId={'map_icon_kwxthn'}
        name={'Internet'}
        openFolder={() => {
          dispathErrorMessages({ action: 'INIT' })
          setInternet(true)
        }}
      />
      {internet && errorMessages && (
        <div style={{ position: 'absolute', top: '0', left: '0' }}>
          <ul className='error-list'>
            {errorMessages.map((errorMessage, index) => {
              const errorPosition = {
                top: errorMessage.top,
                left: errorMessage.left,
              }
              return (
                <li key={index} style={{ ...errorPosition, position: 'absolute' }}>
                  {errorMessage.visible &&
                    <ErrorMessage
                      active={errorMessage.active}
                      arrInd={index}
                      clickX={() => dispathErrorMessages({ action: 'X', index: index })}
                      clickOk={() => dispathErrorMessages({ action: 'OK' })}
                    />
                  }
                  {!errorMessage.visible &&
                    <div className='blank-error'></div>
                  }
                </li>
              )
            })}
          </ul>
        </div>)
      }
    </React.Fragment>
  )
}

