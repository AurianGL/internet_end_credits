import type React from "react";
import { useContext } from "react";
import { ICONS, PROGRAMS } from "../constants/programs";
import { ProgramsContext } from "../context";
import type { Cle } from "../context/ProgramsContext";
import { Icon } from "./icon";

interface Props {
	name: string;
	cle: Cle;
}

export const FolderIcon: React.FC<Props> = ({ name, cle }) => {
	const { programs, setPrograms, setCurrentProgram } =
		useContext(ProgramsContext);
	const icon = PROGRAMS[cle].icon;

	return (
		<Icon
			imageId={programs.includes(cle) ? ICONS[icon].open : ICONS[icon].close}
			name={name}
			openFolder={() => {
				setPrograms(
					programs.includes(cle)
						? programs.filter((e) => e !== cle)
						: [...programs, cle],
				);
				setCurrentProgram(cle);
			}}
		/>
	);
};
