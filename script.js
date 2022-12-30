
function initMap(){
const map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: new google.maps.LatLng(34.725, -92.34),
  mapID: 'f23581834ac3cce3',
});


const locations = [
  {
    lat: 34.72820464614782,
    lng: -92.340453813306,
    content: 'Jack Stephens Center - Mezzanine',
    
  },
  {
    lat: 34.72171980461052,
    lng: -92.33832047518194,
    content: 'Donaghey Student Center - Fitness Center Floor 2 Room 201',
  },
  {
    lat: 34.72384895467145,
    lng: -92.34068442968515,
    content: 'Friborurgh Hall',
  },
  {
    lat: 34.71925877395472,
    lng: -92.3379017747377,
    content: 'Speech Building',
  },
  {
    lat: 34.723951588678766,
    lng: -92.33610140545535,
    content: 'University Commons',
  },
  {
    lat: 34.72237376482696,
    lng: -92.33943426949226,
    content: 'Donaghey Student Center - Cafeteria',
  },
  {
    lat: 34.72232652402635,
    lng: -92.33810076053062,
    content: 'Donaghey Student Center - Health Services',
  },
  {
    lat: 34.72391568102356,
    lng: -92.335868652696,
    content: 'East Residence Hall',
  },
  {
    lat: 34.72412132671473,
    lng: -92.33657371494468,
    content: 'West Residence Hall',
  }
];



locations.forEach((location) => {
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.lat, location.lng),
    map: map, 
  });

  const infoWindow = new google.maps.InfoWindow({
    content: location.content,
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
});

infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Find my location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);

}

window.initMap = initMap;