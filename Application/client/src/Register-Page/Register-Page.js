const apiUrl = "http://localhost:3030/api/users/register";

document.addEventListener("DOMContentLoaded", function () {
  loadHTML("/header.html");
  
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
  handleLinksLocation();
});

async function getFormValues() {
  const username = document.getElementById("username").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  if (password === passwordConfirm) {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: username,
      password: password,
      isAdmin: false,
      orderHistory: [],
      shoppingCart: [],
    };
    await createUser(userData);
  } else {
    throw new Error("Error - password and password confirm are not the same");
  }
}

function handleSubmit(event) {
  event.preventDefault();
}

async function createUser(userData) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error creating user: " + response.statusText);
    }

    const data = await response.json();
    window.location.href = "../../src/login-page/login-page.html";
  } catch (error) {
    console.error("Error:", error);
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
