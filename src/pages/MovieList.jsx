import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Card} from "../Components/Card"; // ✅ Fixed import
import { useFetch } from "./hooks/useFetch"
 // ✅ Correct path

export const MovieList = ({ title, apiPath }) => {
  console.log(apiPath)
  const { data: movies } = useFetch(apiPath);
  useEffect(() => {
    document.title = title;
  });
  const navigator=useNavigate();
  return (
    <div>
      <main className="container">
        {title === "Your Guide to Great Movies" ? (
          <div class="bg-dark p-5 border border-light mb-5 border-success rounded text-light">
          <h3 className="text-primary">Welcome to Cine List</h3>
            <p className="lead">
              CineList is a responsive movie listing website built with React.js and React Router...
            </p>
            <button
              className="btn btn-success"
              onClick={() => navigator("/movies/upcoming")}
            >
              Explore Now!!
            </button>
          </div>
        ) : (
          ""
        )}

        <h5 className="text-danger py-2 border-bottom">{title}</h5>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 py-2">
          {movies.map((movie) => {
        
            return <Card key={movie.id} movie={movie} />;
          })}
        </div>
      </main>
    </div>
  );
};
