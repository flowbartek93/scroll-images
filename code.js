const api_key = "AO6YHdLOYHkGUOhoFnfRRzrsDu8D-LiAvxBdm-XjxbA";
const imagesNumber = 15;
const url = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${imagesNumber}`;
let images;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const imagesCointainer = document.querySelector(".image-container");
const loader = document.getElementById("loader");

const getPhotos = async () => {
  try {
    const response = await fetch(url);
    images = await response.json();
    console.log(images);
    generateImages(images);
  } catch (err) {
    console.log(err);
  }
};

const imageLoaded = () => {
  console.log("img loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    console.log(ready);
    ready = true;
    console.log(ready);

    imagesLoaded = 0;
  }
};

const generateImages = (array) => {
  totalImages = images.length;

  console.log(totalImages);
  array.forEach((item, index) => {
    const imgElement = createDOMElement("img");
    const link = createDOMElement("a");

    setAttributesToElement(imgElement, {
      src: item.urls.regular,
      alt: item.alt_description,
      title: item.alt_description,
    });

    setAttributesToElement(link, {
      href: item.links.html,
      target: "_blank",
    });

    imgElement.addEventListener("load", imageLoaded);

    addElementToDOM(imagesCointainer, link);
    addElementToDOM(link, imgElement);
  });
};

const setAttributesToElement = (item, attrs) => {
  if (item.tagName === "IMG") {
    item.src = attrs.src;
    item.alt = attrs.alt;
    item.title = attrs.title;
  }

  if (item.tagName === "A") {
    item.href = attrs.href;
    item.target = attrs.target;
  }
};

const createDOMElement = (el) => {
  return document.createElement(el);
};

const addElementToDOM = (parentElement, el) => {
  return parentElement.appendChild(el);
};

//Checking if scroll is getting close to bottom

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

document.addEventListener("DOMContentLoaded", getPhotos);
