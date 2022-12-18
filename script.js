
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

new AutocompleteDirectionsHandler(map);

class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsRenderer;
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    const modeSelector = document.getElementById("mode-selector");
    // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );
    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );

    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id, mode) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}


window.initMap = initMap;

// 34.72412132671473, -92.33657371494468



/*
function initMap(){
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 34.725, lng: -92.34},
  zoom: 17,
  mapId: 'f23581834ac3cce3'
  });


  new google.maps.Marker({
    position: {lat: 34.72338788393702, lng: -92.33963773192946},
    map,
    title: "Floor B01 Room 29E",
  });

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading"></h1>' +
    '<div id="bodyContent">' +
    "<p><b>Ottenheimer Library</b></p><p>Floor: CO1 | Room: 203</p>" +
    "</div>" +
    "</div>";

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200,
    ariaLabel: "Ottenheimer Library",
  });

  const marker = new google.maps.Marker({
    position: {lat: 34.72338788393702, lng: -92.33963773192946},
    map,
    title: "Ottenheimer Library",
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });

}


window.initMap = initMap;




// 34.72808629462215, -92.34048081400388

*/