// ihawp.com

// Define some variables
// DOM
const alert = document.getElementById('alert');
// Data
let userLocation = {};
let targetLocation = {};
// Tracking
// marker to be replaced,
// polyline to be replaced,
// id of watchPosition() for clearWatch()
let marker = undefined;
let polyline = undefined;
let id = undefined;

// Options for Geolocation API
const options = {
    maximumAge: 0,
    timeout: Infinity,
    enableHighAccuracy: true
};

/*

    Upon success the longitude/latitude position of the user is passed
    through callback to the success callback (with has one parameter, the
    users returned position)

*/
let map = L.map('map', { maxWidth: '500px', minWidth: '300px', maxHeight: '500px', minHeight: '300px', width: '500px', height: '500px'});

// Add a labeled marker to the map at any given latitude/longitude
function addMarker(lat, lon, label) {
    return L.marker([lat, lon]).addTo(map).bindPopup(label).openPopup();
}

// Used by getCurrentPosition() as the success callback function
function initialSuccess(pos) {

    // Store user location
    userLocation.latitude = pos.coords.latitude;
    userLocation.longitude = pos.coords.longitude;

    // Create a target location
    targetLocation.latitude = userLocation.latitude + 0.00010910000000308173;
    targetLocation.longitude = userLocation.longitude + 0.0005107999999912636;


    // Set variable (id) to hold id of watchPosition(...) for clearWatch(id).
    id = navigator.geolocation.watchPosition(success, error, options);

    // Set up the map
    map.setView([userLocation.latitude, userLocation.longitude], 18);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add initial markers (location, target location)
    marker = addMarker(userLocation.latitude, userLocation.longitude, 'Your Location');
    addMarker(targetLocation.latitude, targetLocation.longitude, 'Target Location');

    // Display a line (polyline) from the users start location to the target location
    polyline = L.polyline([[userLocation.latitude, userLocation.longitude], [targetLocation.latitude, targetLocation.longitude]], {color: 'red'}).addTo(map);
    map.fitBounds(polyline.getBounds());

}

// Used by watchPosition() as the success callback function
const success = (pos) => {
    if (pos.coords.latitude !== userLocation.latitude && pos.coords.longitude !== userLocation.longitude) {

        console.log('wow');

       // Set the updated user position
        userLocation.latitude = pos.coords.latitude;
        userLocation.longitude = pos.coords.longitude;

        // Set new map view
        map.setView([userLocation.latitude, userLocation.longitude], 18);

        // Remove last polyline
        map.removeLayer(polyline);

        // Remove last position marker
        map.removeLayer(marker);

        // Add new polyline
        polyline = L.polyline([[userLocation.latitude, userLocation.longitude], [targetLocation.latitude, targetLocation.longitude]], {color: 'red'}).addTo(map);
        map.fitBounds(polyline.getBounds());

        // Add new position marker
        marker = addMarker(userLocation.latitude, userLocation.longitude, 'Your Location');

    }

    // Determine if you reached the target location are within X metres!
    let within = 0.00025;
    if (targetLocation.latitude >= userLocation.latitude - within && targetLocation.latitude <= userLocation.latitude + within && targetLocation.longitude >= userLocation.longitude - within && targetLocation.longitude <= userLocation.longitude + within) {

        // Use the saved id of the watchPosition() call in the clearWatch() function to stop watching the user's location.
        navigator.geolocation.clearWatch(id);

        // Alert the user that they have reached their target location
        alert.firstElementChild.firstElementChild.innerText = 'You have reached the target location!';
        alert.style.backgroundColor = 'green';

    }
}

// Used as error callback for getCurrentPosition() and watchPosition()
function error(error) {
    console.error(`(${error.code}): ${error.message}`); // ERROR
    alert.firstElementChild.firstElementChild.innerText = 'Please enable location services for the app to work.'
}

// Start Script
navigator.geolocation.getCurrentPosition(initialSuccess, error, options);
