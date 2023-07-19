let nav = 0;
let clicked = null;

const calendar = document.getElementById("calendar");
const events = document.querySelector(".patients-form");
const saveForm = document.querySelector(".save-form");
const newEventModal = document.getElementById("newEventModal");
const timeline = document.getElementById("eventTimeline");
const patientNameInput = document.querySelector(".patientName");
const descriptionInput = document.querySelector(".descr");
const dateInput = document.querySelector(".date");
const startTimeInput = document.querySelector(".startTime");
const endTimeInput = document.querySelector(".endTime");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

events.addEventListener("submit", async (e) => {
  e.preventDefault();

  newEventModal.style.display = "block";

  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("saveButton").addEventListener("click", () => {
  saveEvent();
});

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentWeekday = weekdays[new Date().getDay()];

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById(
    "weekday"
  ).innerHTML = `${currentWeekday} <font size="2px" color="white">(${day}-${
    month + 1
  }-${year})</font>`;

  clicked = `${currentYear}-${currentMonth + 1}-${day}`;

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const dayString = `${year}-${month + 1}-${i - paddingDays}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);

    daySquare.addEventListener("click", () => openModal(dayString));
  }

    fetch(`/event/${currentYear}-${currentMonth + 1}-${day}`)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      let tableData = "";

      let array = [];
      array = objectData;

      array.events.sort((a, b) => a.startTime.localeCompare(b.startTime));

      for (let i = 0; i < array.events.length; i++) {
        tableData += `
           <li>
            <span></span>
            <div class="eventCard">
              <a id="deleteButton${i}" class="deleteButton"><img src="./cancel1.png" width="15px" /></a>
              <div class="name">${array.events[i].patientName}</div>
              <div class="description">${array.events[i].description}</div>
            </div>
            <div class="time">
              <span>${array.events[i].startTime}</span>
              <span>${array.events[i].endTime}</span>
            </div>
          </li>`;
      }
      timeline.style.display = "block";

      document.getElementById("eventTimeline").innerHTML = tableData;

      for (let i = 0; i < array.events.length; i++) {
        document
          .getElementById(`deleteButton${i}`)
          .addEventListener("click", async (e) => {
            e.preventDefault();

            fetch(`/event/${currentYear}-${currentMonth + 1}-${day}`)
              .then((data) => {
                return data.json();
              })
              .then((objectData) => {
                let array = [];
                array = objectData;
                fetch(`/event/${array.events[i]._id}`, {
                  method: "delete",
                }).then(async (response) => {
                  if (response.ok) {
                    load();
                  }
                });
              });
          });
      }
    });
}

function openModal(date) {
  clicked = date;
  const currentWeekday = weekdays[new Date(clicked).getDay()];

  document.getElementById(
    "weekday"
  ).innerHTML = `${currentWeekday} <font size="2px">(${clicked})</font>`;

  fetch(`/event/${clicked}`)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      let tableData = "";

      let array = [];
      array = objectData;

      array.events.sort((a, b) => a.startTime.localeCompare(b.startTime));

      if (!array.events.length) {
        timeline.style.display = "none";
      } else {
        for (let i = 0; i < array.events.length; i++) {
          tableData += `
           <li>
            <span></span>
            <div class="eventCard">
              <a id="deleteButton${i}" class="deleteButton"><img src="./cancel1.png" width="15px" /></a>
              <div class="name">${array.events[i].patientName}</div>
              <div class="description">${array.events[i].description}</div>
            </div>
            <div class="time">
              <span>${array.events[i].startTime}</span>
              <span>${array.events[i].endTime}</span>
            </div>
          </li>`;
          timeline.style.display = "block";
        }

        document.getElementById("eventTimeline").innerHTML = tableData;

        for (let i = 0; i < array.events.length; i++) {
          document
            .getElementById(`deleteButton${i}`)
            .addEventListener("click", async (e) => {
              e.preventDefault();

              fetch(`/event/${clicked}`)
                .then((data) => {
                  return data.json();
                })
                .then((objectData) => {
                  let array = [];
                  array = objectData;
                  fetch(`/event/${array.events[i]._id}`, {
                    method: "delete",
                  }).then(async (response) => {
                    if (response.ok) {
                      openModal(date);
                    }
                  });
                });
            });
        }
      }
    });
}

function closeModal() {
  newEventModal.style.display = "none";
  openModal(clicked);
}

function saveEvent() {
  const patientNameInput = document.querySelector(".patientName");
  const descriptionInput = document.querySelector(".descr");
  const startTimeInput = document.querySelector(".startTime");
  const endTimeInput = document.querySelector(".endTime");
  const patientName = patientNameInput.value;
  const description = descriptionInput.value;
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;

  console.log(patientName);

  fetch("/events", {
    method: "post",
    cache: "reload",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      patientName: patientName,
      date: clicked,
      description: description,
      startTime: startTime,
      endTime: endTime,
    }),
  }).then(async (response) => {
    const content = await response.json();

    if (content.hasOwnProperty("event")) {
      console.log("success");
      const inputs = document.querySelectorAll(
        ".patientName, .descr, .date, .startTime, .endTime"
      );

      inputs.forEach((input) => {
        input.value = "";
      });

      closeModal();
      openModal(clicked);
    } else {
      console.log("fail");
    }
  });
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("cancelButton").addEventListener("click", closeModal);
}

initButtons();
load();
