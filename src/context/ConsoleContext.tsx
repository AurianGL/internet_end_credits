import type React from "react";
import { type Reducer, createContext, useReducer } from "react";
import { exlibris, help } from "../data/text";

interface ConsoleContextProps {
	children: React.ReactNode;
}

type type = "EVAL_COMMAND" | "SET_TEXT" | "ADD_TEXT";
type payload = { command?: string; data?: string[][] };

type Action = {
	type: type;
	payload: payload;
};

type State = {
	mode: "ANTHUME" | "POSTHUME";
	text: [] | string[][];
};

export const ConsoleContext = createContext<State>({
	mode: "ANTHUME",
	text: [],
});

export const DispatchTextContext = createContext<React.Dispatch<Action>>(
	() => null,
);

const notOverYet = ({ mode, text }: State) => ({
	mode,
	text: [...text, ["Not Over Yet"]],
});

const invalidCommand = ({ mode, text }: State) => ({
	mode,
	text: [...text, ["invalidCommand"]],
});

type command = (state: State) => State;

const commands: Record<string, command> = {
	reset: ({ mode, text }) => ({ mode: "ANTHUME", text: [] }),
	help: ({ mode, text }) => ({ mode, text: [...text, ...help] }),
	posthume: ({ mode, text }) => {
		if (mode === "POSTHUME")
			return { mode, text: [...text, ["you are already in posthume mode"]] };
		return {
			mode: "POSTHUME",
			text: [...text, ["you are now in posthume mode"]],
		};
	},
	anthume: ({ mode, text }) => {
		if (mode === "ANTHUME")
			return { mode, text: [...text, ["you are already in anthume mode"]] };
		return {
			mode: "ANTHUME",
			text: [...text, ["you are now in anthume mode"]],
		};
	},
	tree: notOverYet,
	exlibris: ({ mode, text }) => ({ mode, text: [...text, ...exlibris] }),
};

const reducer: Reducer<State, Action> = (state, action) => {
	const { type, payload } = action;
	const { mode, text } = state;
	switch (type) {
		case "EVAL_COMMAND":
			if (!payload.command || !commands[payload.command.toLowerCase()])
				return invalidCommand(state);
			return commands[payload.command.toLowerCase()](state);
		case "SET_TEXT":
			if (payload.data) return { mode, text: payload.data };
			return { mode, text: [] };
		case "ADD_TEXT":
			if (payload.data) return { mode, text: [...text, ...payload.data] };
			return state;
		default:
			throw new Error("Missing action type");
	}
};

export const ConsoleProvider: React.FC<ConsoleContextProps> = ({
	children,
}) => {
	const [text, dispatchText] = useReducer(reducer, {
		mode: "ANTHUME",
		text: [],
	});

	return (
		<ConsoleContext.Provider value={text}>
			<DispatchTextContext.Provider value={dispatchText}>
				{children}
			</DispatchTextContext.Provider>
		</ConsoleContext.Provider>
	);
};
