"use client";

import { useQueryState } from "next-usequerystate";
import Button from "./button";
import axios from "axios";
import { useState } from "react";
import FeatureContent from "./featureContent";

const SearchForm = () => {
	const [name, setName] = useQueryState("");
	const [data, setData] = useState(null);

	const fetchData = async () => {
		const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${name}`,
			);
			const data = response.data;
			setData(data);

			console.log("🚀 ~ file: searchForm.tsx:15 ~ fetchData ~ data:", data);
			// Process the data
		} catch (error) {
			// Handle errors
			console.warn("There was an error", error);
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		fetchData();
	};

	const handleChange = (e: any) => {
		setName(e.target.value);
		console.log("Input value:", e.target.value);
	};

	const ResultArea = () => {
		console.log("Result: ", JSON.stringify(data, null, 2));

		if (data !== null) {
			const movieData = data as {
				results?: { id: string; original_title: string }[];
			};

			return (
				<ul>
					{movieData.results?.map((item) => (
						<li key={item.id}>{item.original_title}</li>
					))}
				</ul>
			);
		}

		return <FeatureContent />;
	};

	return (
		<div className="flex flex-col items-center" onSubmit={handleSubmit}>
			<h1 className="text-5xl sm:text-6xl md:text-8xl font-mono font-thin mb-4">
				MOVIEBUCKET
			</h1>
			<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]" />
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<input
					value={name || ""}
					onChange={handleChange}
					type="text"
					className="text-black text-xl px-2 py-1 my-1 rounded"
				/>
				<div className="flex justify-center mt-4 space-x-2">
					<Button type="submit">Search</Button>
					<Button
						style="red"
						onClick={() => {
							setName(null);
							setData(null);
						}}
					>
						Clear
					</Button>
				</div>
			</form>
			<ResultArea />
		</div>
	);
};

export default SearchForm;
