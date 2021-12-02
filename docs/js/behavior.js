//Fpr Animation
const animationTargets = document.querySelectorAll(".animate, .animate-right");
const site = document.querySelector(".site_container");
const scrollOffset = 0.6;

//Fot hamburger Manu
const header = document.querySelector("#header")
const hamburger = document.querySelector(".nav_hamburger");
const navigationMenu = document.querySelector(".nav_list");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navigationMenu.classList.toggle("active");
  header.classList.toggle("active");
})

navigationMenu.addEventListener("click", () => {
  if (navigationMenu.classList.contains("active")) {
    hamburger.classList.toggle("active");
    navigationMenu.classList.toggle("active");
    header.classList.toggle("active");
  }
})

//Animate when scroll//
const animate = () => {
  console.log("called");
  animationTargets.forEach((target) => {
    const dist =
      target.getBoundingClientRect().top + target.clientHeight * scrollOffset;

    if (window.innerHeight <= dist) {
      target.classList.remove("shown");
    }
    if (window.innerHeight > dist) {
      target.classList.add("shown");
    }
  });
};

//Header color change//
const headerAnimate = () => {
  const header = document.querySelector(".header");
  const aboutus = document.querySelector(".aboutus");
  const dist = aboutus.getBoundingClientRect().top;

  if (window.innerHeight <= dist) {
    header.classList.remove("header_white");
  }
  if (window.innerHeight > dist) {
    header.classList.add("header_white");
  }
};

headerAnimate();
animate();

var scoll = new SmoothScroll("body", {
  speed: 500,
});

site.addEventListener("scroll", () => {
  headerAnimate();
  animate();
});
