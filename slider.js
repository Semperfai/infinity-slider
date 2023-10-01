const images = ["11.png", "22.png", "33.png", "44.png", "55.png", "66.png"];

let activeImage = 0;

const sliderPlace = document.querySelector(".slider-line");
const nextButton = document.querySelector(".next-button");
const prevButton = document.querySelector(".prev-button");
const widthOffset = document.querySelector(".slider").clientWidth;
sliderPlace.style.height = widthOffset + "px";
sliderPlace.style.width = 3 * widthOffset + "px";
sliderPlace.style.left = "-" + widthOffset + "px";

let flag = true;

const initSlider = () => {
  const img = document.createElement("img");
  img.alt = "image";
  img.src = "./images/" + images[activeImage];
  sliderPlace.append(img);
  nextImageGenerate();
  prevImageGenerate();
};

const nextImageGenerate = () => {
  let nextImage = activeImage + 1;
  if (nextImage >= images.length) {
    nextImage = 0;
  }

  const img = document.createElement("img");
  img.alt = "image";
  img.src = "./images/" + images[nextImage];
  sliderPlace.append(img);
};

const prevImageGenerate = (w = false) => {
  let prevImage = activeImage - 1;
  if (prevImage < 0) {
    prevImage = images.length - 1;
  }

  const img = document.createElement("img");
  img.alt = "image";
  img.src = "./images/" + images[prevImage];
  if (w) img.style.width = 0;
  sliderPlace.prepend(img);
};

const nextSlide = () => {
  if (!flag) return;
  flag = !flag;
  activeImage++;
  if (activeImage >= images.length) activeImage = 0;
  nextImageGenerate();
  animate({
    duration: 1000,
    draw: function (progress) {
      document.querySelector(".slider-line img").style.width =
        widthOffset * (1 - progress) + "px";
    },
    removeElement: document.querySelector(".slider-line img"),
  });
};

const prevSlide = () => {
  if (!flag) return;
  flag = !flag;
  activeImage--;
  if (activeImage <= 0) activeImage = images.length - 1;
  prevImageGenerate(true);
  animate({
    duration: 1000,
    draw: function (progress) {
      document.querySelector(".slider-line img").style.width =
        widthOffset * progress + "px";
    },
    removeElement: document.querySelector(".slider-line img:last-child"),
  });
};

initSlider();

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

const animate = ({ duration, draw, removeElement }) => {
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    let step = (time - start) / duration;
    if (step > 1) step = 1;
    draw(step);
    if (step < 1) {
      requestAnimationFrame(animate);
    } else {
      removeElement.remove();
      flag = true;
    }
  });
};
