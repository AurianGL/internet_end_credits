import styled from "styled-components"
import { colors } from "./style-config"

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 150px;
  .content {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex-grow: 100;
  }
  .list {
    margin: 0;
    padding: 0;
    position: relative;
  }
  li {
    list-style-type: none;
  }
`
