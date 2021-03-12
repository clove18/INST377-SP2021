function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map("mapid").setView([38.9897, -76.9378], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiY2xvdmU1NSIsImEiOiJja202cTlnanowMWx3MnVxZjRkcXFhcDQ0In0.2PYIhpPcRg4iQ2CVudUmYA",
    }
  ).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers

  const endpoint =
    "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const restaurants = [];

  const request = await fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => restaurants.push(...data));

  function findMatches(wordToMatch, restaurants) {
    const geoFilter = restaurants.filter((place) => place.geocoded_column_1)
    return restaurants.filter((place) => {
      const regex = new RegExp(wordToMatch, "gi");
      return (
        place.zip.match(regex)
      );
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(
      document.getElementById("search").value,
      restaurants
    );
    console.log(document.getElementById("search").value);
    console.log(matchArray);
    const matchArrayA = Array.from(matchArray)
    const matchArray5 = matchArrayA.slice(0,5)
    const longLat1 = matchArray5[0].geocoded_column_1.coordinates;
    mapObjectFromFunction.panTo([longLat1[1], longLat1[0]]);
    matchArray5.forEach((place) => {
      const longLat = place.geocoded_column_1.coordinates;
      console.log(longLat);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(
        mapObjectFromFunction
      );
    });
    const html = matchArray5
      .map((place) => {
        return `<li> 
        <span class="name"><b>${place.name}</b></span>
        <br/>
        <span class="category"><b>${place.category}</b></span>
        <br/>
        <address><b>${place.address_line_1}</b> 
        <br/><b>${place.city}, ${place.state} ${place.zip}</b></address>
        </li>`;
      })
      .join("");
    suggestions.innerHTML = html;
  }

  const form = document.querySelector(".userform");
  const suggestions = document.querySelector(".RestaurantList");

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    displayMatches(evt);
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
