import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dogy from "../assets/dogy.jpg";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const key = import.meta.env.VITE_API_KEY;

  const convertMinute = (time) => {
    if (!time) return "Not Available";
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`);
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        setMovie(data);
        document.title = data.title || "Movie Details";
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger text-center">Error: {error}</div>;
  if (!movie) return <div className="text-center">No data found.</div>;

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : dogy;

  return (
    <main className="container">
      <h5 className="text-danger py-2 border-bottom mb-3">{movie.title}</h5>
      <div className="row">
        <div className="col-md-4">
          <img src={image} className="img-fluid img-thumbnail" alt={movie.title} />
        </div>
        <div className="col-md-8">
          <h3 className="text-primary">{movie.title}</h3>
          <p className="mt-3">{movie.overview || "No overview available."}</p>
          {movie.genres && (
            <p className="d-flex gap-3">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="badge bg-danger">
                  {genre.name}
                </span>
              ))}
            </p>
          )}
          <p className="mt-1">
            <i className="bi bi-star-fill text-warning"></i> {movie.vote_average} |{" "}
            <i className="bi bi-people-fill text-success"></i> {movie.vote_count} reviews
          </p>
          <table className="table table-bordered w-50 mt-2">
            <tbody>
              <tr>
                <th>Run Time</th>
                <td>{convertMinute(movie.runtime)}</td>
              </tr>
              <tr>
                <th>Budget</th>
                <td>
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : "Not Available"}
                </td>
              </tr>
              <tr>
                <th>Revenue</th>
                <td>
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "Not Available"}
                </td>
              </tr>
              <tr>
                <th>Release Date</th>
                <td>{movie.release_date || "Not Available"}</td>
              </tr>
            </tbody>
          </table>
          <a className="btn btn-warning" target ="_blank" href={`https://www.imdb.com/title/${movie.imdb_id}/`}>View In IMDB</a>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
