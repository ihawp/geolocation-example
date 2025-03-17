const options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0
}

// navigator.geolocation.getCurrentPosition(success, error, options);

let l = navigator.geolocation.watchPosition(success, error, options);

setTimeout(() => {
    navigator.geolocation.clearWatch(l);
    console.log('--- end ---');
}, 10000);

function success(pos) {
    console.log(pos);
}
function error(error) {
    console.error(error);
}