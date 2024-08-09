import { NinetyFive } from "./1995";
import { BlueScreen } from "./BlueScreen";
import { DeRamp } from "./DeRamp";
import { Home } from "./Home";
import { WhereIsHome } from "./WhereIsHome";
import { TheGame } from "./TheGames/TheGame";

const pages: Record<string, React.FC> = {
  Home,
  DeRamp,
  NinetyFive,
  BlueScreen,
  WhereIsHome,
  TheGame,
};

export default pages;
