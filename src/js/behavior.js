const animationTargets = document.querySelectorAll(".animate, .animate-right");
const site = document.querySelector(".site_container");
const scrollOffset = 0.6;

//Animate when scroll//
const animate = () => {
  console.log('called')
  animationTargets.forEach((target) => {
    const dist = target.getBoundingClientRect().top + target.clientHeight * scrollOffset;

    if (window.innerHeight > dist) {
      target.classList.add("shown");
    }
  });
};

//Header color change//
const headerAnimate = () => {
  const header = document.querySelector(".header");
  const aboutus = document.querySelector(".about_us")
  const dist = aboutus.getBoundingClientRect().top;

  if (window.innerHeight <= dist) {
    header.classList.remove("header_white");
  }
  if (window.innerHeight > dist) {
    header.classList.add("header_white");
  }
}

headerAnimate();
animate();

site.addEventListener("scroll", () => {
  headerAnimate();
  animate();
});
