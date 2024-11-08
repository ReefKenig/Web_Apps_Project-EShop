const apiUrl = "http://localhost:3030/api/users/register";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const submitBtn = document.getElementById("submitBtn");
  const inputs = Array.from(form.querySelectorAll("input[required]"));

  // Function to check if all inputs have values
  function checkInputs() {
    const allFilled = inputs.every(input => input.value.trim() !== "");
    submitBtn.disabled = !allFilled;
  }

  // Add event listeners to each input to check on input change
  inputs.forEach(input => input.addEventListener("input", checkInputs));
});

async function getFormValues() {
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if(password === passwordConfirm) {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: username,
        password: password,
        isAdmin: false,
        orderHistory: [],
        shoppingCart: []
      }
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error("Error creating user: " + response.statusText);
      }
  
      const data = await response.json();
      console.log("User created successfully:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
