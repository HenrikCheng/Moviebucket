import Image from "next/image";
import { useState } from "react";

interface MovieItemType {
	id: string;
	poster_path: string;
	title: string;
	overview: string;
	backdrop_path: string;
}

const MovieItem: React.FC<{ item: MovieItemType }> = ({ item }) => {
	const [open, setOpen] = useState(false);

	const MovieModal = () => {
		return (
			<div className="fixed inset-0 z-10 overflow-auto bg-black bg-opacity-50 flex items-center justify-center w-4/5">
				<Image
					src={`https://image.tmdb.org/t/p/w500/${
						item.backdrop_path || item.poster_path
					}`}
					alt="movie backdrop"
					width={1000}
					height={1000}
				/>
				<div className="relative p-8 bg-black rounded-md flex flex-col">
					<div className="flex justify-between mb-4">
						<h2 className="text-2xl font-bold">{item.title}</h2>
						<button
							className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
							onClick={() => setOpen(false)}
						>
							Close
						</button>
					</div>
					{item.overview}
				</div>
			</div>
		);
	};

	return (
		<>
			{open && <MovieModal />}
			<button
				onClick={() => setOpen(true)}
				type="button"
				className="relative hover:scale-105 duration-200 delay-100"
			>
				<Image
					src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
					width={500}
					height={500}
					className="filter brightness-50"
					alt="Picture of the author"
					onError={() => "https://i.imgur.com/gf3TZMr.jpeg"}
				/>
				<h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-2xl">
					{item.title}
				</h4>
			</button>
		</>
	);
};

export default MovieItem;
