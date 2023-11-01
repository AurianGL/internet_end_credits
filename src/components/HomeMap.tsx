import { useState } from "react"
import { whereIsHome } from "../data/whereIsHome"
import { Text } from './Text'

export const HomeMap = () => {
  const [index, setIndex] = useState(0)

  return (
    <>
    <button className="win-button" onClick={() => setIndex((index + 1 + whereIsHome.length ) % whereIsHome.length )}>
      NEXT
     </button>
    <Text text={whereIsHome[index]}/>
    </>
  )
}