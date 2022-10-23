import React, { createContext, Reducer, useReducer, useState } from 'react'
import { help } from '../data/text'

interface ConsoleContextProps {}

type type = 'EVAL_COMMAND' | 'SET_TEXT' | 'ADD_TEXT'
type payload = { command?: string; data?: string[][] }

type Action = {
  type: type
  payload: payload
}

type State = [] | string[][]

export const ConsoleContext = createContext<State>([])

export const DispatchTextContext = createContext<React.Dispatch<Action>>(
  () => null
)

const init = () => {
  return []
}

const commands: Record<string, (state: string[][]) => string[][]> = {
  reset: (_state) => [],
  help: (state) => [...state, ...help],
}

const invalidCommand = (state: string[][]) => {
  return [...state, ['invalidCommand']]
}

const reducer: Reducer<State, Action> = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'EVAL_COMMAND':
      console.log('evaluating command', payload.command)
      if (!payload.command || !commands[payload.command])
        return invalidCommand(state)
      return commands[payload.command](state)
    case 'SET_TEXT':
      if (payload.data) return payload.data
      return []
    case 'ADD_TEXT':
      if (payload.data) return [...state, ...payload.data]
      return state
    default:
      throw new Error('Missing action type')
  }
}

export const ConsoleProvider: React.FC<ConsoleContextProps> = ({
  children,
}) => {
  const [text, dispatchText] = useReducer(reducer, [], init)
  return (
    <ConsoleContext.Provider value={text}>
      <DispatchTextContext.Provider value={dispatchText}>
        {children}
      </DispatchTextContext.Provider>
    </ConsoleContext.Provider>
  )
}
