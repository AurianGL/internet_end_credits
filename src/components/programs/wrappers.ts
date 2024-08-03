import type React from "react";
import type { Cle } from "../../context/ProgramsContext";
import { ErrorWrapper } from "./ErrorWrapper";
import { LoaderContainer } from "./LoaderContainer";
import { ProgramContainer } from "./ProgramContainer";

export type WrapperProps = {
	name: string;
	cle: Cle;
	onCloseFolder: () => void;
	margin?: boolean;
	isOpen?: boolean;
	bgColor?: string;
};

export type programsWrapper = React.FC<WrapperProps>;
const wrappers: Record<string, programsWrapper> = {
	ProgramContainer,
	ErrorWrapper,
	LoaderContainer,
};

export default wrappers;
