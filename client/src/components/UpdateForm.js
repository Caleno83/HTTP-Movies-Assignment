import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateForm = ({ getMovieList }) => {
  const [update, setUpdate] = useState(initialItem);
  const { push } = useHistory();
  //This one shows the variables in the url
  const { id } = useParams();
  console.log("This is  the id params for update", id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("This is the Update Response", res);
        setUpdate(res.data);
      })
      .catch((error) => console.log("This is the update error", error.message));
  }, [id]);
  const handleChanger = (e) => {
    e.persist();

    setUpdate({
      ...update,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // I did a PUT request to update movies
    axios
      .put(`http://localhost:5000/api/movies/${id}`, update)
      .then((res) => {
        console.log("Updating response", res.data);
        getMovieList();
        push("/");
      })
      .catch((err) => console.log("The error is:", err.message));
  };

  return (
    <div>
      <h2>Please Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChanger}
          placeholder="title"
          value={update.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChanger}
          placeholder="director"
          value={update.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={handleChanger}
          placeholder="Metascore"
          value={update.metascore}
        />

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
