type DialogProps = {};

export const Dialog: React.FC<DialogProps> = (props) => {
	const { children } = props;
	return (
		<div className="bg-white w-96 p-4 h-40 font-mono">
			<div className="bg-black text-white h-full flex-col flex justify-center items-center p-4 gap-2">
				{children}
			</div>
		</div>
	);
};
