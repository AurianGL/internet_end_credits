import type React from "react";
import { createContext, useState } from "react";

type LoadingContextProps = {};

type Loading = {
	loading: boolean;
	setLoading: React.Dispatch<boolean>;
};

export const LoadingContext = createContext<Loading>({
	loading: false,
	setLoading: () => null,
});

export const LoadingProvider: React.FC<LoadingContextProps> = ({
	children,
}) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};
