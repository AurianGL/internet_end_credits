import type React from "react";
import { type Reducer, createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router";

type SecretContextProps = {};

type Action =
	| { type: "ADD_CHAR"; payload: string }
	| { type: "REMOVE_CHAR"; payload: number }
	| { type: "RESET" };

type State = [] | string[];

export const SecretContext = createContext<State>([]);

export const DispatchContext = createContext<React.Dispatch<Action>>(
	() => null,
);

const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case "ADD_CHAR":
			if (state.length > 9) return [];
			if (action.payload !== " ") return [...state, action.payload];
			return state;
		case "REMOVE_CHAR":
			return state.filter((_, i) => i !== action.payload);
		case "RESET":
			return [];
		default:
			throw new Error();
	}
};

// const effect: Record<string, () => void> = {
//   deramp: () => {
//     history.push("/deramp");
//     dispatch({ type: "RESET" });
//   }
// }

export const SecretProvider: React.FC<SecretContextProps> = ({ children }) => {
	const navigate = useNavigate();
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		switch (state.join("")) {
			case "deramp":
				navigate("/deramp");
				dispatch({ type: "RESET" });
				break;
			case "1995":
				navigate("/1995");
				dispatch({ type: "RESET" });
		}
		return () => {};
	}, [state, navigate]);
	return (
		<SecretContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{children}
			</DispatchContext.Provider>
		</SecretContext.Provider>
	);
};
