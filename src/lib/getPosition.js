const getPosition = (dispatch, getWeather) => {
  console.log('getPostion call');
  console.dir(getWeather());

  const handleGeoSuccess = (position) => {
    console.log('handleGeoSuccess call');
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const API_KEY = '8838396b78d2bd1ab29b19d58374f16c';
    // const API_KEY = '7281a145274b52a5338769d114cc3464';

    dispatch(
      getWeather({
        latitude,
        longitude,
        API_KEY,
      })
    );
  };

  const handleGeoError = () => {
    console.log(`Can't access geo location`);
  };

  const askForCoords = () => {
    console.log('askForCoords call');
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  };

  askForCoords();
};

export default getPosition;
