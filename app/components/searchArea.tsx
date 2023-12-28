"use client";
import { useState } from "react";

const SearchArea = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log("Search term:", searchTerm);
	};

	const handleChange = (e: any) => {
		setSearchTerm(e.target.value);
		console.log("Input value:", e.target.value);
	};

	return (
		<div className="flex flex-col items-center">
			<h1>MOVIEBUCKET</h1>
			<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]" />
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<input
					type="text"
					className="text-black px-2 py-1 my-1"
					value={searchTerm}
					onChange={handleChange}
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default SearchArea;
