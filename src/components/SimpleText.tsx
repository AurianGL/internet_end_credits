import type { PolyTextType } from "../types";

interface TextProps {
	text: PolyTextType;
}

export const SimpleText: React.FC<TextProps> = ({ text }) => {
	return (
		<div className=" h-auto">
			{text.map((sentences, index) => (
				<p key={sentences[0] + index}>{sentences.join(" ")}</p>
			))}
		</div>
	);
};
