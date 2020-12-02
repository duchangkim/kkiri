const getPosition = (dispatch, getWeather) => {
  console.log("getPostion call");
  const API_KEY = "8838396b78d2bd1ab29b19d58374f16c";
  // console.dir(getWeather());

  const handleGeoSuccess = (position) => {
    console.log("handleGeoSuccess call");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // const API_KEY = '7281a145274b52a5338769d114cc3464';

    dispatch(
      getWeather({
        latitude,
        longitude,
        API_KEY,
      })
    );
  };

  const handleGeoError = (e) => {
    if (e.code === 1) {
      dispatch(
        getWeather({
          latitude: 37.499764,
          longitude: 127.035113,
          API_KEY,
        })
      );
    }
    console.log(e);
    console.log(`Can't access geo location`);
  };

  const askForCoords = () => {
    console.log("askForCoords call");
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  };

  askForCoords();
};

export default getPosition;
