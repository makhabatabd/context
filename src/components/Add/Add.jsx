import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { videosContext } from "../../contexts/videoContext";

const Add = () => {
  //title, imageTitle, genre, description
  const { addVideo } = useContext(videosContext);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: "",
    imageTitle: "",
    genre: "",
    description: "",
  });
  function handleValues(e) {
    let product = {
      ...newProduct,
      [e.target.name]: e.target.value,
    };
    setNewProduct(product);
  }
  function save() {
    if (
      !newProduct.title ||
      !newProduct.genre ||
      !newProduct.imageTitle ||
      !newProduct.description
    ) {
      alert("Fill in");
      return;
    }
    addVideo(newProduct);
    navigate("/");
  }
  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={newProduct.title}
        onChange={handleValues}
        name="title"
      />
      <input
        type="text"
        placeholder="image"
        value={newProduct.imageTitle}
        onChange={handleValues}
        name="imageTitle"
      />
      <input
        type="text"
        placeholder="genre"
        value={newProduct.genre}
        onChange={handleValues}
        name="genre"
      />
      <input
        type="text"
        placeholder="description"
        value={newProduct.description}
        onChange={handleValues}
        name="description"
      />
      <button onClick={save}>Save</button>
    </div>
  );
};

export default Add;
