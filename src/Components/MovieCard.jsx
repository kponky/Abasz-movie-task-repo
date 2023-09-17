import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function MovieCard() {
  const [movieData, setMovieData] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/top_rated",
    params: { language: "en-US", region: "US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGRhYjdhNmU5MzUzN2I1YTYzYTljNThjOTE0ZDU4MCIsInN1YiI6IjY0ZmY4MDNiMGJiMDc2MDEwMzZkNTNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tsaFpxBnPpOKdM4sH7yjjEKQbAb-UVBlHG_hR8zZOLY",
    },
  };

  const getMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setMovieData(response.data.results);
      setLoading(false);
      setHasError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const toggleLike = (index) => {
    setLikedMovies((prevLikedMovies) =>
      prevLikedMovies.includes(index)
        ? prevLikedMovies.filter((movieIndex) => movieIndex !== index)
        : [...prevLikedMovies, index]
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : hasError ? (
        <div>Oops! An Error Has Occurred...</div>
      ) : (
        <div className="flex justify-between items-center p-3">
          <h1 className="text-3xl font-bold tracking-wide md:mt-10">
            Featured Movie
          </h1>
          <div className="flex items-center">
            <h4 className="text-movieRed md:text-lg">See more</h4>
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-[20px] pt-10 px-3">
        {movieData &&
          movieData.slice(0, 10).map((movie, index) => (
            <div key={index}>
              <div className="card rounded-lg" data-testid="movie-card">
                <div className="relative ">
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="Movie Poster"
                      className="w-full rounded-[25px]"
                      data-testid="movie-poster"
                    />
                  </Link>
                  <div className="absolute right-0 top-0 p-2">
                    <button onClick={() => toggleLike(index)}>
                      {likedMovies.includes(index) ? (
                        <FontAwesomeIcon icon={faHeart} className=" text-red-600 bg-red-300 w-[20px] h-[20px] px-[7px] py-[7px] rounded-full" />
                      ) : (
                        <FontAwesomeIcon icon={faHeart} className="text-white bg-slate-400 w-[20px] h-[20px] px-[7px] py-[7px] rounded-full"/>
                      )}
                      {/* alt="like icon" className="w-6 bg-favorite bg-opacity-50
                      rounded-full p-1 z-20" /> */}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h1
                    className="font-bold mt-2 text-[20px]"
                    data-testid="movie-title"
                  >
                    {movie.title}
                  </h1>
                  <h4
                    className="text-xs text-gray-400 mt-2 font-bold"
                    data-testid="movie-release-date"
                  >
                    USA, {movie.release_date}
                  </h4>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}