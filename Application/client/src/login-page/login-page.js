const apiUrl = "http://localhost:3030/api/users/login";

document.addEventListener("DOMContentLoaded", function () {
  loadHTML("http://127.0.0.1:3000/Application/public/header.html");
  handleLinksLocation();

  const form = document.getElementById("form");
  const submitBtn = document.getElementById("submitBtn");
  const inputs = Array.from(form.querySelectorAll("input[required]"));

  // Function to check if all inputs have values
  function checkInputs() {
    const allFilled = inputs.every((input) => input.value.trim() !== "");
    submitBtn.disabled = !allFilled;
    console.log("All filled:", allFilled); // Log the state of the button
  }

  // Add event listeners to each input to check on input change
  inputs.forEach((input) => input.addEventListener("input", checkInputs));
  inputs.forEach(input => input.addEventListener("input", checkInputs));

  // Add event listener to the form for handling submit
  form.addEventListener("submit", handleSubmit);
});

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();
}

// Function to handle login logic
async function onLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginInfo = {
    email,
    password,
  };
  await login(loginInfo);
}

// Function to send login request to the backend
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
    console.log("Login Response:", data); // Log the response to check the data
    handleLocalStorage(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to handle storing token and user data in localStorage
function handleLocalStorage(data) {
  console.log("handleLocalStorage Data:", data); // Check data structure
  if (data.token) {
    localStorage.setItem("authToken", data.token);
    const userInfo = {
      id: data.user?._id, // Using optional chaining in case data.user is undefined
      firstName: data.user?.firstName,
      lastName: data.user?.lastName,
      email: data.user?.email,
      isAdmin: data.user?.isAdmin,
    };
    console.log("Storing user info in localStorage:", userInfo); // Check userInfo data
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "./index.html"; // Adjust path based on your setup
  } else {
    console.log("Token not received", data); // Log response data for debugging
  }
}

// Function to set the location of various links on the page
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
    home.href = '../../index.html';
    logo.href = '../../index.html';
    shop.href = '../primay-page/primary-page.html';
    register.href = '../register-page/Register-Page.html';
    contact.href = '../contact-us/contact-us.html';
  }, 100);
}

// Function to load HTML content into the page (like header)
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

