


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

  function totalSales(){
    const elem = document.getElementById("totalSales");
    const child = document.createElement('h1');
    let sum = 0;
    for(i=0; i < window.orders.length; i++)
    {
        sum += orders[i].totalCost;
    }
    
    child.textContent = sum + '$';
    elem.appendChild(child);

  }

function revenue(){
  fetch('http://localhost:3030/api/orders/revenue/2024')  // Fetch revenue data for 2024
  .then(response => response.json())
  .then(revenue => {
    // D3.js code to create graph
    drawGraph(revenue);
  })
  .catch(err => console.error('Error fetching data:', err));
}
// Function to draw the graph
function drawGraph(data) {
  const margin = { top: 20, right: 30, bottom: 80, left: 80 }; // Increased space for labels
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select("svg#graph1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Ensure the X-axis covers all 12 months, even if data is missing for some months
  const months = d3.range(1, 13);  // Create an array [1, 2, ..., 12]

  // Set the X-axis to cover all 12 months
  const x = d3.scaleBand()
    .domain(months)  // Use all 12 months as domain
    .range([0, width])
    .padding(0.1);

  // Set the Y scale to represent the total revenue
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.totalRevenue)])  // Set the max value of the Y-axis to the highest revenue
    .nice()  // Adds nice rounding to the scale
    .range([height, 0]);

  // Define the line function using d3.line()
  const line = d3.line()
    .x(d => x(d.month) + x.bandwidth() / 2)  // X-coordinate (centered within the band)
    .y(d => y(d.totalRevenue));  // Y-coordinate (total revenue)

  // Append the line graph by passing the data
  svg.append("path")
    .data([data])  // Data for the line graph
    .attr("class", "line")
    .attr("d", line)  // Path data (the line itself)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2);

  // Append the circles (dots) for each data point
  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.month) + x.bandwidth() / 2)  // X-coordinate for the circle (same as the line)
    .attr("cy", d => y(d.totalRevenue))  // Y-coordinate for the circle (same as the line)
    .attr("r", 5)  // Radius of the circle (dot size)
    .attr("fill", "red");  // Circle color

  // Append the x axis (months) with all 12 months
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d => {
      const monthsNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return monthsNames[d - 1];  // Convert month number (1–12) to month name
    }));

  // Append the y axis (total revenue)
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5));  // Add ticks to the Y-axis

  // Add title for the X axis (Months)
  svg.append("text")
    .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom - 10) + ")")
    .style("text-anchor", "middle")
    .text("Months");

  // Add title for the Y axis (Total Revenue)
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))
    .style("text-anchor", "middle")
    .text("Orders");
}

















  function loadPage(){
    loadUsers();
    loadOrders();
    revenue();

    //Total Sales
    setTimeout(() => {
        console.log("Orders fetched from the database!");
        totalSales();  // Call the function after waiting
      }, 2500);
}