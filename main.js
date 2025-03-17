const options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0
}

function success(pos) {
    console.log(pos);
}

function error(error) {
    console.error(error);
}

navigator.geolocation.getCurrentPosition(success, error, options);

/*
let id = navigator.geolocation.watchPosition(success, error, options);

setTimeout(() => {
    navigator.geolocation.clearWatch(id);
    console.log('end');
}, 10000);
*/