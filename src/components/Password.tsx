import { useContext } from "react";
import { DispatchContext, SecretContext } from "../context/SecretContext";

type PasswordProps = {};

export const Password: React.FC<PasswordProps> = () => {
	const secret = useContext(SecretContext);
	const dispatch = useContext(DispatchContext);
	return (
		<div className="flex justify-start bg-black">
			{secret.length > 0 &&
				secret.map((letter: string, index: number) => (
					<p
						onClick={() => dispatch({ type: "REMOVE_CHAR", payload: index })}
						className="m-1 font-mono font-black text-black bg-gray-200 text-4xl"
						key={"letter-" + index}
					>
						{letter}
					</p>
				))}
		</div>
	);
};
