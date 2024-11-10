let currentCurrency = 'USD'; // Default currency
let exchangeRate = 1; // Default exchange rate
let originalPrices = []; // Array to store the original prices of cars

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("/primary-page.html")) {
    loadHTML("../../../public/header.html");
    handleLinksLocation();
    loadPage();
}});

async function loadPage() {
  try {
    // Fetch car data
    const data = await new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3030/api/cars/search',
        type: 'GET',
        success: function(response) {
          if (Array.isArray(response)) {
            console.log("Car data:", response); // Log the response to check the data
            generateGrid(response);  // Populate the grid with the received data
            resolve(response);
          } else {
            reject('Response is not an array');
          }
        },
        error: function(error) {
          reject(error);
        }
      });
    });

    // Fetch exchange rate on page load for default currency (USD)
    await fetchExchangeRate(currentCurrency);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function handleLinksLocation() {
  setTimeout(() => {
    const home = document.getElementById('home');
    const logo = document.getElementById('logo');
    const shop = document.getElementById('shop');
    const register = document.getElementById('register2');
    const contact = document.getElementById('contact');
    const nav = document.getElementById("nav");
    const currencySwitcherHTML = `
    <div class="currency-switch">
        <img src="data:image/png;base64,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" onclick="changeCurrency('ILS')" alt="Israel Flag" class="flag" id="ilFlag">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" onclick="changeCurrency('USD')" alt="USA Flag" class="flag" id="usFlag">
    </div>
`;

// Insert the HTML into the navbar
nav.insertAdjacentHTML("beforeend", currencySwitcherHTML);

    home.href = '../../index.html';
    logo.href = '../../index.html';
    shop.href = '../primay-page/primary-page.html';
    register.href = '../register-page/Register-Page.html';
    contact.href = '../contact-us/contact-us.html';
}, 100);
}

function loadHTML(page) {
  fetch(page)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(html => {
          document.getElementById("nav-template").innerHTML = html;
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
}

function generateCarTemplate(_id, carImage, carManufacturer, carModel, Price, yearOfManufacture) {
    // Create a container div
    const sender = document.createElement('a');
    sender.href = '../item-page/item-page.html';
    sender.className = 'a';
}
// Function to fetch exchange rate from the ExchangeRateAPI
async function fetchExchangeRate(currency) {
  const apiKey = '371bf7bb3f3aff589d68d64b';  // Replace with your ExchangeRateAPI key
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;  // Fetching rates based on USD
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "success") {
      exchangeRate = data.conversion_rates[currency] || 1; // Use the conversion rate for the selected currency or fallback to 1
      console.log(`Exchange rate for ${currency}: ${exchangeRate}`);
      updatePrices();  // Update prices after fetching the exchange rate
    } else {
      console.error('Error fetching exchange rate');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function generateElementFromString(string){
    const range = document.createRange();
    const fragment = range.createContextualFragment(string);
    return fragment;
}

// Function to handle flag click and change currency
function changeCurrency(currency) {
  currentCurrency = currency;
  fetchExchangeRate(currency);  // Fetch the exchange rate and update prices
}

// Function to format the price with 2 decimal places
function formatPrice(price) {
  return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Function to generate car template and correctly place the price
function generateCarTemplate(_id, carImage, carManufacturer, carModel, price, yearOfManufacture) {
  const sender = document.createElement('a');
  sender.href = `../item-page/item-page.html?id=${_id}`;
  sender.className = 'a';

  const container = document.createElement("div");
  container.className = "container";

  const box = document.createElement("div");
  box.className = "box";

  const eImg = document.createElement("img");
  eImg.src = carImage || 'default-image.jpg';  // Default image if no car image is available
  eImg.alt = `${carManufacturer} ${carModel}`;  // Add alt text for image accessibility

  const detailsDiv = document.createElement("div");

  const manufacturerStrong = document.createElement("strong");
  manufacturerStrong.textContent = carManufacturer;

  const modelParagraph = document.createElement("p");
  modelParagraph.textContent = `${carModel} ${yearOfManufacture}`;

  const priceSpan = document.createElement("span");

  // Store original price for each car
  originalPrices.push(price);

  // Apply exchange rate to price and place in the correct car box
  priceSpan.textContent = `${formatPrice(price * exchangeRate)} ${currentCurrency}`; 

  detailsDiv.appendChild(manufacturerStrong);
  detailsDiv.appendChild(modelParagraph);
  detailsDiv.appendChild(priceSpan);

  box.appendChild(eImg);
  box.appendChild(detailsDiv);

  container.appendChild(box);
  sender.appendChild(container);

  return sender;
}

// Function to generate the grid and update car prices based on selected currency
function generateGrid(items) {
  const output = document.getElementById("car-output");
  output.className = "grid-container"; 

  output.innerHTML = ""; // Clear any existing grid items

  if (items.length === 0) {
    console.log("No cars available");
  }

  items.forEach(item => {
    const gridItem = generateCarTemplate(
      item._id,
      item.media.pictures[0] || 'default-image.jpg',  // Fallback if no image exists
      item.manufacturer,
      item.brand,
      item.price,
      item.yearOfManufacture
    );
    gridItem.id="carstar"
    output.appendChild(gridItem);
  });
}

// Update all car prices when currency changes
function updatePrices() {
  const gridItems = document.querySelectorAll('#carstar');
  const priceSpans = document.querySelectorAll('#carstar span');

  priceSpans.forEach((priceSpan, index) => {
    const originalPrice = originalPrices[index]; // Get the original price from the stored array
    priceSpan.textContent = `${formatPrice(originalPrice * exchangeRate)} ${currentCurrency}`; // Recalculate price
  });
}

// Event listener for Israel flag click (change to Shekel)
document.getElementById('israel-flag')?.addEventListener('click', function() {
  changeCurrency('ILS'); // ILS for Israeli Shekel
});

// Event listener for USA flag click (change to USD)
document.getElementById('usa-flag')?.addEventListener('click', function() {
  changeCurrency('USD'); // USD for US Dollar
});

// Run loadPage on page load
document.addEventListener('DOMContentLoaded', loadPage);
