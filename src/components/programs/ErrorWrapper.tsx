import React, { useContext, useRef } from "react";
import { ProgramsContext } from "../../context";
import WindowsDrag from "../../winComponents/windowsDrag";
import type { programsWrapper } from "./wrappers";

export const ErrorWrapper: programsWrapper = ({
	cle,
	name,
	onCloseFolder,
	children,
}) => {
	const { currentProgram, setCurrentProgram } = useContext(ProgramsContext);
	const wrapperRef = useRef(null);

	return (
		<WindowsDrag>
			<div
				onClick={() => setCurrentProgram(cle)}
				ref={wrapperRef}
				className={`absolute box-border error-container windows ${
					currentProgram === cle ? "z-40" : "z-auto"
				}`}
				style={{ height: "20vh" }}
			>
				<div className="win-header">
					<p className="win-title">{name}</p>
					<div className="draggable flex-grow"></div>
					<div className="flex items-center gap-1">
						<button onClick={onCloseFolder} className="win-close">
							<div className="win-x">x</div>
						</button>
					</div>
				</div>
				<div className="flex grow flex-column">
					{children}
					<div style={{ height: "20px" }}></div>
				</div>
			</div>
		</WindowsDrag>
	);
};
