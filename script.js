mapboxgl.accessToken = 'pk.eyJ1IjoibXV6bmFtaWFuIiwiYSI6ImNtNXBsc2xjcDAyaWkybm9wZXFuMjNzMTQifQ.0ATJsQJDSlSrpNrQpdMq0Q';
// the specific token that is used in my mapbox file
const map = new mapboxgl.Map({
    container: "my-map 3",
    style: "mapbox://styles/muznamian/cm7uod8ri00du01sagvvh78i8",
    // the style url from the mapbox id
    center: [-79.39, 43.66],
    // the lng and lat values that are used as central mercator 
    zoom: 12,
});

map.on('load', () => {

    map.addSource('touristattractions', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/muznamian/Web-map-3-/main/map(5).geojson'
    });})

     //  the above is geojson link and the code actions to plot the point in the map 
     map.addLayer({
        'id': 'location points',
        'type': 'circle',
        'source': 'map(5)',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#FF0000'
        }

    });
// the code above explains the description, as my points are round circles 
    //map box tile stuff
