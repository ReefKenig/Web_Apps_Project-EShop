const apiUrl = "http://localhost:3030/api/users/login";

document.addEventListener("DOMContentLoaded", function () {
  loadHTML("/header.html");
  handleLinksLocation();
  const form = document.getElementById("form");
  const submitBtn = document.getElementById("submitBtn");
  const inputs = Array.from(form.querySelectorAll("input[required]"));

  // Function to check if all inputs have values
  function checkInputs() {
    const allFilled = inputs.every((input) => input.value.trim() !== "");
    submitBtn.disabled = !allFilled;
  }

  // Add event listeners to each input to check on input change
  inputs.forEach((input) => input.addEventListener("input", checkInputs));
});

function handleSubmit(event) {
  event.preventDefault();
}

async function onLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginInfo = {
    email,
    password,
  };
  await login(loginInfo);
}

async function login(loginInfo) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    if (!response.ok) {
      throw new Error("Error login: " + response.statusText);
    }
    const data = await response.json();
    handleLocalStorage(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function handleLocalStorage(data) {
  if (data.token) {
    localStorage.setItem("authToken", data.token);
    const userInfo = {
      id: data.user._id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      isAdmin: data.user.isAdmin,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "../../index.html";
  } else {
    console.log("Token not received");
  }
}

function handleLinksLocation() {
  setTimeout(() => {
    const home = document.getElementById("home");
    const logo = document.getElementById("logo");
    const shop = document.getElementById("shop");
    const register = document.getElementById("register2");
    const contact = document.getElementById("contact");

    home.href = "../../index.html";
    logo.href = "../../index.html";
    shop.href = "../primay-page/primary-page.html";
    register.href = "../register-page/Register-Page.html";
    contact.href = "../contact-us/contact-us.html";
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
