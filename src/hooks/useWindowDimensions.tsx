import { useEffect, useState } from "react";

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		function handleResize() {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};

// const MyComponent() {
//     const { width, height } = useWindowDimensions();

//     return (
//         <div>
//             <p>Window width: {width}</p>
//             <p>Window height: {height}</p>
//         </div>
//     );
// }
