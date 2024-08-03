import React from "react";
import WindowsDrag from "./windowsDrag";

interface Props {
	active: boolean;
	arrInd: number;
	clickOk: () => void;
	clickX: (arrInd: number) => void;
}

export const ErrorMessage = ({ active, arrInd, clickOk, clickX }: Props) => {
	return (
		<WindowsDrag>
			<div className="error-container windows">
				<div className="win-header">
					<p className="win-title">Error Message</p>
					<div className="draggable flex-grow" />
					<button
						type="button"
						onClick={() => clickX(arrInd)}
						className="win-close"
					>
						<div className="win-x">x</div>
					</button>
				</div>
				<div className="error-content">
					<div className="error-message">
						The Internet has ended. <br /> Click OK to continue.
					</div>
					<button
						type="button"
						onClick={active ? clickOk : () => null}
						className="win-button text-black"
					>
						<div className="win-text-button">OK</div>
					</button>
				</div>
			</div>
		</WindowsDrag>
	);
};
