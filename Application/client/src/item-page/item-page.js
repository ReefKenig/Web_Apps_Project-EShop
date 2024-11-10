function selectPicture(imageSrc) {
  document.getElementById("main-picture").src = imageSrc;
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("item-page")) {
    loadHTML("../../../public/header.html");
    handleLinksLocation();
  }
});

function handleLinksLocation() {
  setTimeout(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const register = document.getElementById("register");
      register.remove();
    }
    let ul = document.getElementById("ul");
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "/views/user/user-profile.html";
    a.textContent = "Profile";

    li.appendChild(a);
    ul.appendChild(li);
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
        // Add Authorization header if needed
        // "Authorization": Bearer ${localStorage.getItem("authToken")}
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching car: " + response.statusText);
    }

    const carData = await response.json();
    console.log("Car data:", carData); // Use or display the data as needed
    window.carData = carData;
  } catch (error) {
    console.error("Error:", error);
  }

  console.log(id);
  console.log(carData);

  document.getElementById("des-name").textContent = carData.manufacturer + ' ' + carData.brand;
  document.getElementById("des-content").textContent = carData.description;
  document.getElementById("price").textContent = 'For only ' + carData.price + '$';
  document.getElementById("main-picture").src = carData.media.pictures[0];
}

