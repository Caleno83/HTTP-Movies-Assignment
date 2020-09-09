import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./components/UpdateForm"
import AddMovieInfo from "./components/AddMovieInfo";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <div>
          <NavLink to="/add-movie">Add New Movie Info</NavLink>
        </div>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateForm getMovieList={getMovieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} getMovieList={getMovieList} />
      </Route>

      <Route exact path="/add-movie">
        <AddMovieInfo getMovieList={getMovieList} />
      </Route>
    </>
  );
};

export default App;
