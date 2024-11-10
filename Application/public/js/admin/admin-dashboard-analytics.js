


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
    
    child.textContent = '$' + sum;
    elem.appendChild(child);

  }


function leftArrow(){
    const container = document.getElementById('graph-container');
    const curr = container.children[0];

    if(curr.id === 'graph2')
    {
        console.log(curr.id);
        container.innerHTML = '<svg id="graph1" width="800" height="400"></svg>';
        document.getElementById('left').style = 'fill: #f6f6f9';
        document.getElementById('right').style = 'fill: #363949';
        document.getElementById('graph-title').textContent = 'Revenue Graph:'
        revenue();
    }
}

function rightArrow(){
    const container = document.getElementById('graph-container');
    const curr = container.children[0];

    if(curr.id === 'graph1')
    {
        console.log(curr.id);
        container.innerHTML = '<svg id="graph2" width="800" height="400"></svg>';
        document.getElementById('right').style = 'fill: #f6f6f9';
        document.getElementById('left').style = 'fill: #363949';
        document.getElementById('graph-title').textContent = 'Stock Graph:'
        stock();
    }
}





    function stock(){
    fetch('http://localhost:3030/api/cars/chart-data')  // Fetch car data (car count by manufacturer)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Check the data format
            drawGraphStock(data);
        })
        .catch(err => console.error('Error fetching data:', err));
        }
        // Function to draw the graph
    function drawGraphStock(data) {
        const margin = { top: 20, right: 100, bottom: 100, left: 80 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("svg#graph2")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set the X scale for manufacturers
        const x = d3.scaleBand()
            .domain(data.map(d => d.manufacturer))
            .range([0, width])
            .padding(0.3);

        // Set the Y scale for car count
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.carCount) || 1])  // Handle small or zero values
            .nice()
            .range([height, 0]);

        // Append the bars for each manufacturer
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.manufacturer))
            .attr("y", d => y(d.carCount || 0))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.carCount || 0))  // Ensure height is positive
            .attr("fill", "#6c9bcf");

        // Append the X-axis (manufacturer names)
        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x))
        //     .selectAll("text")
        //     .style("text-anchor", "middle")
        //     .style("font-size", "12px");


            // Append the X-axis (manufacturer names)
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.style("text-anchor", "end")      // Align text to the end for readability
.attr("transform", "rotate(-45)") // Rotate labels by -45 degrees
.style("font-size", "12px")
.style("fill", "#363949");

        // Append the Y-axis (car count)
        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        // Add title for the X axis (Manufacturers)
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom - 10) + ")")
            .style("text-anchor", "middle")
            .text("Manufacturers")
            .style("fill", "#363949");

        // Add title for the Y axis (Car Count)
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .text("Cars By Manufacturs Numbers")
            .style("fill", "#363949");

        // Append the car count numbers next to each bar on the right side
        svg.selectAll(".label")
            .data(data)
            .enter().append("text")
            .attr("class", "label")
            .attr("x", d => x(d.manufacturer) + x.bandwidth() / 2)
            .attr("y", d => y(d.carCount || 0) - 10)
            .attr("text-anchor", "middle")
            .text(d => d.carCount)
            .style("font-size", "12px")
            .style("fill", "black");
        }


function revenue(){
  fetch('http://localhost:3030/api/orders/revenue/2024')  // Fetch revenue data for 2024
  .then(response => response.json())
  .then(revenue => {
    // D3.js code to create graph
    drawGraphRevenue(revenue);
  })
  .catch(err => console.error('Error fetching data:', err));
}
// Function to draw the graph
function drawGraphRevenue(data) {
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
    .attr("stroke", "#6c9bcf")
    .attr("stroke-width", 2);

  // Append the circles (dots) for each data point
  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.month) + x.bandwidth() / 2)  // X-coordinate for the circle (same as the line)
    .attr("cy", d => y(d.totalRevenue))  // Y-coordinate for the circle (same as the line)
    .attr("r", 5)  // Radius of the circle (dot size)
    .attr("fill", "#ff0060");  // Circle color

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
    .text("Months")
    .style("fill", "#363949");

  // Add title for the Y axis (Total Revenue)
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))
    .style("text-anchor", "middle")
    .text("Orders")
    .style("fill", "#363949");
}





  function loadPage(){
    loadUsers();
    loadOrders();
    


    setTimeout(() => {
        console.log("Orders fetched from the database!");
        totalSales();
            document.getElementById('left').style = 'fill: #f6f6f9';
    document.getElementById('right').style = 'fill: #363949';
        revenue();
        stock();
      }, 1000);
}