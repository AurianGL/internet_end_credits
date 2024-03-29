import React from "react"
import { ProgramContainer } from "./ProgramContainer"
import { Cle } from "../../context/ProgramsContext"
import { ErrorWrapper } from "./ErrorWrapper"
import { LoaderContainer } from "./LoaderContainer"

export type WrapperProps = {
  name: string
  cle: Cle
  onCloseFolder: () => void
  margin?: boolean
  isOpen?: boolean
  bgColor?: string
}

export type programsWrapper = React.FC<WrapperProps>
const wrappers: Record<string, programsWrapper> = {ProgramContainer, ErrorWrapper, LoaderContainer}

export default wrappers