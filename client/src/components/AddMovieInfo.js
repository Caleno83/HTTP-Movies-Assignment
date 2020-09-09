import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const AddMovieInfo = ({ getMovieList }) => {
  const movieInfo = {
    id: Date.now(),
    title: "",
    director: "",
    metarscore: "",
    stars: [],
  };

  const [newMovie, setNewMovie] = useState(movieInfo);
  const { push } = useHistory();
 

  const handleChanger = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => {
        console.log("The response for newFriendFrom is:", res);
        setNewMovie(res.data);
        getMovieList();
        push("/");
      })
      .catch((err) => console.log("NewMovie data error:", err.message));
    setNewMovie({
      title: "",
      director: "",
      metarscore: "",
      stars: [],
    });
  };

  return (
    <>
      <h1>Please Add A New Movie Info</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChanger}
          placeholder="title"
          value={newMovie.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChanger}
          placeholder="director"
          value={newMovie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={handleChanger}
          placeholder="Metascore"
          value={newMovie.metascore}
        />

        <button>Add A New Movie Info</button>
      </form>
    </>
  );
};

export default AddMovieInfo;
