mapboxgl.accessToken = 'pk.eyJ1IjoibXV6bmFtaWFuIiwiYSI6ImNtNXBsc2xjcDAyaWkybm9wZXFuMjNzMTQifQ.0ATJsQJDSlSrpNrQpdMq0Q';

const map = new mapboxgl.Map({
    container: "my-map", // Corrected ID for the map container
    style: "mapbox://styles/muznamian/cm7uod8ri00du01sagvvh78i8",
    center: [-79.39, 43.66],
    zoom: 12,
});
map.on('load', () => {
    // Adding GeoJSON source from GitHub
    map.addSource('touristattractions', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/muznamian/Web-map-3-/refs/heads/main/touristattractions.geojson'
    
    });
    
        map.addLayer({
            'id': 'location-points',
            'type': 'circle',
            'source': 'touristattractions',
                'paint': {
                    'circle-color': [
                'step', // the step expression will help to show the points in different colors based on the capacity of indviduals in specific areas 
                 ['get', 'population capacity'], // using the get expression we can assign values to each tourist attraction location 
                '#ADD8E6', // this color is assigned to any of the values < in the primary step 
                300, 'red',// Hockey Hall of Fame 
                450, 'green', // The AGO  the colors are assigned to each toursit attraction to connect to its capcity 
                700, 'blue',// CN Tower 
                1000, 'purple',// Toronto City Hall 
                4000, 'orange',// The ROM 
                49286, 'black',// The Rogers Centre 
            ]
        }
    });
        map.addControl(
            new MapboxGeocoder({
                accessToken: 'pk.eyJ1IjoibXV6bmFtaWFuIiwiYSI6ImNtNXBsc2xjcDAyaWkybm9wZXFuMjNzMTQifQ.0ATJsQJDSlSrpNrQpdMq0Q',
                mapboxgl: mapboxgl,
                countries: "ca"})

                
        ); // Limit to Canada only, but users can focus on Toronto 

                 // Adding the map addlayer inside the 'load' event since when it was outside points would not load 
 
        
        // Allow for zoom and rotation on the map 
        map.addControl(new mapboxgl.NavigationControl());
        
        // Ensure the map appears as a full screen 
        map.addControl(new mapboxgl.FullscreenControl());

        map.on('click', 'location-points', (e) => {
                new mapboxgl.Popup() //Define the new popup object for the click feature
                    .setLngLat(e.lngLat) //One idea is a method to set coordinates of popup based on mouse click location
                    .setHTML("<b>Toronto attractions:</b> " + e.features[0].properties.name + "<br>" + 
                       "Capacity: " + e.features[0].properties['population capacity'] + "</br>") // Correct the syntax here
        .addTo(map); // Show the popup on the map

});

});
