import React, { useContext } from "react";
import { Welcome } from "../winComponents/welcome";
import "../winComponents/style/_index.scss";
import { ConsoleContext } from "../context";

export const NinetyFive = () => {
	const { mode } = useContext(ConsoleContext);

	return (
		<div
			className={`flex justify-start align-start fixed text-center ${mode === "ANTHUME" ? "bg-windows-700" : "bg-gray-900"} w-screen`}
		>
			<Welcome />
			<div className="w-full h-full absolute z-50 bg-scanline bg-[length:4px_4px] pointer-events-none" />
			<div className="w-full h-full absolute z-50 bg-vignette pointer-events-none" />
			{mode === "POSTHUME" && (
				<div
					className={`${window.innerWidth > 500 ? "animate-static" : ""} w-full h-full absolute z-50 bg-noise pointer-events-none bg-blend-difference opacity-20`}
					style={{
						background:
							"repeating-radial-gradient(#000 0 0.0001%,#fff 0 0.0002%) 60% 60%/3000px 3000px,repeating-conic-gradient(#000 0 0.0001%,#fff 0 0.0002%) 40% 40%/3000px 3000px",
					}}
				/>
			)}
		</div>
	);
};
