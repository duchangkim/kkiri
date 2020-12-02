const getPosition = (dispatch, getWeather) => {
  const API_KEY = '8838396b78d2bd1ab29b19d58374f16c';

  const handleGeoSuccess = (position) => {
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
  };

  const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  };

  askForCoords();
};

export default getPosition;
