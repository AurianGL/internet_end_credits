import React, { useContext } from "react";
import { SecretContext } from "../context/SecretContext";

interface TextProps {
  text: string[];
}

export const Text: React.FC<TextProps> = (props) => {
  const { text } = props;
  return (
    <div className="font-mono text-red-500 h-auto border-red-500 border-r-2 border-b-2">
      {text.map((sentence) => (
        <Sentence sentence={sentence} />
      ))}
    </div>
  );
};

interface SentenceProps {
  sentence: string;
}

export const Sentence: React.FC<SentenceProps> = (props) => {
  const { sentence } = props;
  const splitSentence = sentence.split("");
  return (
    <p>
      {splitSentence.map((character) => (
        <Character character={character} />
      ))}
    </p>
  );
};

interface CharacterProps {
  character: string;
}

export const Character: React.FC<CharacterProps> = (props) => {
  const {addSecret} = useContext(SecretContext)
  const { character } = props;
  return <span onClick={() => addSecret(character)} className="hover:bg-red-500 hover:text-white">{character}</span>;
};
