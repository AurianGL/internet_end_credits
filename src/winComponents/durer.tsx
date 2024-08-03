import { CloudinaryContext, Image } from "cloudinary-react";
import React, { useContext } from "react";
import { ConsoleContext } from "../context";

const durerIds = [
	{ id: "durer_sdqyov", name: "durer" },
	{ id: "shave_fx8shc", name: "shave" },
];
interface ImagoProps {
	pic: string;
}

const Imago = ({ pic }: ImagoProps) => {
	return (
		<CloudinaryContext cloudName="dav38qg9f">
			<div className="text-center gal-img">
				<Image publicId={`Internet_end_credit/durer/${pic}`} />
			</div>
		</CloudinaryContext>
	);
};

export const Durer = () => {
	const { mode } = useContext(ConsoleContext);
	return (
		<div className="durer-imgs">
			{<Imago pic={durerIds[mode === "ANTHUME" ? 0 : 1].id} />}
		</div>
	);
};
