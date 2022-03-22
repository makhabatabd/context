import React, { useContext, useEffect, useState } from "react";
import { videosContext } from "../../contexts/videoContext";
import Card from "../Card/Card";

const VideoList = () => {
  //   const [state, setState] = useState("");
  //   const [state2, setState2] = useState("");
  const { getAllVideos, videos } = useContext(videosContext);
  console.log(videos);
  useEffect(() => {
    // console.log("refresh");
    getAllVideos();
  }, []);
  console.log(videos);
  //just for the first state
  //   useEffect(() => {
  //     console.log("state has changed");
  //   }, [state]);
  //reacts to the page reloading
  //   useEffect(() => {
  //     // console.log("refresh");
  //     getAllVideos();
  //   }, []);
  return (
    <div>
      {videos.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default VideoList;
