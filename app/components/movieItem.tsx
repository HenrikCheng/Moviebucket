import Image from "next/image";
import { useEffect, useState } from "react";
import { useActorSearch } from "../hooks/useSearch";

interface MovieItemType {
	id: string;
	poster_path: string;
	title: string;
	overview: string;
	backdrop_path: string;
}

interface CastItemType {
	id: string;
	name: string;
	profile_path: string;
	character: string;
}

const MovieItem: React.FC<{ item: MovieItemType }> = ({ item }) => {
	const [open, setOpen] = useState(false);

	const MovieModal = () => {
		const { data, loading, error, fetchData } = useActorSearch();
		useEffect(() => {
			fetchData(item.id);
		}, []);

		return (
			<div className="fixed inset-0 z-10 overflow-auto bg-black bg-opacity-50 flex flex-col items-center justify-center w-screen h-screen">
				<button
					className="bg-blue-500 text-white px-6 py-4 text-xl rounded-md hover:bg-blue-600 absolute right-2 top-2"
					onClick={() => setOpen(false)}
				>
					Close
				</button>
				<Image
					src={`https://image.tmdb.org/t/p/w500/${
						item.backdrop_path || item.poster_path
					}`}
					alt="movie backdrop"
					width={1920}
					height={1080}
					className="w-full"
				/>
				<div className="relative p-8 bg-black rounded-md flex flex-col">
					<div className="flex justify-between mb-4">
						<h2 className="text-2xl font-bold">{item.title}</h2>
					</div>
					<p>{item.overview}</p>
					<ul className="flex flex-row">
						{data && data.cast ? (
							data.cast.slice(0, 6).map((person: CastItemType) => (
								<li key={person.id} className="flex-none w-1/6 p-4">
									<Image
										src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
										alt="actor"
										width={40}
										height={40}
										className="rounded-full h-40 w-40 object-cover flex-none p-2"
									/>
									<p>
										<span className="font-bold">{person.name}</span>
										<span> as </span>
										<span className="font-bold">{person.character}</span>
									</p>
								</li>
							))
						) : (
							<></>
						)}
					</ul>
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
				{item.poster_path ? (
					<Image
						src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
						width={500}
						height={500}
						className="filter brightness-50"
						alt="Poster of the film"
					/>
				) : (
					<div className="h-60 w-60" />
				)}
				<h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-2xl">
					{item.title}
				</h4>
			</button>
		</>
	);
};

export default MovieItem;
