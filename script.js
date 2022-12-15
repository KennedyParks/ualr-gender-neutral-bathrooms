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







//34.72338788393702, -92.33963773192946