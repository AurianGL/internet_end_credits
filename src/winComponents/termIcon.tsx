import type React from "react";
import { useContext } from "react";
import { ProgramsContext } from "../context";
import type { Cle } from "../context/ProgramsContext";
import { Icon } from "./icon";

interface Props {
	name: string;
	cle: Cle;
}

export const TermIcon: React.FC<Props> = ({ name, cle }) => {
	const { programs, setPrograms } = useContext(ProgramsContext);
	return (
		<Icon
			imageId="pgr"
			name={name}
			openFolder={() =>
				setPrograms(
					programs.includes(cle)
						? programs.filter((e) => e !== cle)
						: [...programs, cle],
				)
			}
		/>
	);
};
