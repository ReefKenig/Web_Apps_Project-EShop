window.onload = function() {
  if (window.location.pathname.includes("/primay-page")) {
      loadPage();
  }
};

async function loadPage(page) {
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

function generateCarTemplate(carImage, carManufacturer, carModel, Price) {
    // Create a container div
    const container = document.createElement("div");
    container.className = "container";

    // Create the inner box div
    const box = document.createElement("div");
    box.className = "box";

    // Create the title span for the car image
    const titleSpan = document.createElement("span");
    titleSpan.className = "title";
    titleSpan.textContent = carImage;

    // Create a div to hold the manufacturer, model, and publish date
    const detailsDiv = document.createElement("div");
    

    // Add car manufacturer
    const manufacturerStrong = document.createElement("strong");
    manufacturerStrong.textContent = carManufacturer;

    // Add car model
    const modelParagraph = document.createElement("p");
    modelParagraph.textContent = carModel;


    // Add publish date
    const publishDateSpan = document.createElement("span");
    publishDateSpan.textContent = Price;

    // Append all elements to the details div
    detailsDiv.appendChild(manufacturerStrong);
    detailsDiv.appendChild(modelParagraph);
    detailsDiv.appendChild(publishDateSpan);

    // Append titleSpan and detailsDiv to the box
    box.appendChild(titleSpan);
    box.appendChild(detailsDiv);

    // Append the box to the container
    container.appendChild(box);

    // Return the generated HTML as a string
    return container;
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
        const gridItem = generateCarTemplate(items[i].media.pictures[0], items[i].manufacturer, items[i].brand, items[i].price);
        output.appendChild(gridItem);
    }
}