// Mobile Navigation
const l = document.getElementById("mobile-nav");
let navigation = document.getElementById("navigation");

navigation.addEventListener('click', function(event) {
    if (l.classList.contains('active')) {
        event.target.innerText = '|||';
        return l.classList.remove('active');
    }
    event.target.innerText = 'X';
    l.classList.add('active');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
        l.classList.remove('active');
        navigation.innerText = '|||'
    }
});