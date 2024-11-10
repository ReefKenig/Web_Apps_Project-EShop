async function loadUsers() {
    try {
      // Wrap the $.ajax call in a Promise
       const users = await new Promise((resolve, reject) => {
        $.ajax({
          url: 'http://localhost:3030/api/users',
          type: 'GET',
          success: function(response) {
            if (Array.isArray(response)) {
              console.log(response);
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
      window.users = users;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  


  async function loadOrders() {
    try {
      // Wrap the $.ajax call in a Promise
      const orders = await new Promise((resolve, reject) => {
        $.ajax({
          url: 'http://localhost:3030/api/orders',
          type: 'GET',
          success: function(response) {
            if (Array.isArray(response)) {
              console.log(response);
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
      window.orders = orders;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }







  function generateProfile(user){

    const container = document.createElement('div');

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "50");
    svg.setAttribute("height", "50");
    svg.setAttribute("viewBox", "0 0 50 50");

    // Create a circle element
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "25");  // Center x-coordinate
    circle.setAttribute("cy", "25");  // Center y-coordinate
    circle.setAttribute("r", "20");   // Radius of the circle
    circle.setAttribute("fill", "#f0f0f0"); // Circle color
    circle.setAttribute("stroke", "black"); // Border color
    circle.setAttribute("stroke-width", "2"); // Border thickness

    // Create a text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "50%");
    text.setAttribute("y", "50%");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "20");
    text.textContent = user.firstName[0];

    // Append the circle and text to the SVG, then the SVG to the container
    svg.appendChild(circle);
    svg.appendChild(text);
    container.appendChild(svg);
    return container
}


function generateElementFromString(string){

    const range = document.createRange();
    const fragment = range.createContextualFragment(string);
    return fragment;
  }


//Users Tab
function loadProfiles(){

    const container = document.getElementById("users");

    for(i = 0; i < users.length; i++)
    {
        container.appendChild(generateProfile(users[i]));
        console.log('Added profile!')
    }

}



function loadPage(){
    loadUsers();
    loadOrders();
    
    setTimeout(() => {
        console.log("Orders fetched from the database!");
        loadProfiles();
      }, 1000);
}