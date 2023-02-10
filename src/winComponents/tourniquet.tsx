import React, { Dispatch, Reducer, useContext, useReducer, useState } from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';
import {NotePad} from './notepad';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { FOLDERS, PROJECT, polaIds, paintingsIds } from '../constants/images'
import { NOTEPAD } from '../data/text';
import { ConsoleContext } from '../context';

const picIdsRec: Record<string, { id: string, name: string }[]> = {
  POLAROIDS: polaIds,
  PAINTINGS: paintingsIds
}

function Miniature({ cloudId, onOpenContent, name }: MiniatureProps) {
  const {mode} = useContext(ConsoleContext);

  return (
    <button
      className='win-folder'
      onClick={onOpenContent}>
      <CloudinaryContext cloudName="dav38qg9f">
        <Image publicId={cloudId} width="32" />
      </CloudinaryContext>
      <p className={` ${mode === 'ANTHUME' ? 'text-black' : 'text-white'}`}>{name}</p>
    </button>
  )
}

interface MiniatureProps {
  cloudId: string
  onOpenContent: () => void
  name: string
}

const Collec = ({ collec, setInitialPicIndex, targetKey }: CollecProps) => {
  return (
    <ul className='flex flex-wrap'>
      {collec.map((elem, index) => {
        return (
          <li key={elem.id} >
            <Miniature
              name={elem.name}
              cloudId={[PROJECT, FOLDERS[targetKey], elem.id].join('/')}
              onOpenContent={() => setInitialPicIndex(index)} />
          </li>
        )
      })
      }
    </ul>
  )
}

interface CollecProps {
  collec: { id: string, name: string }[]
  setInitialPicIndex: Dispatch<React.SetStateAction<number | null>>
  targetKey: string
}

type type = 'NEXT' | 'PREVIOUS'

type Action = {
  type: type
  targetKey: string
}

type State = number

const cycleImages: Reducer<State, Action> = (state, action) => {
  const { type, targetKey } = action
  const picIdsLength = picIdsRec[targetKey].length
  switch (type) {
    case 'NEXT':
      return (state + 1 + picIdsLength)  % picIdsLength
    case 'PREVIOUS':
      return (state - 1 + picIdsLength) % picIdsLength
    default:
      throw new Error('Missing action type')
  }
}

const Galerie = ({ pic, setContent, targetKey }: GalerieProps) => {
  const {mode} = useContext(ConsoleContext);

  const cloud = new Cloudinary({
    cloud: {
      cloudName: "dav38qg9f"
    }
  })
  const [imageIndex, setImageIndex] = useReducer(cycleImages, pic, () => pic)
  return (
    <>
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button className={`win-button ${mode === 'ANTHUME' ? 'text-black' : 'text-white'}`} onClick={() => { setImageIndex({ type: 'PREVIOUS', targetKey: targetKey }) }}>
          <div className={`border-dotted border-2 ${mode === 'ANTHUME' ?  'border-black' : 'border-white'}`}>PREVIOUS</div>
        </button>
        <button className={`win-button ${mode === 'ANTHUME' ? 'text-black' : 'text-white'}`} onClick={() => setContent('index')}>
          <div className={`border-dotted border-2 ${mode === 'ANTHUME' ?  'border-black' : 'border-white'}`}>CLOSE</div>
        </button>
        <button className={`win-button ${mode === 'ANTHUME' ? 'text-black' : 'text-white'}`} onClick={() => { setImageIndex({ type: 'NEXT', targetKey: targetKey }) }}>
          <div className={`border-dotted border-2 ${mode === 'ANTHUME' ?  'border-black' : 'border-white'}`}>NEXT</div>
        </button>
      </div>
      <div className='flex justify-center flex-grow'>
        <AdvancedImage
          cldImg={cloud.image([PROJECT, FOLDERS[targetKey], picIdsRec[targetKey][imageIndex].id].join('/'))}
          className='gal-img'
        />
      </div>
    </>
  )
}

interface GalerieProps {
  pic: number
  setContent: Dispatch<React.SetStateAction<content>>
  targetKey: string
}

type content = 'index' | 'show' | 'text'

export const Tourniquet: React.FC<TourniquetProps>  = ({ target }) => {
  const [content, setContent] = useState<content>('index')
  const [initialPicIndex, setInitialPicIndex] = useState<number | null>(null)
  const targetKey = target.toUpperCase()

  return (
    <>
      {content === 'index' && <>
        <Miniature cloudId={[PROJECT, FOLDERS.ICONS, 'bloc_note_icon_kmeia9'].join('/')} name='Read me' onOpenContent={() => setContent('text')} />
        <Collec
          collec={picIdsRec[targetKey]}
          setInitialPicIndex={(index) => {
            setInitialPicIndex(index)
            setContent('show')
          }}
          targetKey={targetKey} />
      </>}
      {content === "show" && initialPicIndex !== null && <Galerie pic={initialPicIndex} setContent={setContent} targetKey={targetKey} />}
      {content === 'text' && <NotePad content={NOTEPAD[targetKey]} close={() => setContent('index')} />}
    </>
  )

}

interface TourniquetProps {
  target: string
}