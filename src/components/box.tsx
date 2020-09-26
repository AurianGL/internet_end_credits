import styled from "styled-components"
import { colors } from "./style-config"

export const GenericWindowsBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100vw;
  .generic-content {
    flex-grow: 100;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .generic-inner-content {
    border: 2px solid;
    border-top-color: ${colors.windowsShadow};
    border-right-color: ${colors.windowsLight};
    border-bottom-color: ${colors.windowsLight};
    border-left-color: ${colors.windowsShadow};
    background-color: white;
    flex-grow: 100;
    margin: 3px;
    padding: 20px;

    ul {
      padding: 0;
      margin: 0;
    }
  }
`
export const HeaderWindowsBox = styled.div`
  background-color: ${colors.blue95};
  padding: 4px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  p {
    text-align: left;
    margin: 0px;
    padding: 0px;
    color: white;
  }
  .win-close {
    position: relative;
    background-color: #d6d3ce;
    color: black;
    width: 19px;
    height: 19px;
    border: 2px solid;
    border-top-color: ${colors.windowsLight};
    border-left-color: ${colors.windowsLight};
    border-bottom-color: ${colors.windowsShadow};
    border-right-color: ${colors.windowsShadow};
    font-size: 16px;
    font-family: inherit;
    font-weight: bold;

    .win-x {
      position: absolute;
      bottom: 0px;
      left: 3px;
    }
  }
`
