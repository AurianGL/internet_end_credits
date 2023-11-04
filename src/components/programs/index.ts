import { Tourniquet } from '../../winComponents/tourniquet'
import { Paint } from '../../winComponents/paint'
import { Durer } from '../../winComponents/durer'
import { Home } from '../../pages/Home'
import { Contact } from '../../winComponents/Contact'
import { PgrLoader } from '../PgrLoader'
import { WinAmp } from './WinAmp'
import { ArrayElement } from '../../utils/tsUtils'

const Programs = [ 
  Tourniquet,
  Paint,
  Durer,
  Contact,
  WinAmp,
  Home,
  PgrLoader
] as const

export type ProgramType =  ArrayElement<typeof Programs>

const programs: Record<string, ProgramType> = {
  Tourniquet,
  Paint,
  Durer,
  Contact,
  WinAmp,
  Home,
  PgrLoader
}

export default programs