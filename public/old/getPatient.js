const loading = document.querySelector(".loading-text");
const form = document.querySelector(".patients-form");
const del = document.querySelector(".columnBody");
const patientsInput = document.querySelector(".patients-input");
const formAlert = document.querySelector(".form-alert");
const treatmentsDiv = document.querySelector(".treatments");

formAlert.style.display = "none";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const identityNumber = patientsInput.value;

  try {
    if (isNaN(identityNumber)) {
      throw new Error(
        `There is no patient with identity number: ${identityNumber}`
      );
    }

    ////////// fetch patient information
    fetch(`/patient/${identityNumber}`)
      .then((data) => {
        return data.json();
      })
      .then((objectData) => {
        console.log(objectData);
        if (!objectData.hasOwnProperty("msg")) {
          let tableData = "";

          tableData += `
              <div class="patientCard">
              <div class="patientPicture">
                <center>
                  <br style="color: black;">
                   ${objectData.patient.name}<br />
                  <hr>
                  <br><br>
                  <img src="./patient_white.png" width="40%"/>
                </center>
              </div>
              <div class="patientInformation">
                <div class="informationContainer">
                  <div style="grid-column: 1; grid-row: 1; padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #e7e8e9; color: #146ff7; text-transform: uppercase;">
                    <center>Patient information</center>
                  </div>
                  <div class="informationRow1">
                    <div style=" grid-column: 1; grid-row: 1;">
                      Gender: <font color="#146ff7">&nbsp;&nbsp;&nbsp;Male</font>
                    </div>
                    <div style=" grid-column: 2; grid-row: 1;">
                      Age: <font color="#146ff7">&nbsp;&nbsp;&nbsp;${objectData.patient.age}</font>  
                    </div>
                    <div style=" grid-column: 3; grid-row: 1;">
                      Date of birth: <font color="#146ff7">&nbsp;&nbsp;&nbsp;${objectData.patient.birthDate}</font>
                    </div>
                  </div>
                  <div class="informationRow2">
                    <div style=" grid-column: 1; grid-row: 1;">
                       City: <font color="#146ff7">&nbsp;&nbsp;&nbsp;${objectData.patient.city}</font>
                    </div>
                    <div style=" grid-column: 2; grid-row: 1;">
                       Adress: <font color="#146ff7">&nbsp;&nbsp;&nbsp;${objectData.patient.adress}</font>
                    </div>
                     <div style=" grid-column: 3; grid-row: 1;">
                       Phone number: <font color="#146ff7">&nbsp;&nbsp;&nbsp;${objectData.patient.phoneNumber}</font>
                    </div>
                  </div>
                  <div class="informationRow3">
                    <div style=" grid-column: 1; grid-row: 1;">
                      Created on: <font color="#146ff7">&nbsp;&nbsp;&nbsp;${objectData.patient.createdOn}</font>
                    </div>
                     <div style=" grid-column: 2; grid-row: 1;">
                      Next appointment: <font color="#146ff7">&nbsp;&nbsp;&nbsp;${objectData.patient.nextAppointment}</font>
                    </div>
                  </div>
                  <div style="display: grid; justify-content: right; grid-column: 1; grid-row: 5; padding-right: 20px; padding-top: 20px">
                  <button onclick="location.href='addTreatment.html?identityNumber=${objectData.patient.identityNumber}&name=${objectData.patient.name}'" type="submit" class="btn submit-btn" style="margin-right: 10px; grid-row: 1;background-image: linear-gradient(#3886fb, #146ff7); border: 0px; color: white; box-shadow: 1px 1px 5px grey;">Add treatment</button>
                  <button type="submit" class="btn submit-btn" style="grid-row: 1;background-image: linear-gradient(#3886fb, #146ff7); border: 0px; color: white; box-shadow: 1px 1px 5px grey;">edit</button>
                  </div>
                  </div>
              </div>
            </div>
      `;
        
          document.getElementById("patients").innerHTML = tableData;
        } else {
          console.log("err");
        }
      });

    ////////// fetch treatment information for the patient
    fetch(`/treatments/${identityNumber}`)
      .then((data) => {
        return data.json();
      })
      .then((objectData) => {
        if (objectData.treatment.length) {
          treatmentsDiv.style.display = "block";
          let tableData = "";
          tableData += `
            <div class="title"><center>treatments</center></div>
                <div class="columnHead">
                  <div
                    style="
                      grid-row: 1;
                      grid-column: 1;
                      border-right: 1px solid #e7e8e9;
                      padding: 10px;
                    "
                  >
                    Tooth
                  </div>
                  <div
                    style="
                      grid-row: 1;
                      grid-column: 2;
                      border-right: 1px solid #e7e8e9;
                      padding: 10px;
                    "
                  >
                    Description
                  </div>
                  <div
                    style="
                      grid-row: 1;
                      grid-column: 3;
                      border-right: 1px solid #e7e8e9;
                      padding: 10px;
                    "
                  >
                    Date
                  </div>
                  <div style="grid-row: 1; grid-column: 4; padding: 10px;">
                    Price
                  </div>
                </div>`;

          for (let i = 0; i < objectData.treatment.length; i++) {
            tableData += `
              <div class="columnBody">
                  <div
                    style="
                      grid-row: 1;
                      grid-column: 1;
                      border-right: 1px solid #e7e8e9;
                      border-bottom: 1px solid #e7e8e9;
                      padding: 10px;
                    "
                  >
                    ${objectData.treatment[i].tooth}
                  </div>
                  <div
                    style="
                      grid-row: 1;
                      grid-column: 2;
                      border-right: 1px solid #e7e8e9;
                       border-bottom: 1px solid #e7e8e9;
                      padding: 10px;
                    "
                  >
                    ${objectData.treatment[i].description}
                  </div>
                  <div
                    style="
                      grid-row: 1;
                      grid-column: 3;
                      border-right: 1px solid #e7e8e9;
                       border-bottom: 1px solid #e7e8e9;
                      padding: 10px;
                    "
                  >
                    ${objectData.treatment[i].date}
                  </div>
                  <div id="treatmentDiv" style="grid-row: 1; grid-column: 4; padding: 10px;  border-bottom: 1px solid #e7e8e9;">
                    ${objectData.treatment[i].price}
                  </div>
                </div>
        `;
          }
          document.getElementById("treatments").innerHTML = tableData;
        } else {
          treatmentsDiv.style.display = "none";
        }
      });
  } catch (error) {
    formAlert.style.display = "block";
    formAlert.innerHTML = `${error}`;
  }

  setTimeout(() => {
    formAlert.style.display = "none";
    formAlert.classList.remove("text-success");
  }, 3000);
});
