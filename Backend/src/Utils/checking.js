navigator.geolocation.getCurrentPosition(
  (pos) => {
    console.log("Lat:", pos.coords.latitude);
    console.log("Lng:", pos.coords.longitude);
    console.log("Accuracy:", pos.coords.accuracy + " meters");
  },
  (err) => {
    console.error(err.message);
  }
);
