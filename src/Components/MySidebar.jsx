import { Link } from "react-router-dom";
import {
  faHome,
  faTelevision,
  faFilm,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  return (
    <div>
      <div className="flex justify-between items-center md:block px-8 py-3 font-bold md:border md:border-gray-400  md:rounded-br-3xl rounded-tr-2xl h-full w-max">
        <Link to={"/"}>
          <div className="flex items-center md:mb-10 md:pt-4">
            <img src="/assets/tv.png" alt="logo" className="w-10" />
            <h1 className="ml-2"> Movie Box</h1>
          </div>
        </Link>
        <div className="flex md:block text-gray-400">
          <Link to={"/"}>
            <div className="items-center flex md:mb-10">
              <FontAwesomeIcon icon={faHome} />
              <p className="hidden md:flex ml-2">Home</p>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="items-center flex md:mb-10">
              <FontAwesomeIcon icon={faFilm} />
              <p className="hidden md:flex ml-3">Movies</p>
            </div>
          </Link>
          <Link to={"/"}>
            {" "}
            <div className="items-center flex md:mb-10">
              <FontAwesomeIcon icon={faTelevision} />
              <p className="hidden md:flex ml-2">TV Series</p>
            </div>
          </Link>
          <Link to={"/"}>
            {" "}
            <div className="items-center flex md:mb-10">
              <FontAwesomeIcon icon={faCalendar} />
              <p className="hidden md:flex ml-2">Upcoming</p>
            </div>
          </Link>
          <div className="hidden md:block bg-movieRed bg-opacity-10 rounded-lg w-44 p-3 border border-movieRed mt-4 mb-10">
            <p className="text-black">
              Play movie quizzes and earn free tickets
            </p>
            <p className="text-xs mt-2 ">50k people are playing now</p>
            <button className="bg-movieRed bg-opacity-10 text-sm border border-movieRed first-line:text-movieRed rounded-full px-2 py-1 mt-2">
              Start playing
            </button>
          </div>

          <Link to={"/"}>
            {" "}
            <div className="items-center flex">
              <FontAwesomeIcon icon={faHome} />
              <p className="hidden md:flex ml-2">Logout</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}