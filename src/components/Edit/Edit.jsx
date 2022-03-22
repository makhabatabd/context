import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { videosContext } from "../../contexts/videoContext";

const Edit = () => {
  //useParams() is a new hook to use with dom
  const { getOneVideo, oneVideo, updateVideo } = useContext(videosContext);
  const [edit, setEdit] = useState(null);
  //   console.log(oneVideo);
  console.log(edit);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getOneVideo(params.id);
  }, []);
  useEffect(() => {
    setEdit(oneVideo);
  }, [oneVideo]);

  function handleValue(e) {
    let edited = {
      ...edit,
      [e.target.name]: e.target.value,
    };
    setEdit(edited);
  }
  function save() {
    updateVideo(params.id, edit);
    navigate("/");
  }
  return edit ? (
    <div>
      <input
        name="title"
        onChange={handleValue}
        type="text"
        value={edit.title}
      />
      <input
        name="imageTitle"
        onChange={handleValue}
        type="text"
        value={edit.imageTitle}
      />
      <input
        name="genre"
        type="text"
        onChange={handleValue}
        value={edit.genre}
      />
      <input
        name="description"
        onChange={handleValue}
        type="text"
        value={edit.description}
      />
      <button onClick={save}>Save</button>
    </div>
  ) : (
    <h1>Loading....</h1>
  );
};

export default Edit;
