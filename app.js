import "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js";

const mapbox_token = "pk.eyJ1Ijoic2lwb2RldiIsImEiOiJjazgweWZvZ3UwNncyM29wZnducHdwa2I1In0.WXZYxRseUHE2t4oeyahEFQ";
// "pk.ey....";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 1.5,
  center: [0, 20]
});

const getColorFromCount = count => {
  if (count >= 100) {
    return "red";
  }
  if (count >= 10) {
    return "blue";
  }
  return "gray";
};

fetch("/get-latest.json")
  .then(response => response.json())
  .then(data => {
    // const places = data.places;
    // const reports = data.reports;
    const {
      places,
      reports
    } = data;

    reports
      .filter(report => !report.hide)
      .forEach(report => {
        const {
          infected,
          placeId
        } = report;
        const currentPlace = places.find(place => place.id === placeId);
        console.log(infected, currentPlace);
        new mapboxgl.Marker({
            color: getColorFromCount(infected)
          })
          .setLngLat([currentPlace.longitude, currentPlace.latitude])
          .addTo(map);
      });
  });