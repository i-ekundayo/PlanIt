// Changing the background of the quick action links
const quickAction = document.querySelectorAll(".quick-action");

quickAction.forEach((action) => {
  action.addEventListener("click", () => {
    quickAction.forEach((action) => {
      action.classList.remove("active");
    });
    action.classList.add("active");
  });
});

// Displaying and Closing the event creation modal
const createEvent = document.querySelector(".header__button");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__heading img");
const cancelBtn = document.querySelector(".modal__button--cancel");
const overlay = document.querySelector(".overlay");

// function to show and hide modal
const modalDisplay = () => {
  modal.classList.toggle("show");
  document.body.classList.toggle("no-scroll");
  overlay.classList.toggle("show");
};
// Open Modal
createEvent.addEventListener("click", modalDisplay);
// Close modal using close btn
closeBtn.addEventListener("click", modalDisplay);
// Close modal using cancel btn
cancelBtn.addEventListener("click", modalDisplay);

// POST REQUEST
const eventName = document.getElementById("event__name");
const eventType = document.getElementById("event__type");
const date = document.getElementById("date");
const time = document.getElementById("time");
const venue = document.getElementById("location");
const guests = document.getElementById("guests");
const bio = document.getElementById("bio");
const createEventBtn = document.querySelector(".modal__button--create-event");
const token = localStorage.getItem("token");
const errors = document.querySelector(".errors");

const errorDisplay = (message) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("error");
  newDiv.textContent = message;
  errors.appendChild(newDiv);
  setTimeout(() => {
    errors.innerHTML = "";
  }, 5000);
};

const successDisplay = (message) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("success");
  newDiv.textContent = message;
  errors.appendChild(newDiv);
  setTimeout(() => {
    errors.innerHTML = "";
  }, 5000);
};

function addEventCard(eventData) {
  const template = document.querySelector("#eventCardTemplate");
  const clone = template.content.cloneNode(true); // deep clone

  // Populate fields
  clone.querySelector(".card__title").textContent = eventData.title;
  clone.querySelector(".card__date p").textContent = eventData.date;
  clone.querySelector(".card__time p").textContent = eventData.time;
  clone.querySelector(".card__venue p").textContent = eventData.venue;
  clone.querySelector(".card__progress--text p:nth-child(2)").textContent =
    eventData.progress;

  const vendorsAndTasks = clone.querySelectorAll(".card__vendors--text p");
  vendorsAndTasks[1].textContent = eventData.vendors; // vendors number
  vendorsAndTasks[3].textContent = eventData.tasks; // tasks number

  const statusDiv = clone.querySelector(".event__status");
  statusDiv.textContent = eventData.status;
  statusDiv.className = `event__status ${eventData.statusClass}`;

  // Append to container
  document.querySelector("#eventsContainer").appendChild(clone);
}

// const eventCreate = async () => {
//   const form = document.querySelector(".modal__form");

//   form.addEventListener("submit", function (e) {
//     e.preventDefault(); // stop actual form submission

//     // Grab all input fields
//     const inputs = form.querySelectorAll("modal__input input");
//     console.log(inputs);

//     // Check if any field is empty
//     let allFilled = true;
//     inputs.forEach((input) => {
//       if (input.value.trim() === "") {
//         allFilled = false;
//         input.style.border = "1px solid red"; // optional: highlight empty fields
//       } else {
//         input.style.border = ""; // reset
//       }
//     });

//     if (!allFilled) {
//       errorDisplay("Please fill all inputs");
//       return; // stop submission
//     }
//   });
//   try {
//     const response = await fetch(
//       "https://planit-production-e550.up.railway.app/api/events",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: eventName.value,
//           description: bio.value,
//           date: date.value,
//           startTime: time.value,
//           endTime: "",
//           location: venue.value,
//           budget: "",
//           eventType: eventType.value,
//           guestCount: guests.value,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw data.errors || data.message;
//     }

//     console.log(data);
//     successDisplay(data.message);
//     // window.location.replace("planner-events.html");
//   } catch (error) {
//     console.log(error);
//   }
// };

// createEventBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   eventCreate();
// });

// GET REQUEST FOR ALL EVENTS
const getEvents = async () => {
  try {
    const response = await fetch(
      "https://planit-production-e550.up.railway.app/api/events",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw data.errors || data.message;
    }

    console.log("Fetched events:", data);

    // Clear container before adding new ones
    const container = document.querySelector("#eventsContainer");
    container.innerHTML = "";

    // Check if data contains events
    if (data && data.events && data.events.length > 0) {
      data.events.forEach((event) => {
        const eventData = {
          title: event.name || "Untitled Event",
          date: event.date || "No date",
          time: event.time || "No time",
          venue: event.venue || "No venue",
          progress: event.progress ? `${event.progress}%` : "0%",
          vendors: event.vendors?.length || "0",
          tasks: event.tasks
            ? `${event.tasks.completed}/${event.tasks.total}`
            : "0/0",
          status: event.status || "Ongoing",
          statusClass:
            event.status?.toLowerCase() === "completed"
              ? "event__status--completed"
              : "event__status--ongoing",
        };

        // Create and append each card
        addEventCard(eventData);
      });
    } else {
      successDisplay("No events found");
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    errorDisplay(error);
  }
};

document.addEventListener("DOMContentLoaded", getEvents);