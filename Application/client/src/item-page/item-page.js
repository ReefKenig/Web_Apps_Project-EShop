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
