import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  console.log(" id params for movies", id)
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios
    // I did a delete request to delete movies
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        getMovieList(res.data);
        push('/')
      })
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="edit-button" onClick={() => push(`/update-movie/${id}`)}>
        Edit
      </button>
      <button className="edit-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
