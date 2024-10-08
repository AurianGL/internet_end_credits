import programs, {
	type programsComponents,
} from "../components/programs/index";
import wrappers, {
	type programsWrapper,
} from "../components/programs/wrappers";

type program = {
	name: string;
	PgrComponent: programsComponents;
	props: any;
	icon: keyof typeof ICONS;
	Wrapper: programsWrapper;
	bgColor?: string;
};

export type ProgramsType = Record<
	| "durer"
	| "contact"
	| "terminal"
	| "crux"
	| "painting"
	| "whereIsHome"
	| "paint",
	program
>;

export const ICONS = {
	folder: {
		open: "folder_open_pbgn79",
		close: "folder_close_pjgxhc",
	},
	rezo: {
		open: "rezo_unehyx",
		close: "rezo_unehyx",
	},
	pgr: {
		open: "pgr",
		close: "pgr",
	},
};

export const PROGRAMS: ProgramsType = {
	painting: {
		name: "Paintings",
		PgrComponent: programs.Tourniquet,
		Wrapper: wrappers.ProgramContainer,
		props: {
			target: "Paintings",
		},
		icon: "folder",
	},
	crux: {
		name: "As Above",
		PgrComponent: programs.Tourniquet,
		Wrapper: wrappers.ProgramContainer,
		props: {
			target: "Polaroids",
		},
		icon: "folder",
	},
	durer: {
		name: "Cult Dürer",
		PgrComponent: programs.Durer,
		Wrapper: wrappers.ProgramContainer,
		props: {
			target: "Durer",
		},
		icon: "folder",
	},
	paint: {
		name: "Paint",
		PgrComponent: programs.Paint,
		Wrapper: wrappers.ProgramContainer,
		props: {},
		icon: "folder",
	},
	terminal: {
		name: "Terminal",
		PgrComponent: programs.Home,
		Wrapper: wrappers.ProgramContainer,
		props: {},
		icon: "pgr",
		bgColor: "bg-black",
	},
	contact: {
		name: "Contact",
		PgrComponent: programs.Contact,
		Wrapper: wrappers.ErrorWrapper,
		props: {},
		icon: "rezo",
	},
	whereIsHome: {
		name: "Where is Home ?",
		PgrComponent: programs.PgrLoader,
		Wrapper: wrappers.LoaderContainer,
		props: {},
		icon: "pgr",
	},
};
