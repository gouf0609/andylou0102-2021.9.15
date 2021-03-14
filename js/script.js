const nav = document.querySelector("nav");

const hamburger = document.querySelector(".hamburger");
const nav_items = document.querySelector(".nav-items");

const trigger = document.querySelectorAll(".trigger");
// const nav_link = document.querySelectorAll(".nav-contain a");


const carouselSlide = document.querySelector('.carousel-slide');
const carouselContent = document.querySelectorAll('.carousel-slide .slider');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const circleSlider = document.querySelectorAll('.circle-slider')

let counter = 0
let size = carouselContent[0].clientWidth;

window.addEventListener('resize', () => {
    size = carouselContent[0].clientWidth;
})


hamburger.addEventListener('click', function() {
    nav_items.classList.toggle('show');
});

// document.addEventListener('copy', function(e) {
//     e.preventDefault();
//     let msg = "測試測試測試";

//     //觸發copy事件取得選取文字並設定剪貼簿
//     e.clipboardData.setData("text/plain", window.getSelection() + msg);
// })

const about = document.querySelector('#about')
const project = document.querySelector('#project')
const contect = document.querySelector('#contect')

window.addEventListener('scroll', function() {
    nav.classList.toggle("navbar-shrink", window.scrollY > 0);
    let windo = window.scrollY;
    if(about.offsetTop <= windo && project.offsetTop > windo) {
        trigger[1].setAttribute('id', 'active');
        trigger[2].removeAttribute('id', 'active');
        trigger[3].removeAttribute('id', 'active');
    } else if(project.offsetTop <= windo && project.offsetTop + 800 > windo) {
        trigger[1].removeAttribute('id', 'active');
        trigger[2].setAttribute('id', 'active');
        trigger[3].removeAttribute('id', 'active');
    } else if(windo > project.offsetTop + 800){
        trigger[1].removeAttribute('id', 'active');
        trigger[2].removeAttribute('id', 'active');
        trigger[3].setAttribute('id', 'active');
    }

})



for(let i = 0; i < trigger.length; i++) {
    trigger[i].addEventListener('click', function() {
        if(nav_items.classList.contains("show")) {
            nav_items.classList.toggle('show');
        }
    })
}

trigger.forEach(e => e.addEventListener('click', smoothScroll));

function smoothScroll(e) {
    e.preventDefault();
    let targetId = e.target.getAttribute("href");
    // let targetPosition = target_.getBoundingClientRect().top;
    // let startPosition = window.pageYOffset;
    // let startTime = null;
    window.scrollTo({
        top: document.querySelector(targetId).offsetTop,
        behavior: "smooth"
    });
    // let run = easeInOut(timeElapsed,startPosition,targetPosition,duration);

    // function animation(currentTime) {
    //     if(startTime === null) startTime = currentTime;
    //     let timeElapsed = currentTime - startTime;
    //     let run = easeInOut(timeElapsed,startPosition,targetPosition,duration);
    //     window.scrollTo(0,run);
    //     if(timeElapsed < duration) requestAnimationFrame(animation);
    // }

    // function easeInOut(t, b, c, d) {
    //     t /= d/2;
    //     if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
    //     t--;
    //     return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
    // }
        
    // requestAnimationFrame(animation);
}

const nextEvent = function() {
    if(counter >= carouselContent.length - 1) return;
    carouselSlide.style.transition = 'transform 0.4s ease';
    counter++
    if(counter < carouselContent.length - 1) {
        document.getElementById('radio' + counter).checked = true
    }
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

nextBtn.addEventListener('click', () => {
    nextEvent();
})

setInterval(() => {
    nextEvent();
}, 6000)

prevBtn.addEventListener('click', () => {
    if(counter <= 0) return;
    carouselSlide.style.transition = 'transform 0.4s ease';
    counter--
    if(counter > 0 ) {
        document.getElementById('radio' + counter).checked = true
    }
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
})

carouselSlide.addEventListener('transitionend', () => {
    if(carouselContent[counter].id === 'lastClone') {
        carouselSlide.style.transition = 'none';
        counter = carouselContent.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        document.getElementById('radio' + counter).checked = true
    }
    if(carouselContent[counter].id === 'firstClone') {
        carouselSlide.style.transition = 'none';
        // 確保從index 1開始
        counter = carouselContent.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        document.getElementById('radio' + counter).checked = true
    }
})

for(let i = 0; i < circleSlider.length; i++) {
    circleSlider[i].addEventListener('click', () => {
        counter = i + 1;
        carouselSlide.style.transition = 'transform 0.4s ease';
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    })
}



// 開場字體動畫
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.fromTo('.site-heading', {opacity: 0, y:"10%"}, {opacity: 1, y:"0%", duration: 1.5});
tl.fromTo('.nav-contain a', {opacity: 0}, {opacity: 1, duration: 0.5});
