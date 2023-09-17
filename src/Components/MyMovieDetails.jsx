import React, { useEffect, useState } from "react";
import Sidebar from "./MySidebar";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";


export default function MoviePage() {
const {movie} = useParams()

  const [movieInfo, setMovieInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [useCertification, setUsCertification] = useState("");
  const [formattedRuntime, setFormattedRuntime] = useState("");

  const getRandomMovieId = () => {
    return Math.floor(Math.random() * 100000) + 1;
  };

  const details = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${getRandomMovieId()}?append_to_response=credits,release_dates`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWU0NWJjNTBlNjViM2M2ZWExNWNjYTBhYTVmM2UxZSIsInN1YiI6IjY1MDA5YWYwZDdkY2QyMDBlMmZkMDJiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gdM0-dy_Af2OEG7v9dwz0GRNPwR0yNjCQ5TVs7nlJsI",
    },
  };

  const movieDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.request(details);
      setMovieInfo(response.data);
      setLoading(false);

      const desiredCountryCode = "US";
      const releaseDateEntry = response.data.release_dates.results.find(
        (entry) => entry.iso_3166_1 === desiredCountryCode
      );

      if (releaseDateEntry) {
        const useCertification =
          releaseDateEntry.release_dates[0]?.certification;
        setUsCertification(useCertification);
      }

      const runtimeInMinutes = response.data.runtime;
      const hours = Math.floor(runtimeInMinutes / 60);
      const minutes = runtimeInMinutes % 60;
      setFormattedRuntime(`${hours}h ${minutes}min`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    movieDetails();
  }, []);

  const formatDateToUTC = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minutes: "2-digit",
      seconds: "2-digit",
      milliseconds: "2-digit",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[20%_80%]  gap-4">
          <Sidebar />
          <div className="p-3 md:p-14 2xl:p-10 overflow-x-hidden">
            <div className="relative">
              <img
                src={`http://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`}
                alt="movie trailer"
                className="w-full rounded-xl overflow-hidden"
              />
              <div className=" centered">  
                <p className="text-white text-center mt-2 text-lg">
                  Watch Trailer
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 ">
              <div>
                <div className="block md:flex items-center mt-5 ">
                  <h2
                    data-testid="movie-title"
                    className=" text-[25px] font-bold tracking-wide"
                  >
                    {movieInfo.title}
                  </h2>
                  <span className="hidden md:flex md:ml-3">•</span>
                  <p
                    data-testid="movie-release-date"
                    className="md:ml-5 text-1xl 2xl:text-2xl"
                  >
                    {formatDateToUTC(movieInfo.release_date)}
                  </p>
                  <p
                    data-testid="movie-runtime"
                    className="text-1xl 2xl:text-2xl"
                  >
                    {formattedRuntime && <p>{formattedRuntime}</p>}
                  </p>
                  <span className="hidden md:flex md:ml-3">•</span>
                </div>
                <p data-testid="movie-overview">{movieInfo.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
