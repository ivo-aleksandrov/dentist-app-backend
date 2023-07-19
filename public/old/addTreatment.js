const form = document.querySelector(".addPatientForm");
const formAlert = document.querySelector(".addPatientFormAlert");
formAlert.style.display = "none";
const toothInput = document.querySelector(".tooth-input");
const descriptionInput = document.querySelector(".description-input");
const priceInput = document.querySelector(".price-input");
const nameInput = document.querySelector(".name-input");
const identityNumberInput = document.querySelector(".identityNumber-input");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const identityNumber = urlParams.get("identityNumber");
const patientName = urlParams.get("name");

nameInput.value = `${patientName}`;
identityNumberInput.value = `${identityNumber}`;

console.log(descriptionInput, toothInput, priceInput);
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tooth = toothInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;

  fetch("/createTreatment", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      identityNumber: identityNumber,
      tooth: tooth,
      description: description,
      price: price,
    }),
  }).then(async (response) => {
    const content = await response.json();

    if (typeof content.treatment != "undefined") {
      const inputs = document.querySelectorAll(
        ".tooth-input, .description-input, .price-input"
      );

      inputs.forEach((input) => {
        input.value = "";
      });

      formAlert.classList.add("green");
      formAlert.style.display = "block";
      formAlert.innerHTML = `Treatment for ${patientName} has been added!`;
    } else {
      if (typeof content.Message.errors.tooth != "undefined") {
        if (content.Message.errors.tooth.hasOwnProperty("name")) {
          formAlert.style.display = "block";
          formAlert.innerHTML = `Please fill all mandatory fields`;
          toothInput.classList.add("red");
        }
      } else {
        toothInput.classList.remove("red");
      }

      if (typeof content.Message.errors.description != "undefined") {
        if (content.Message.errors.description.hasOwnProperty("name")) {
          formAlert.style.display = "block";
          formAlert.innerHTML = `Please fill all mandatory fields`;
          descriptionInput.classList.add("red");
        }
      } else {
        descriptionInput.classList.remove("red");
      }

      if (typeof content.Message.errors.price != "undefined") {
        if (content.Message.errors.price.hasOwnProperty("name")) {
          formAlert.style.display = "block";
          formAlert.innerHTML = `Please fill all mandatory fields`;
          priceInput.classList.add("red");
        }
      } else {
        priceInput.classList.remove("red");
      }
    }
  });
});
