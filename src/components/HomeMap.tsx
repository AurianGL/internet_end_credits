import { useMemo, useState } from "react";
import { whereIsHome, whereIsHomeFR } from "../data/whereIsHome";
import { SongCard } from "./SongCard";

type Props = {
	lang: "fr" | "en";
};

export const HomeMap = ({ lang }: Props) => {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	const songs = useMemo(() => {
		return lang === "fr" ? whereIsHomeFR : whereIsHome;
	}, [lang]);

	return (
		<div className="grid grid-rows-4 grid-flow-col gap-0">
			<div className="border-black border-4 max-w-max flex flex-col bg-white">
				<div className="border-black p-1 border-b-2 font-bold">
					Spotify Playlist
				</div>
				<div className="p2 grow bg-spotify">
					<iframe
						title="spotify"
						style={{ borderRadius: "0px" }}
						src="https://open.spotify.com/embed/playlist/6bpCM1PalcfInTsLDyCCag?utm_source=generator&theme=0"
						width="100%"
						height="352"
						frameBorder="0"
						allowFullScreen={false}
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
				</div>
			</div>
			{songs.map((text, index) => (
				<SongCard
					key={index}
					song={text}
					index={index}
					currentCardIndex={currentCardIndex}
					setCurrentCardIndex={setCurrentCardIndex}
				/>
			))}
		</div>
	);
};
