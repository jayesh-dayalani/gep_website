'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// perplex
document.addEventListener("DOMContentLoaded", function () {
  const heroSliders = document.querySelectorAll("[data-hero-slider]");

  heroSliders.forEach(slider => {
    const sliderName = slider.getAttribute("data-hero-slider");
    const sliderItems = slider.querySelectorAll("[data-hero-slider-item]");
    let currentSlidePos = 0;
    let lastActiveSliderItem = sliderItems[0];

    // Select only controls for this slider
    const prevBtn = document.querySelector(`[data-prev-btn="${sliderName}"]`);
    const nextBtn = document.querySelector(`[data-next-btn="${sliderName}"]`);

    function updateSliderPos() {
      lastActiveSliderItem.classList.remove("active");
      sliderItems[currentSlidePos].classList.add("active");
      lastActiveSliderItem = sliderItems[currentSlidePos];
    }

    function slideNext() {
      if (currentSlidePos >= sliderItems.length - 1) {
        currentSlidePos = 0;
      } else {
        currentSlidePos++;
      }
      updateSliderPos();
    }

    function slidePrev() {
      if (currentSlidePos <= 0) {
        currentSlidePos = sliderItems.length - 1;
      } else {
        currentSlidePos--;
      }
      updateSliderPos();
    }

    nextBtn?.addEventListener("click", slideNext);
    prevBtn?.addEventListener("click", slidePrev);

    // Optional: Auto Slide for each
    let autoSlideInterval;
    function autoSlide() {
      autoSlideInterval = setInterval(slideNext, 7000);
    }

    [nextBtn, prevBtn].forEach(btn => {
      btn?.addEventListener("mouseover", () => clearInterval(autoSlideInterval));
      btn?.addEventListener("mouseout", autoSlide);
    });

    window.addEventListener("load", autoSlide);

    // Init
    updateSliderPos();
  });
});
// perplex

/**
 * HERO SLIDER
 */

// const heroSlider = document.querySelector("[data-hero-slider]");
// const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
// const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
// const heroSliderNextBtn = document.querySelector("[data-next-btn]");

// let currentSlidePos = 0;
// let lastActiveSliderItem = heroSliderItems[0];

// const updateSliderPos = function () {
//   lastActiveSliderItem.classList.remove("active");
//   heroSliderItems[currentSlidePos].classList.add("active");
//   lastActiveSliderItem = heroSliderItems[currentSlidePos];
// }

// const slideNext = function () {
//   if (currentSlidePos >= heroSliderItems.length - 1) {
//     currentSlidePos = 0;
//   } else {
//     currentSlidePos++;
//   }

//   updateSliderPos();
// }

// heroSliderNextBtn.addEventListener("click", slideNext);

// const slidePrev = function () {
//   if (currentSlidePos <= 0) {
//     currentSlidePos = heroSliderItems.length - 1;
//   } else {
//     currentSlidePos--;
//   }

//   updateSliderPos();
// }

// heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

// let autoSlideInterval;

// const autoSlide = function () {
//   autoSlideInterval = setInterval(function () {
//     slideNext();
//   }, 7000);
// }

// addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
//   clearInterval(autoSlideInterval);
// });

// addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

// window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});


// Replace with your actual project values:
const SUPABASE_URL = 'https://pzulusjpvcfdunjrpslx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dWx1c2pwdmNmZHVuanJwc2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjQ2MTIsImV4cCI6MjA3MDkwMDYxMn0.QRwo3KGku7lxgy6iePNc7SZpO9ZvaTs2XWSMYoeOQdg';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
document.querySelector('.form-left').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = this.querySelector('[name="name"]').value;
  const contact = this.querySelector('[name="contact"]').value;
  const message = this.querySelector('[name="message"]').value;

  const { data, error } = await supabase
    .from('cta')
    .insert([
      { name, contact, message }
    ]);

  if (error) {
    alert('Lead not submitted: ' + error.message);
    return;
  }

  alert('Thank you, we have received your request!');
  this.reset();
});
