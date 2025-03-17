let options = {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: Infinity
}

let id = navigator.geolocation.watchPosition(success, error, options);

setTimeout(() => {
    navigator.geolocation.clearWatch(id);
    console.log('end');
}, 10000)

function success(position) {
    console.log(position);
}

function error(error) {
    console.error(error);
}