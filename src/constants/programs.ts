import programs from "../components/programs/index"
import { FC } from "react";

export const PROGRAMS: Record<string, {name: string, PgrComponent: FC<any>, props: any}> = {
  painting: {
    name: "Paintings",
    PgrComponent: programs.Tourniquet,
    props: {
      target: 'Paintings'
    }
  },
  crux: {
    name: "As Above",
    PgrComponent: programs.Tourniquet,
    props: {
      target: 'Polaroids'
    }
  },
  durer: {
    name: "Cult Dürer",
    PgrComponent: programs.Durer,
    props: {
      target: 'Durer'
    }
  },
  paint: {
    name: "Paint",
    PgrComponent: programs.Paint,
    props: {
    }
  },
  terminal: {
    name: "Terminal",
    PgrComponent: programs.Home,
    props: {
    }
  }
}