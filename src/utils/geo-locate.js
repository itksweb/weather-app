function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }
}

function success(position) {
  console.log(position);
  console.log("Longitude: " + position.coords.longitude);
}

function error() {
  alert("Sorry, no position available.");
}
