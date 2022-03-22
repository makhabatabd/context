import axios from "axios";
import React, { useReducer } from "react";

//creating a context
export const videosContext = React.createContext();

//API
const API = "http://localhost:8001/videos";
//the beginning state
const INIT_STATE = {
  videos: [],
  oneVideo: null,
};
//reducer is a function that will chnge the INIT_STATE
//ACTION is an object with keys: actyon.type and payload, THE ACTION THAT IS HAPPENING, payload is the data
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return {
        ...state,
        videos: action.payload.data,
      };
    case "GET_ONE_VIDEO":
      return {
        ...state,
        oneVideo: action.payload.data,
      };

    default:
      return state;
  }
};

const VideosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  async function getAllVideos() {
    let result = await axios.get(API);
    // console.log("result from GETALLVIDEOS", result);
    let action = {
      type: "GET_VIDEOS",
      payload: result,
    };
    dispatch(action);
  }
  async function deleteVideo(id) {
    await axios.delete(`${API}/${id}`);
    getAllVideos();
  }
  async function addVideo(newProduct) {
    await axios.post(API, newProduct);
    getAllVideos();
  }
  async function getOneVideo(id) {
    let result = await axios.get(`${API}/${id}`);
    // console.log(result);
    dispatch({
      type: "GET_ONE_VIDEO",
      payload: result,
    });
  }
  async function updateVideo(id, editedVideo) {
    await axios.patch(`${API}/${id}`, editedVideo);
    getAllVideos();
  }
  return (
    <videosContext.Provider
      value={{
        videos: state.videos,
        oneVideo: state.oneVideo,
        getAllVideos,
        deleteVideo,
        addVideo,
        getOneVideo,
        updateVideo,
      }}
    >
      {children}
    </videosContext.Provider>
  );
};

export default VideosContextProvider;
