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

    //Add 

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




// function generateGrid(carImage, carManufacturer, carModel, Price, rows, cols) {
//     const output = document.getElementById("car-output");
//     output.className = "grid-container"; // This will apply the grid styles

//     // Clear previous content if any
//     output.innerHTML = "";

//     // Generate grid items and add them to the container
//     for(let j = 0; j < cols; j++){
//         for (let i = 0; i < rows; i++) {
//             const gridItem = generateCarTemplate(carImage, carManufacturer, carModel, Price);
//             output.appendChild(gridItem);
//         }
//     }
// }


function generateGrid(carImage, carManufacturer, carModel, dateOfPublish, rows, cols) {
    const output = document.getElementById("car-output");
    output.className = "grid-container"; // Apply grid container styling

    // Clear previous content if any
    output.innerHTML = "";

    output.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    // Set the number of columns in the CSS dynamically
    output.style.gridTemplateColumns = `repeat(${cols}, 1fr)`; // Ensure exact number of columns

    // Generate grid items and add them to the container
    for (let i = 0; i < rows * cols; i++) {
        const gridItem = generateCarTemplate(carImage, carManufacturer, carModel, dateOfPublish);
        output.appendChild(gridItem);
    }
}
