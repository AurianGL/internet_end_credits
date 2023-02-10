import { Tourniquet } from '../../winComponents/tourniquet'
import { Paint } from '../../winComponents/paint'
import { Durer } from '../../winComponents/durer'
import { Home } from '../../pages/Home'

const programs: Record<string, React.FC<any>> = {Home, Tourniquet, Paint, Durer}

export default programs