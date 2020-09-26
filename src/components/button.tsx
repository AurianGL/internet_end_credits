import React from "react"
import styled from "styled-components"
import {colors} from './style-config'

export const WinButton = styled.div`
  background: ${colors.windowsGrey};
  min-width: 75px;
  min-height: 20px;
  border-width: 1px 3px 3px 1px;
  border-style: solid;
  border-color: black;
  color: black;
  text-decoration: none;
  padding: 2px;
  text-align: center;
  p {
    border-style: dotted;
    color: black;
    border-width: 1px;
  }
`
