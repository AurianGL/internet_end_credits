import { Home } from "./Home";
import { DeRamp } from "./DeRamp";
import { NinetyFive } from "./1995";
import { BlueScreen } from "./BlueScreen";
import { WhereIsHome } from "./WhereIsHome";
import { Game } from "./Game";

const pages: Record<string, React.FC> = {
  Home,
  DeRamp,
  NinetyFive,
  BlueScreen,
  WhereIsHome,
  Game,
};

export default pages;
