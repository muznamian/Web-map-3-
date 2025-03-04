mapboxgl.accessToken = 'pk.eyJ1IjoibXV6bmFtaWFuIiwiYSI6ImNtNXBsc2xjcDAyaWkybm9wZXFuMjNzMTQifQ.0ATJsQJDSlSrpNrQpdMq0Q';
const map = new mapboxgl.Map({
    container: "my-map", // was important to correct the ID name (had it as 'my-map 3' but changed to 'my-map')- the html would not work with spaces 
    style: "mapbox://styles/muznamian/cm7uod8ri00du01sagvvh78i8",
    center: [-79.39, 43.66],
    zoom: 12,
});

map.on('load', () => {
    // Adding GeoJSON source and fixing the link using GitHUB 
    map.addSource('touristattractions', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/muznamian/Web-map-3-/refs/heads/main/touristattractions.geojson'
    });

    // Adding the map addlayer inside the 'load' event since when it was outside points would not load 
    map.addLayer({
        'id': 'location-points',
        'type': 'circle',
        'source': 'touristattractions',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#FF0000'
        }
    });
});
