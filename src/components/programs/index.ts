import { Tourniquet } from '../../winComponents/tourniquet'
import { Paint } from '../../winComponents/paint'
import { Durer } from '../../winComponents/durer'
import { Home } from '../../pages/Home'
import { Contact } from '../../winComponents/Contact'

export type programsComponents = typeof Tourniquet | typeof Paint | typeof Durer | typeof Home | typeof Contact
const programs: Record<string, programsComponents> = {Home, Tourniquet, Paint, Durer, Contact}

export default programs