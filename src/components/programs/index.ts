import { Tourniquet } from '../../winComponents/tourniquet'
import { Paint } from '../../winComponents/paint'
import { Durer } from '../../winComponents/durer'
import { Home } from '../../pages/Home'
import { Contact } from '../../winComponents/Contact'
import { PgrLoader } from '../PgrLoader'

export type programsComponents = typeof Tourniquet | typeof Paint | typeof Durer | typeof Home | typeof Contact | typeof PgrLoader
const programs: Record<string, programsComponents> = {Home, Tourniquet, Paint, Durer, Contact, PgrLoader}

export default programs