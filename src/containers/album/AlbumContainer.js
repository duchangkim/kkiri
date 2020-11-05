import React, { useEffect, useState } from "react";
import axios from "axios";
import Album from "../../components/Album/Album";

function AlbumContainer() {
  const initalState = {
    files: {},
    error: null,
  };
  const [files, setFiles] = useState(initalState);

  useEffect(() => {
    console.log("sdf");
    axios
      .get("http://localhost:4000/api/schedules")
      .then((json) => {
        console.log(json);
        setFiles(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <Album files={files} />;
}

export default AlbumContainer;
