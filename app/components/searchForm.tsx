"use client";

import { useQueryState } from "next-usequerystate";
import Button from "./button";
import useMovieSearch from "../hooks/useMovieSearch"; // Import the custom hook
import FeatureContent from "./featureContent";
import Image from "next/image";

const SearchForm = () => {
  const [name, setName] = useQueryState("");
  const { data, loading, error, fetchData } = useMovieSearch(); // Use the custom hook

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData(name || "");
  };

  const ResultArea = () => {
    console.log("Result: ", JSON.stringify(data, null, 2));

    if (loading) return <p>Loading...</p>;
    if (error) {
      // Type assertion for error object
      const errorObject = error as Error;
      return <p>Error: {errorObject.message}</p>;
    }

    if (data !== null && name !== null) {
      const movieData = data as {
        results?: {
          id: string;
          title: string;
          poster_path: string;
          backdrop_path: string;
          overview: string;
        }[];
      };

      return (
        <ul>
          {movieData.results?.map((item) => (
            <li key={item.id}>
              {item.title}
              <Image
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                width={500}
                height={500}
                alt="Picture of the author"
              />
              <Image
                src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                width={500}
                height={500}
                alt="Picture of the author"
              />
              {item.overview}
            </li>
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
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="text-black text-xl px-2 py-1 my-1 rounded"
        />
        <div className="flex justify-center mt-4 space-x-2">
          <Button type="submit">Search</Button>
          <Button
            style="red"
            onClick={() => {
              setName(null);
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
