import React, { useContext, useMemo, useState } from "react";
import { ExternalLink } from "../components/ExternalLink";
import { PROGRAMS } from "../constants/programs";
import { ConsoleContext, ProgramsContext } from "../context";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { FolderIcon } from "./folder_icon";
import { Icon } from "./icon";
import { InternetHasEnded } from "./internettHasEnded";
import { Menu } from "./menu";
import { Paint } from "./paint";
import WindowsDrag from "./windowsDrag";

const Art = () => {
	const { mode } = useContext(ConsoleContext);
	const { programs, setPrograms } = useContext(ProgramsContext);

	const { height } = useWindowDimensions();

	const deriveHeight = useMemo(
		() => `calc(${height * 0.01}px * 100)`,
		[height],
	);

	return (
		<div className="grow" style={{ height: deriveHeight }}>
			<div className="p-5 grid grid-cols-2 gap-4 items-start w-fit justify-items-center">
				<Paint />
				{mode === "ANTHUME" && <FolderIcon name="Paintings" cle="painting" />}
				{mode === "POSTHUME" && <FolderIcon name="As Above" cle="crux" />}
				<FolderIcon name="Cult Dürer" cle="durer" />
				<FolderIcon name="Contact" cle="contact" />
				<ExternalLink
					href={`https://www.instagram.com/${
						mode === "POSTHUME" ? "htdc_anbf" : "bergenmij"
					}/`}
				>
					<Icon
						imageId={mode === "POSTHUME" ? "insta_hpxstq" : "instanew_nnrgon"}
						name="Instagram"
					/>
				</ExternalLink>
				<FolderIcon name="Terminal" cle="terminal" />
				<FolderIcon name="Where is Home" cle="whereIsHome" />
				{programs.map((program) => {
					const { name, PgrComponent, props, Wrapper, bgColor } =
						PROGRAMS[program];
					return (
						<Wrapper
							cle={program}
							margin={name !== "Terminal"}
							name={name}
							onCloseFolder={() =>
								setPrograms(programs.filter((e) => e !== program))
							}
							key={name}
							isOpen={programs.includes(program)}
							bgColor={bgColor}
						>
							<PgrComponent {...props} />
						</Wrapper>
					);
				})}
				<InternetHasEnded />
			</div>
		</div>
	);
};
interface Props {
	setType: (type: string) => void;
}

const WelcomeMessage = ({ setType }: Props) => {
	const { mode } = useContext(ConsoleContext);

	const { height } = useWindowDimensions();

	const deriveHeight = useMemo(
		() => `calc(${height * 0.01}px * 100)`,
		[height],
	);

	return (
		<div
			className="w-full text-left flex grow justify-center items-center"
			style={{ height: deriveHeight }}
		>
			<WindowsDrag>
				<div className="error-container windows" style={{ maxHeight: "100vw" }}>
					<div className="win-header">
						<p className="win-title">Welcome to AurianGL</p>
					</div>
					<div className="error-content">
						<div className="error-message font-death text-lg">
							As above, so below.
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<button
								type="button"
								onClick={() => setType("art")}
								className={`win-button ${
									mode === "ANTHUME" ? "text-black" : "text-white"
								}`}
							>
								<div
									className={`border-dotted border-2 ${
										mode === "ANTHUME" ? "border-black" : "border-white"
									}`}
								>
									1995
								</div>
							</button>
							{/* https://www.youtube.com/watch?v=J9FImc2LOr8 */}
							<ExternalLink href="https://www.spacejam.com/1996/">
								<div
									className={`win-button ${
										mode === "ANTHUME" ? "text-black" : "text-white"
									}`}
								>
									<div
										className={`border-dotted border-2 ${
											mode === "ANTHUME" ? "border-black" : "border-white"
										}`}
									>
										1996
									</div>
								</div>
							</ExternalLink>
						</div>
					</div>
				</div>
			</WindowsDrag>
		</div>
	);
};

export const Welcome = () => {
	const [type, setType] = useState("welcome");
	const { height } = useWindowDimensions();

	const deriveHeight = useMemo(
		() => `calc(${height * 0.01}px * 100)`,
		[height],
	);

	return (
		<div className="flex flex-col" style={{ height: deriveHeight }}>
			{type === "welcome" && <WelcomeMessage setType={setType} />}
			{type === "art" && <Art />}
			<Menu setType={setType} />
		</div>
	);
};
