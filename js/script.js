const hamburger = document.querySelector(".hamburger");
const nav_items = document.querySelector(".nav-items");

hamburger.addEventListener('click', function() {
    nav_items.classList.toggle('show');
});