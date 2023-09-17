import MovieList from "./Components/MyMovieList";
import MyFooter from "./Components/Myfooter";
import MoviePage from "./Components/MyMovieDetails";
import SearchResultsPage from "./Components/MySearchResults";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="font-dmSans">
      <div>
        <div>
          <Routes>
            <Route path={"/"} element={<MovieList />} />
            <Route path={"/movie/:movieId"} element={<MoviePage />} />
            <Route path={"/search-results"} element={<SearchResultsPage />} />
          </Routes>
        </div>
        <div>
          <MyFooter />
        </div>
      </div>
    </div>
  );
}

export default App;