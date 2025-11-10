const message = sessionStorage.getItem("message");
const successMessage = document.querySelector(".message");
const role = localStorage.getItem("role");
const saveBtn = document.querySelector(".form__button");

// Success Message Display
const successDisplay = (message, success = "success") => {
  const newDiv = document.createElement("div");
  success === "success"
    ? newDiv.classList.add("success")
    : newDiv.classList.add("error");
  newDiv.textContent = message;
  successMessage.appendChild(newDiv);
  setTimeout(() => {
    successMessage.innerHTML = "";
  }, 5000);
};

if (message) {
  successDisplay(message);
  sessionStorage.removeItem("message");
}

// Checking Number of errors
const errorCheck = (error) => {
  if (Array.isArray(error)) {
    error.forEach((err) => {
      successDisplay(err.message, "error");
    });
  } else {
    successDisplay(error, "error");
  }
};

const userName = document.getElementById("username");
const token = localStorage.getItem("token");

// POST REQUEST TO VERIFY EMAIL
const updateProfile = async () => {
  try {
    const response = await fetch(
      "https://planit-production-e550.up.railway.app/api/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: userName.value,
          phoneNumber: "",
        }),
      }
    );

    console.log(response);
    const data = await response.json();

    if (!response.ok) {
      throw data.errors || data.message;
    }
    console.log(data);

    sessionStorage.setItem("message", data.message);
    role === "planner"
      ? window.location.replace("planner-dashboard.html")
      : window.location.replace("vendor-dashboard.html");
  } catch (error) {
    errorCheck(error);
  }
};

// Add event listener to the verify code button
saveBtn.addEventListener("click", updateProfile);
