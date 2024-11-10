const body = document.querySelector("body"),
  links = document.querySelectorAll('a[href="#"]'),
  navToggle = document.querySelector("header nav .toggle"),
  navSpanMiddle = document.querySelector("header nav .toggle .middle"),
  navNavigationBar = document.querySelector("header nav .navigation-bar"),
  navNavigationBarLi = document.querySelectorAll(
    "header nav .navigation-bar li"
  ),
  headerText = document.querySelector("header .text"),
  headerSection = document.querySelector("header"),
  aboutSection = document.querySelector(".about-us"),
  recipeSection = document.querySelector(".recipes"),
  menuSection = document.querySelector(".menu"),
  fixedImageSection = document.querySelector(".fixed-image"),
  footerSection = document.querySelector("footer"),
  dotOne = document.querySelector(".dots .one"),
  dotTwo = document.querySelector(".dots .two"),
  dotThree = document.querySelector(".dots .three"),
  dots = document.querySelectorAll(".dots > div"),
  svgDown = document.querySelector("header .arrow-down"),
  svgUp = document.querySelector(".copyright .arrow-up"),
  menuImgs = document.querySelectorAll(".menu .menu-image-container img"),
  boxModel = document.querySelector(".menu .box-model"),
  menuImageContainer = document.querySelector(".menu-image-container"),
  boxModelArrow = document.querySelector(".menu .box-model .arrow"),
  boxModelImage = document.querySelector(".menu .box-model img"),
  pageTitle = document.querySelector("title");

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "path/to/your/styles.css";

// remove link
function fadeOutEffect() {
  const fadeEffect = setInterval(function () {
    if (!link.style.opacity) {
      link.style.opacity = 1;
    }
    if (link.style.opacity > 0) {
      link.style.opacity -= 0.4;
    } else {
      body.classList.remove("stop-scroll");
      link.classList.add("remove");
      clearInterval(fadeEffect);
    }
  }, 100);
}
window.addEventListener("load", fadeOutEffect);

// prevent links click hash
links.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();
  })
);

// toggle hamburger menu button
navToggle?.addEventListener("click", () => {
  navToggle?.classList.toggle("active");
  navSpanMiddle.classList.toggle("hide");
  navNavigationBar.classList.toggle("show");
});

// show active navigationbar li
navNavigationBarLi.forEach((li) =>
  li.addEventListener("click", () => {
    const arr = Array.from(li.parentElement.children);
    arr.forEach((li) => li.classList.remove("active"));
    li.classList.add("active");
  })
);

// svg-up smooth scroll
svgUp?.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

window.onscroll = function () {
  // if(logoImage !== null) {
  // make navbar fixed & change logo color
  if (window.pageYOffset > headerSection?.offsetHeight - 75) {
    nav?.classList.add("active");
    logoImage.src =
      "https://res.cloudinary.com/abdel-rahman-ali/image/upload/v1535988525/logo-rosa.png";
  } else {
    nav?.classList.remove("active");
    logoImage.src =
      "https://res.cloudinary.com/abdel-rahman-ali/image/upload/v1535988515/logo-rosa-white.png";
  }
  // }

  // header welcome fade out and in
  if (window.pageYOffset > 0 && headerText !== null) {
    headerText.style.opacity = -window.pageYOffset / 300 + 1;
  }

  // home page JS
  if (pageTitle.text === "ROSA- Restaurant") {
    //change dots background color
    if (window.pageYOffset < headerSection?.offsetHeight * 0.5) {
      dots.forEach((dot) => dot.classList.remove("black"));
      dotTwo.classList.remove("active");
      dotOne.classList.add("active");
    } else if (
      window.pageYOffset > headerSection?.offsetHeight * 0.5 &&
      window.pageYOffset < recipeSection.offsetTop * 0.72
    ) {
      dots.forEach((dot) => dot.classList.add("black"));
    } else if (
      window.pageYOffset > recipeSection.offsetTop * 0.75 &&
      window.pageYOffset < menuSection.offsetTop * 0.81
    ) {
      dots.forEach((dot) => dot.classList.remove("black"));
      dotOne.classList.remove("active");
      dotThree.classList.remove("active");
      dotTwo.classList.add("active");
    } else if (
      window.pageYOffset > menuSection.offsetTop * 0.81 &&
      window.pageYOffset < fixedImageSection.offsetTop * 0.86
    ) {
      dots.forEach((dot) => dot.classList.add("black"));
      dotThree.classList.remove("active");
      dotTwo.classList.add("active");
    } else if (
      window.pageYOffset > fixedImageSection.offsetTop * 0.86 &&
      window.pageYOffset < footerSection.offsetTop * 0.72
    ) {
      dots.forEach((dot) => dot.classList.remove("black"));
      dotTwo.classList.remove("active");
      dotThree.classList.add("active");
    } else if (
      window.pageYOffset > footerSection.offsetTop * 0.72 &&
      window.pageYOffset < footerSection.offsetTop * 0.901
    ) {
      dots.forEach((dot) => dot.classList.add("black"));
    } else if (window.pageYOffset > footerSection.offsetTop * 0.901) {
      dots.forEach((dot) => dot.classList.remove("black"));
    }
  }
};

// home page JS
if (pageTitle.text === "ROSA- Restaurant") {
  // svg-down smooth scroll
  svgDown.addEventListener("click", () => {
    window.scroll({
      top: aboutSection.offsetTop - 30,
      behavior: "smooth",
    });
  });

  // dots smooth scroll
  dots.forEach((dot) =>
    dot.addEventListener("click", function () {
      window.scrollTo({
        top: document.querySelector(this.dataset.x).offsetTop - 100,
        behavior: "smooth",
      });
    })
  );

  // show box model
  menuImgs.forEach((img) =>
    img.addEventListener("click", function () {
      const arr = Array.from(this.parentElement.parentElement.children);

      arr.forEach((div) => div.classList.remove("active"));

      this.parentElement.classList.add("active");
      boxModel.classList.add("active");
      boxModelImage.src = this.src;
      boxModelImage.classList.add("active");
      body.classList.add("hide-scroll");
    })
  );

  // box model functions
  function boxModelFun(e) {
    // close box model
    if (
      e.code === "Escape" ||
      (e.target.tagName === "DIV" && !e.target.classList.contains("arrow")) ||
      e.target.classList.contains("close")
    ) {
      boxModel.classList.remove("active");
      body.classList.remove("hide-scroll");
    }

    if (boxModel.classList.contains("active")) {
      if (
        e.code === "ArrowRight" ||
        e.code === "ArrowLeft" ||
        e.target.classList.contains("arrow-right") ||
        e.target.classList.contains("arrow-left")
      ) {
        const arr = Array.from(menuImageContainer.children);
        const active = arr.find((div) => div.classList.contains("active"));

        // change box model image
        if (
          e.target.classList.contains("arrow-right") ||
          e.code === "ArrowRight"
        ) {
          if (active.nextElementSibling === null) {
            active.parentElement.firstElementChild.classList.add("active");
            boxModelImage.src =
              active.parentElement.firstElementChild.firstElementChild.src;
          } else {
            active.nextElementSibling.classList.add("active");
            boxModelImage.src = active.nextElementSibling.firstElementChild.src;
          }
        }

        // change box model image
        else if (
          e.target.classList.contains("arrow-left") ||
          e.code === "ArrowLeft"
        ) {
          if (active.previousElementSibling === null) {
            active.parentElement.lastElementChild.classList.add("active");
            boxModelImage.src =
              active.parentElement.lastElementChild.lastElementChild.src;
          } else {
            active.previousElementSibling.classList.add("active");
            boxModelImage.src =
              active.previousElementSibling.firstElementChild.src;
          }
        }
        active.classList.remove("active");
      }
    }
  }

  window.addEventListener("keydown", boxModelFun);
  window.addEventListener("click", boxModelFun);
  boxModelArrow.addEventListener("click", boxModelFun);
}

window.onload = function () {
  loadHTML("http://127.0.0.1:3030/Application/client/header.html");

  setTimeout(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token found:", token);
    if (token) {
      let ul = document.getElementById("ul");
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = "/views/user/user-profile.html";
      a.textContent = "Profile";

      li.appendChild(a);
      ul.appendChild(li);

      const navigationBar = document.getElementById("nav");
      handleUserNameElement(navigationBar);
      handleLogoutElement(navigationBar);
    } else {
      console.log("No token found in localStorage. Staying on index page.");
    }
  }, 100);
};

function handleUserNameElement(navigationBar) {
  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);
  const userNameDiv = document.createElement("div");
  userNameDiv.style.cssText = "max-width: 155px;";
  const userNameSpan = document.createElement("span");
  userNameSpan.style.color = "#b79d76";
  userNameSpan.textContent = `Welcome ${userInfo.firstName} ${userInfo.lastName}`;
  userNameDiv.appendChild(userNameSpan);
  navigationBar.appendChild(userNameDiv);
}

function handleLogoutElement(navigationBar) {
  const registerLi = document.getElementById("register");
  if (registerLi) {
    registerLi.remove();
    const logoutDiv = document.createElement("div");
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.classList.add("logout-button");
    logoutButton.onclick = logout;
    logoutDiv.appendChild(logoutButton);
    navigationBar.appendChild(logoutDiv);
  }
}

function loadHTML(page) {
  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("nav-template").innerHTML = html;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
