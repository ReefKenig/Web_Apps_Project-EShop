let currentCurrency = 'USD'; // Default currency
let exchangeRate = 1; // Default exchange rate
let originalPrices = []; // Array to store the original prices of cars

async function loadPage() {
  try {
    // Fetch car data
    const data = await new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3030/api/cars',
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
    console.error('Error fetching exchange rate:', error);
  }
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
