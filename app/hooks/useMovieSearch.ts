// Create a file named useMovieSearch.ts
import { SetStateAction, useState } from "react";
import axios from "axios";

const useMovieSearch = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async (name: string) => {
		const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
		setLoading(true);

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${name}`,
			);
			const responseData = response.data;
			setData(responseData);
			// Process the data
		} catch (error) {
			setError(error as SetStateAction<null>);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, fetchData };
};

export default useMovieSearch;
