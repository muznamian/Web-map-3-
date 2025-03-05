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
            'circle-radius': [
                'interpolate', // to help move the images maximize and minimize 
                ['linear'], // the process of linear 
                ['zoom'], // the zoom expression will change as we pan in and out 
                12, 4, // when zoom is 12 ( or less), radius will be the 4px 
                10, ['/',['get', 'capcity'] , 15],// when zoom is 10 ( or greater) radius will be 15px//]
            'circle-color': [ 
                'step', // the step expression will help to show the points in different colors based on the capacity of indviduals in specific areas 
                ['get', 'capcity' ] // uisng the get expression we can assign values to each toursit attraction location 
                '#ADD8E6', // this color is assigned to any of the values < in the primary step 
                450, '#FFCCCB' // The AGO  the colors are assigned to each toursit attraction to connect to its capcity 
                700, '#FF0000'// CN Tower 
                1000, '#FFA500'// Bay Wellington Tower 
                4000, '#C04000'// The ROM 
                39,150, '#90EE90'// The Rogers Centre 
                1,500,000, '#D3D3D3']// Nathans Philips Square 
'filter': ('>=', ('get',  'cacpity'), 1000  });

            
    // Add a simple click event into the map 
    map.on ('click', 'location-points', (e)=> (
        console.log (e);)) // the e will repsent the event that would be triggered to create a function for the parameter 
        // We can use explore console output using the Google devtool )
    
// Add a pop-up on the click event for it to show on the map 
 map.on('mouseenter', ''location-points', () => {
map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over location points layer
 });

map.on('mouseleave', '', () => {
map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves location points layer
map.setFilter("location-points", ['==', ['get', 'PRUID'], '']); //Let thw filter reset the highlighted layer when mouse leaves feature
// });


map.on('click', ''location-points', (e) => {
new mapboxgl.Popup() //there will be a new popup object on each click
.addTo(map); //Show the popup on map
 }); 


