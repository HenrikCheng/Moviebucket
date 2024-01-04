import { SetStateAction, useState } from "react";
import axios from "axios";

interface CastItemType {
	id: string;
	name: string;
	profile_path: string;
	character: string;
}

interface ActorSearchResult {
	data: {
		cast: CastItemType[];
	} | null;
	loading: boolean;
	error: any;
	fetchData: (id: string) => void;
}

export const useMovieSearch = () => {
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

export const useActorSearch = (): ActorSearchResult => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async (movieId: string | number) => {
		const accessToken =
			"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOThiZjE0N2RjYjk1NjU0ZDc1ZDczMDdlY2QyNGQ1YyIsInN1YiI6IjY1NzZkMzI0NGJmYTU0MDBhYmVmMjhmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ytiPlo8e3JHnZ1Gvq8Vejv6r83KOA7Ka7eiZVP5G1ZA";
		setLoading(true);

		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
				{
					headers: {
						Authorization: `bearer ${accessToken}`,
						accept: "application/json",
					},
				},
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
