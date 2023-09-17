import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function Search() {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate(); 

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: { language: "en-US", region: "US", query: search },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGRhYjdhNmU5MzUzN2I1YTYzYTljNThjOTE0ZDU4MCIsInN1YiI6IjY0ZmY4MDNiMGJiMDc2MDEwMzZkNTNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tsaFpxBnPpOKdM4sH7yjjEKQbAb-UVBlHG_hR8zZOLY",
    },
  };

  const getSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setSearchResults(response.data.results);
      setLoading(false);
      setHasError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getSearch();
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          name="query"
          id="query"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="What do you want to watch?"
          className="flex border border-2-grey bg-transparent placeholder-white text-xs md:text-base rounded-md md:w-[500px] placeholder-opacity-50 px-3 py-1"
        />

        <div className="absolute top-2 right-3">
          <button onClick={getSearch}>
            <FontAwesomeIcon icon={faSearch}/>
          </button>
        </div>
        
      </div>
      <div className="absolute mt-2 w-[500px] bg-transparent  p-2 space-y-2 hidden md:block">
        {loading ? (
          <div>Loading...</div>
        ) : hasError ? (
          <div>Oops! An Error Has Occurred...</div>
        ) : (
          <div className="z-20 p-3">
            {searchResults.length > 0 && (
              <div>
                <h2>Search Results:</h2>
                <ul>
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <Link to={`/search-results?movieId=${result.id}`}>
                        {result.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}