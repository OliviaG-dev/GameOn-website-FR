function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close");
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="date"], input[type="number"]')
const form = document.querySelector("form")

//variable "envoie"
let first, last, email, birthday, quantity;


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Open modal form
function launchModal() {
  modal.className = "modal select-show";
}
//close modale
close.addEventListener("click", () => {
  modal.className = "select-hide";
});

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-data");
  const span = document.querySelector("." + tag + "-data > span");

  if (!valid) {
    container.classList.add('error');
    span.textContent = message;
  } else {
    container.classList.remove('error');
    span.textContent = message;
  }
}


const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("first", "Le prénom doit faire entre 3 et 20 caractères");
    first = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) { 
    errorDisplay("first", "Le prénom ne doit pas contenir de caractère spéciaux");
    first = null;
  } else {
    errorDisplay("first", "", true);
    first = value;
  };
};

const lastNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("last", "Le nom doit faire entre 3 et 20 caractères");
    last = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) { 
    errorDisplay("last", "Le nom ne doit pas contenir de caractère spéciaux");
    last = null;
  } else {
    errorDisplay("last", "", true);
    last = value;
  };
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
}

const birthdayChecker = (value) => {
  if (value == ""){
    errorDisplay("birthday", "N'oubliez pas la date !");
    birthday = null;
  } else {
    errorDisplay("birthday", "", true);
    birthday = value;
  }
}

const quantityChecker = (value) => {
  if (value == ""){
    errorDisplay("quantity", "Indiquez le nombre de participation !");
    quantity = null;
  } else {
    errorDisplay("quantity", "", true);
    quantity = null;
  }
}


inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first" :
        firstNameChecker(e.target.value)
        break;
      case "last" :
        lastNameChecker(e.target.value)
        break;
      case "email" :
        emailChecker(e.target.value)
        break;
      case "birthdate" :
        birthdayChecker(e.target.value)
        break;
      case "quantity" :
        quantityChecker(e.target.value)
        break;
      default:
        null;
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (first && last && email && birthday && quantity) {
    const data = {
      first,
      last,
      email,
      birthday,
      quantity,
    };
    console.log(data);
  } else {
    alert('veuillez remplir corectement les champs')
  }
})