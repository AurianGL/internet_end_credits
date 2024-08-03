import { useField } from "formik";

interface ConsoleInputProps {
	name: string;
}

export const ConsoleInput: React.FC<ConsoleInputProps> = (props) => {
	const [field, meta] = useField(props);
	return (
		<>
			<span>{"> "}</span>
			<input
				{...field}
				{...props}
				className="bg-black text-white caret-black font-death border-0 rounded-none focus:outline-none hover:bg-white hover:text-black"
				autoFocus={true}
			/>
			<span
				className="animate-pulse bg-white absolute"
				style={{ left: `${meta.value.length + 2}ch` }}
			>
				_
			</span>
		</>
	);
};
