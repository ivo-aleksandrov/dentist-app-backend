const loading = document.querySelector(".loading-text");
const form = document.querySelector(".addPatientForm");
const nameInput = document.querySelector(".name-input");
const identityNumberInput = document.querySelector(".identityNumber-input");
const cityInput = document.querySelector(".city-input");
const adressInput = document.querySelector(".adress-input");
const ageInput = document.querySelector(".age-input");
const genderInput = document.querySelector(".gender-input");
const phoneNumberInput = document.querySelector(".phoneNumber-input");
const birthDateInput = document.querySelector(".birthDate-input");
const formAlert = document.querySelector(".addPatientFormAlert");
formAlert.style.display = "none";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const identityNumber = identityNumberInput.value;
  const city = cityInput.value;
  const adress = adressInput.value;
  const age = ageInput.value;
  const gender = genderInput.value;
  const phoneNumber = phoneNumberInput.value;
  const birthDate = birthDateInput.value;
  console.log(name);

  if (!name || !identityNumber || !city || !adress || !age || !gender || !phoneNumber || !birthDate) {
    formAlert.style.display = "block";
    formAlert.innerHTML = `Please fill all mandatory fields`;
  }

  fetch("/createpatient", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      identityNumber: identityNumber,
      city: city,
      adress: adress,
      age: age,
      gender: gender,
      phoneNumber: phoneNumber,
      birthDate: birthDate,
    }),
  }).then(async (response) => {
    const content = await response.json();

    if (typeof content.patient != "undefined") {
      const inputs = document.querySelectorAll(
        ".name-input, .identityNumber-input, .city-input, .adress-input, .age-input, .phoneNumber-input, .birthDate-input, .nextAppointment-input"
      );

      inputs.forEach((input) => {
        input.value = "";
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
      formAlert.classList.add("green");
      formAlert.style.display = "block";
      formAlert.innerHTML = `The patents has been added!`;
    } else if (content.Message.hasOwnProperty("keyValue")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      identityNumberInput.classList.add("red");
      formAlert.style.display = "block";
      formAlert.innerHTML = `Identity number already exists ${content.Message.keyValue.identityNumber}`;
    } else {
      if (content.Message.hasOwnProperty("errors")) {
        if (content.Message.errors.hasOwnProperty("identityNumber")) {
          if (
            content.Message.errors.identityNumber.properties.type ==
              "minlength" ||
            content.Message.errors.identityNumber.properties.type == "maxlength"
          ) {
            identityNumberInput.classList.add("red");
            formAlert.style.display = "block";
            formAlert.innerHTML = `Identity number needs to be 10 numbers long!`;
          }
        }
      } else {
        identityNumberInput.classList.remove("red");
      }
    }
  });
});
