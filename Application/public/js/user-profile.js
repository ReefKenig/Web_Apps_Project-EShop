window.onload = function() {
    if (window.location.pathname.includes("/user/user-profile.html")) {
        loadPage();
    }
  };
  
  async function loadPage() {
    let userInfo;
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    if (token && user) {
        userInfo = JSON.parse(user);
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        name.textContent = `${userInfo.firstName} ${userInfo.lastName}`;
        email.textContent = userInfo.email;
    } else {
      console.log("No user or password found in localStorage.");
    }

   await getOrderHistory(userInfo.id);
  }

  async function getOrderHistory(userId) {
    try {
      // Wrap the $.ajax call in a Promise
      const data = await new Promise((resolve, reject) => {
        $.ajax({
          url: `http://localhost:3030/api/orders/user/${userId}`,
          type: 'GET',
          success: function(response) {
            if (Array.isArray(response)) {
                renderOrderHistory(response);
            } else {
              reject('Response is not an array');
            }
          },
          error: function(error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to render order history
function renderOrderHistory(data) {
    const container = document.getElementById("orderHistory");

    data.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.className = "order";
        orderDiv.innerHTML = `
            <p>Status: ${order.orderStatus}</p>
            <p>Total Cost: $${order.totalCost}</p>
            <p>Purchase Date: ${formatDate(order.purchaseDate)}</p>
            <p>Items:</p>
        `;

        const itemsDiv = document.createElement("div");
        itemsDiv.className = "items";

        order.items.forEach(item => {
            const car = item.carId;
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";
            itemDiv.innerHTML = `
                <strong><h4>${car.manufacturer} ${car.brand}</h4></strong>
                <p>Year: ${car.yearOfManufacture}</p>
                <p>Color: ${car.color}</p>
                <p>Price: $${car.price}</p>
                <p>Quantity: ${item.quantity}</p>
            `;

            itemsDiv.appendChild(itemDiv);
        });

        orderDiv.appendChild(itemsDiv);
        container.appendChild(orderDiv);
    });
}