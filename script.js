const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "QNRl5YO8zWJyhtGw96YRg5GBZXVaKHg3U-727CxqDVM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const setAttributes = (element, attributes) => {
  // Helped function to set multiple attributes to an HTML element
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = () => {
  photosArray.forEach((photo) => {
    // Create <a> that links to Unsplash
    const item = document.createElement("a");
    const img = document.createElement("img");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    });
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
    console.log(imageContainer);
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

window.addEventListener("scroll", () => {
  console.log("scrolled");
});

getPhotos();
