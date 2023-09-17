import programs from "../components/programs/index"
import { programsComponents } from "../components/programs/index";

export type ProgramsType = Record<
  string,
  {
    name: string,
    PgrComponent: programsComponents,
    props: any,
    icon: keyof typeof ICONS
    Wrapper: string
  }
>


export const ICONS = {
  folder: {
    open: 'folder_open_pbgn79',
    close: 'folder_close_pjgxhc',
  },
  rezo: {
    open: 'rezo_unehyx',
    close: 'rezo_unehyx',
  },
  pgr: {
    open: 'pgr',
    close: 'pgr',
  },
}


export const PROGRAMS: ProgramsType = {
  painting: {
    name: "Paintings",
    PgrComponent: programs.Tourniquet,
    Wrapper: 'folder',
    props: {
      target: 'Paintings'
    },
    icon: 'folder'
  },
  crux: {
    name: "As Above",
    PgrComponent: programs.Tourniquet,
    Wrapper: 'folder',
    props: {
      target: 'Polaroids'
    },
    icon: 'folder'
  },
  durer: {
    name: "Cult Dürer",
    PgrComponent: programs.Durer,
    Wrapper: 'folder',
    props: {
      target: 'Durer'
    },
    icon: 'folder'
  },
  paint: {
    name: "Paint",
    PgrComponent: programs.Paint,
    Wrapper: 'folder',
    props: {
    },
    icon: 'folder'
  },
  terminal: {
    name: "Terminal",
    PgrComponent: programs.Home,
    Wrapper: 'folder',
    props: {
    },
    icon: 'pgr'
  },
  contact: {
    name: "Contact",
    PgrComponent: programs.Contact,
    Wrapper: 'error',
    props: {
    },
    icon: 'rezo'
  }
}