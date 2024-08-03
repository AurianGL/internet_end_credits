import { useParams } from "react-router-dom";

type Params = {
	[key: string]: string | undefined;
};

export const useQueryParams = () => {
	const params = useParams<Params>();

	const getParam = (key: string) => {
		return params[key];
	};

	return { getParam };
};

// function MyComponent() {
//     const { getParam } = useQueryParams();

//     const id = getParam('id');

//     // ...
// }
