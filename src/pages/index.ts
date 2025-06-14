import { NinetyFive } from "./1995";
import { BlueScreen } from "./BlueScreen";
import { DeRamp } from "./DeRamp";
import { Home } from "./Home";
import { WhereIsHome } from "./WhereIsHome";
import { War } from "./War";

const pages: Record<string, React.FC> = {
  Home,
  DeRamp,
  NinetyFive,
  BlueScreen,
  WhereIsHome,
  War,
};

export default pages;
