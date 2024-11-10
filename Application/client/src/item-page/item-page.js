function selectPicture(imageSrc) {
  document.getElementById("main-picture").src = imageSrc;
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("item-page")) {
    loadHTML("/header.html");
    handleLinksLocation();
    loadCar();
  }
});

function loadHTML(page) {
  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("nav-template").innerHTML = html;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function handleLinksLocation() {
  setTimeout(() => {
    const home = document.getElementById("home");
    const logo = document.getElementById("logo");
    const shop = document.getElementById("shop");
    const contact = document.getElementById("contact");

    home.href = "../../index.html";
    logo.href = "../../index.html";
    shop.href = "../../src/primay-page/primary-page.html";
    contact.href = "../../src/contact-us/contact-us.html";
  }, 100);
}


async function loadCar() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const apiUrl = `http://localhost:3030/api/cars/search/${id}`; // Adjust URL as needed

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching car: " + response.statusText);
    }

    const carData = await response.json();
    window.carData = carData;
  } catch (error) {
    console.error("Error:", error);
  }

  document.getElementById("des-name").textContent = carData.manufacturer + ' ' + carData.brand;
  document.getElementById("des-content").textContent = carData.description;
  document.getElementById("price").textContent = 'For only ' + carData.price + '$';
  document.getElementById("main-picture").src = carData.media.pictures[0];
}

