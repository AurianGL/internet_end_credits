import { CloudinaryContext, Image } from "cloudinary-react";
import React, { useState } from "react";

const styles = [
	{ position: "absolute", width: "300px", top: "20%", left: "30%" },
	{
		position: "absolute",
		width: "200px",
		top: "30%",
		left: "20%",
		transition: "all 1s ease-out",
		transform: "rotate(90deg)",
		animation: "3s linear 1s infinite slidein",
	},
];

export const HelloYou = () => {
	const [style, setStyle] = useState(styles[0]);

	const animateThisShit = () => {
		setStyle(styles[1]);
	};

	return (
		<div onClick={animateThisShit} style={style}>
			<CloudinaryContext cloudName="dav38qg9f" style={{ textAlign: "center" }}>
				<Image
					publicId={"Internet_end_credit/icons/helloyou_lmlltw.jpg"}
					className="gal-img"
					width={style.width}
				/>
			</CloudinaryContext>
			<div style={{ color: "white", fontWeight: "200" }}>HELLO YOU</div>
		</div>
	);
};
