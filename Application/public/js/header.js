document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html') // Load the header.html file
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-container').innerHTML = data; // Insert the header into the page
      })
      .catch(error => console.error('Error loading header:', error));
  });