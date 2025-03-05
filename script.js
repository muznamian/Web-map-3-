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
            'circle-color': [ 
                'step', // the steo expression will help to show the points in different colors based on the capacity of indviduals in specific areas 
                {'get', 'capcity', } // uisng the get expression we can assign values to each toursit attraction location 
                '#ADD8E6', // this color is assigned to any of the values < in the primary step 
                450, '#FF0000' // the colors are assigned to each toursit attraction to connect to its capcity 
                700, '#FFA500'
                1000, '#FFFF00'
                4000, '#ffc00'
                1,500,0000, '#00008B']
        }, 
        'filter': ('>=', ('get',  'cacpity'), 1000  });
});
