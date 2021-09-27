const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let pageReady = false; // Page load status
let imagesLoaded = 0;
let totalImagesLoaded = 0;
let photosArray = [];

// Unsplash API
const count = 10; // How many images you want to load in one API call
const apiKey = "QNRl5YO8zWJyhtGw96YRg5GBZXVaKHg3U-727CxqDVM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImagesLoaded) {
    pageReady = true;
    loader.hidden = true;
  }
};

const setAttributes = (element, attributes) => {
  // Helped function to set multiple attributes to an HTML element
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create Elements for Links & Photos to add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImagesLoaded = photosArray.length;
  photosArray.forEach((photo) => {
    // Create <a> that links to Unsplash
    const item = document.createElement("a");
    const img = document.createElement("img");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Fetch photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
};

// If scrolled near (-1000px) bottom of the page, invoke getPhotos()
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    pageReady
  ) {
    // Reset page status to not ready such that scroll eventListener will be triggered again
    pageReady = false;
    getPhotos();
  }
});

// On Load
getPhotos();
