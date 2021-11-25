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


//Variable submit.

let first, last, email, birthday, quantity, ville, checkbox1, checkbox2;


//Ouvre et ferme la modale.

modalBtn.forEach((btn) => btn.addEventListener("click", launchModalSignup));
close.addEventListener("click", closeModalSignup);
btnOk.addEventListener("click", closeModalOk);



//Ouvre la modale "Signup".

function launchModalSignup() {
  conditionChecker();
  modalSignup.className = "modal select-show";
}


//Ferme la modale "Signup".
function closeModalSignup() {
  modalSignup.className = "select-hide";
}


//Ouvre la modale "ok".

function launchModalOk() {
  modalOk.className = "modal select-show";
}


//Ferme la modal "ok".
function closeModalOk() {
  modalOk.className = "select-hide";
}

/**
 * Cette fonction sert a pointer la div concerner et a renvoyer un message d'erreur.
 * @param {*} tag class de la div qui englobe l'input concerné.
 * @param {*} message le message d'erreur a envoyer.
 * @param {*} valid est-ce valide? 
 */
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

/**
 * Cette fonction vérifie si le prénom est valide.
 * @param {*} value valeur du champ prénom
 */
const firstNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("first", "Le prénom doit faire entre 3 et 20 caractères");
    first = null;
  } else if (!value.match(/^[a-zA-Z0-9_.'-]*$/)) {
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

/**
 * Cette fonction vérifie si le nom est valide.
 * @param {*} value valeur du champ nom
 */
const lastNameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("last", "Le nom doit faire entre 3 et 20 caractères");
    last = null;
  } else if (!value.match(/^[a-zA-Z0-9_.'-]*$/)) {
    errorDisplay("last", "Le nom ne doit pas contenir de caractère spéciaux");
    last = null;
  } else {
    errorDisplay("last", "", true);
    last = value;
  }
};

/**
 * Cette fonction vérifie si l'email est valide.
 * @param {*} value valeur du champ e-mail
 */
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

/**
 * Cette fonction vérifie si la date d'anniverssaire est valide.
 * @param {*} value valeur du champ birthday 
 */
const birthdayChecker = (value) => {
  if (value == "") {
    errorDisplay("birthday", "N'oubliez pas la date !");
    birthday = null;
  } else {
    errorDisplay("birthday", "", true);
    birthday = value;
  }
};

/**
 * Cette fonction vérifie si le nombre de participation est valide.
 * @param {*} value valeur du champ de nombre de participation
 */
const quantityChecker = (value) => {
  if (value == "" || isNaN(value) || value < 0 || value > 99) {
    errorDisplay("quantity", "Indiquez le nombre de participation !");
    quantity = null;
  } else {
    errorDisplay("quantity", "", true);
    quantity = value;
  }
};

/**
 * Cette fonction vérifie si une ville est cochée.
 * @param {*} checked cochée ou pas?
 */
const villeChecker = (checked) => {
  if (checked == "") {
    errorDisplay("ville", "Indiquez une ville !");
    ville = null;
  } else {
    errorDisplay("ville", "", true);
    ville = checked;
  }
};

/**
 * Cette fonction vérifie si les conditions d'utilisation sont cochée.
 * @param {*} checked cochée ou pas?
 */
const conditionChecker = (checked) => {
  if (!checked) {
    errorDisplay(
      "condition",
      "Veuillez accepter les conditions d'utilisation !"
    );
    checkbox1 = false;
  } else {
    errorDisplay("condition", "", true);
    checkbox1 = true;
  }
};

/**
 * Cette fonction vérifie si l'utilisateur souhaite être prévenu des prochains événements.
 * @param {*} checked cochée ou pas?
 */
const warnedChecker = (checked) => {
  if (checked === true) {
    checkbox2 = true;
  } else {
    checkbox2 = false;
  }
};

/**
 * forEach est une méthode qui appel une fonction anonyme (callback) laquelle a pour paramètre (input).
 * forEach boucles sur (inputs (déclaré lignes 16)). 
 */
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

/**
 * Envoie du formulaire
 */
form.addEventListener("submit", (e) => {
  e.preventDefault(); //comportement par défaut du formulaire (il change de page) n'est pas exécutée.

  //Si les valeurs sont juste (true) alors : on les mets dans un objet et on log.
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

    //vider les inputs.
    inputs.forEach((input) => (input.value = ""));
    inputs.forEach((input) => (input.checked = ""));
    

    closeModalSignup(); //fermeture de la modale "Signup".
    launchModalOk();//ouverture de la modale "Ok".

  } else { //si les valeurs sont fausses alors :
    e.preventDefault();
    

    /**
     * Condition : si "first" est undefined alors on met un message d'erreur.
     */
    if (first === undefined) {
      firstNameChecker("0");
    }

    if (last === undefined) {
      lastNameChecker("0");
    }

    if (email === undefined) {
      emailChecker("0");
    }  

    if (birthday === undefined) {
      birthdayChecker(false);
    }

    if (quantity === undefined) {
      quantityChecker(false);
    }

    if (ville === undefined) {
      villeChecker(false);
    }

    if (condition === undefined) {
      conditionChecker(false);
    }
  }
});
