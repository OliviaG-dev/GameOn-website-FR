function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalSignup = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnOk = document.querySelector(".btn-ok");
const btnSignup = document.querySelector(".btn-submit");
const close = document.querySelector(".close");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"], input[type="date"], input[type="number"], input[type="checkbox"], input[type="radio"]'
);
const form = document.querySelector("form");
const modalOk = document.querySelector(".modal-ok");
const SubmitOk = document.querySelector(".btn-ok");

//variable "submit"
let first, last, email, birthday, quantity, ville, checkbox1, checkbox2;

// launch/close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModalSignup));
close.addEventListener("click", closeModalSignup);
btnOk.addEventListener("click", closeModalOk);


// Open modal Signup
function launchModalSignup() {
  modalSignup.className = "modal select-show";
}
//close modal Signup
function closeModalSignup() {
  modalSignup.className = "select-hide";
}

//Open modal ok
function lauchModalOk(){
  modalOk.className = "modal select-show";
}

//close modal ok
function closeModalOk() {
  modalOk.className = "select-hide";
}

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-data");
  const span = document.querySelector("." + tag + "-data > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("first", "Le prénom doit faire entre 3 et 20 caractères");
    first = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "first",
      "Le prénom ne doit pas contenir de caractère spéciaux"
    );
    first = null;
  } else {
    errorDisplay("first", "", true);
    first = value;
  }
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
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const birthdayChecker = (value) => {
  if (value == "") {
    errorDisplay("birthday", "N'oubliez pas la date !");
    birthday = null;
  } else {
    errorDisplay("birthday", "", true);
    birthday = value;
  }
};

const quantityChecker = (value) => {
  if (value == "" || isNaN(value) || value < 0 || value > 99) {
    errorDisplay("quantity", "Indiquez le nombre de participation !");
    quantity = null;
  } else {
    errorDisplay("quantity", "", true);
    quantity = value;
  }
};

const villeChecker = (checked) => {
  if (checked == "") {
    errorDisplay("ville", "Indiquez une ville !");
    ville = null;
  } else {
    errorDisplay("ville", "", true);
    ville = checked;
  }
};

const conditionChecker = (checked) => {
  if (checked === false) {
    errorDisplay(
      "condition",
      "Veuillez accepter les conditions d'utilisation !"
    );
    checkbox1 = null;
  } else {
    errorDisplay("condition", "", true);
    checkbox1 = true;
  }
};

const warnedChecker = (checked) => {
  if (checked === true) {
    checkbox2 = true;
  } else {
    checkbox2 = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstNameChecker(e.target.value);
        break;
      case "last":
        lastNameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "birthdate":
        birthdayChecker(e.target.value);
        break;
      case "quantity":
        quantityChecker(e.target.value);
        break;
      case "checkbox1":
        conditionChecker(e.target.checked);
        break;
      case "checkbox2":
        warnedChecker(e.target.checked);
        break;
      default:
        null;
    }
    switch (e.target.name) {
      case "location":
        villeChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (first && last && email && birthday && ville && checkbox1) {
    const data = {
      first,
      last,
      email,
      birthday,
      quantity,
      ville,
      checkbox1,
      checkbox2,
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));

    first = null;
    last = null;
    email = null;
    birthday = null;
    quantity = null;

    closeModalSignup();
    lauchModalOk();

  } else {
    e.preventDefault();
    alert("Le formulaire n'est pas bien rempli!");
  }
});
