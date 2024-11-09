document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("/primary-page.html")) {
    loadHTML("../../../public/header.html");
    handleLinksLocation();
    loadPage();
}});

async function loadPage() {
  try {
    // Wrap the $.ajax call in a Promise
    const data = await new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3030/api/cars',
        type: 'GET',
        success: function(response) {
          if (Array.isArray(response)) {
            console.log(response);
              generateGrid(response);
              resolve(response);  // Resolve with the valid data
          } else {
            reject('Response is not an array');
          }
        },
        error: function(error) {
          reject(error);  // Reject the Promise if there’s an error
        }
      });
    });
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

    const container = document.createElement("div");
    container.className = "container";

    // Create the inner box div
    const box = document.createElement("div");
    box.className = "box";

    // Create the title span for the car image
    const eImg = document.createElement("img");
    if(carImage)
    {
      eImg.src = carImage;
    }

    // Create a div to hold the manufacturer, model, and publish date
    const detailsDiv = document.createElement("div");

    // Add car manufacturer
    const manufacturerStrong = document.createElement("strong");
    manufacturerStrong.textContent = carManufacturer;

    // Add car model
    const modelParagraph = document.createElement("p");
    modelParagraph.textContent = carModel + ' ' + yearOfManufacture;

    // Add publish date
    const publishDateSpan = document.createElement("span");
    publishDateSpan.textContent = `${Price}$`;

    // Append all elements to the details div
    detailsDiv.appendChild(manufacturerStrong);
    detailsDiv.appendChild(modelParagraph);
    detailsDiv.appendChild(publishDateSpan);

    // Append titleSpan and detailsDiv to the box
    box.appendChild(eImg);
    box.appendChild(detailsDiv);

    // Append the box to the container
    container.appendChild(box);

    // Append the container into the sender
    sender.appendChild(container);

    // Return the generated HTML as a string
    return sender;
}

function generateElementFromString(string){
    const range = document.createRange();
    const fragment = range.createContextualFragment(string);
    return fragment;
}

function generateGrid(items) {
    const output = document.getElementById("car-output");
    output.className = "grid-container";
    output.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        const gridItem = generateCarTemplate(items[i]._id, items[i].media.pictures[0], items[i].manufacturer, items[i].brand, items[i].price, items[i].yearOfManufacture);
        output.appendChild(gridItem);
    }
}
