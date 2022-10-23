import React, { useContext, useEffect, useReducer, useState } from "react";
import { DispatchContext } from "../context";
import { PolyTextType } from "../types";
import { KANJI } from '../constants/kanji'

interface TextProps {
  text: PolyTextType
}

export const Text: React.FC<TextProps> = (props) => {
  const { text } = props
  const [renderText, setRenderText] = useState<string[][]>([])
  useEffect(() => {
    const addSentence = setTimeout(() => {
      if (renderText.length < text.length) {
        setRenderText([...renderText, text[renderText.length]])
        return
      }
      setRenderText(text)
    }, 1000)
    return () => clearTimeout(addSentence)
  }, [text, renderText])
  return (
    <div className=" h-auto">
      {renderText.map((sentences, index) => (
        <Sentence
          key={'sentence#' + index}
          sentences={sentences}
          sentenceIndex={index}
        />
      ))}
    </div>
  )
}

interface SentenceProps {
  sentences: string[]
  sentenceIndex: number
}

const indexReducer = (state: number, action: { payload: string[] }) => {
  return (state + 1) % action.payload.length
}

export const Sentence: React.FC<SentenceProps> = (props) => {
  const { sentences, sentenceIndex } = props
  const [index, setIndex] = useReducer(indexReducer, 0)
  const [splitSentence, setSplitSentence] = useState<string[]>([])
  useEffect(() => {
    setSplitSentence(sentences[index].split(''))
  }, [index, sentences])
  return (
    <p onMouseEnter={() => setIndex({ payload: sentences })}>
      {'> '}
      {splitSentence.map((character, index) => (
        <Character
          key={'char#' + index}
          character={character}
          charIndex={index}
          sentenceIndex={sentenceIndex}
        />
      ))}
    </p>
  )
}

interface CharacterProps {
  character: string
  charIndex: number
  sentenceIndex: number
}

export const Character: React.FC<CharacterProps> = (props) => {
  const dispatch = useContext(DispatchContext)
  const { character, charIndex, sentenceIndex } = props
  const [ASCII_CODE, setASCII_CODE] = useState(() => {
    const add = character.charCodeAt(0) - (charIndex + sentenceIndex)
    return add >= 0 ? add : 122 + add
  })
  useEffect(() => {
    if (ASCII_CODE > 122) setASCII_CODE(32)
    const incrementASCII = setTimeout(() => {
      if (character.charCodeAt(0) !== ASCII_CODE) setASCII_CODE(ASCII_CODE + 1)
    }, 100)
    return () => {
      clearTimeout(incrementASCII)
    }
  }, [ASCII_CODE, character])

  return (
    <span
      onClick={() => dispatch({ type: 'ADD_CHAR', payload: character })}
      className="hover:bg-gray-200 hover:text-black"
    >
      {character.charCodeAt(0) !== ASCII_CODE && KANJI[ASCII_CODE - 32]}
      {character.charCodeAt(0) === ASCII_CODE &&
        String.fromCharCode(ASCII_CODE)}
    </span>
  )
}
