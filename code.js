const api_key = "AO6YHdLOYHkGUOhoFnfRRzrsDu8D-LiAvxBdm-XjxbA";
const imagesNumber = 10;
const url = `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=${imagesNumber}`;
let images;

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

const generateImages = (array) => {
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

getPhotos();
