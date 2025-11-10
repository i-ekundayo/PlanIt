//  Toggle password visibility
function togglePassword(inputId) {
  // Get the password input field by its ID
  const input = document.getElementById(inputId);

  // Get the eye icon inside the button next to this input
  const icon = input.nextElementSibling.querySelector("i");

  // Check if password is currently hidden
  if (input.type === "password") {
    // Show the password
    input.type = "text";
    // Change icon to "eye-slash" (showing password)
    icon.className = "ph ph-eye-slash";
  } else {
    // Hide the password
    input.type = "password";
    // Change icon back to "eye" (hiding password)
    icon.className = "ph ph-eye";
  }
}

// Displaying Error
const errorDisplay = (message) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("error");
  newDiv.textContent = message;
  errors.appendChild(newDiv);
};

// Success Message Display
const successDisplay = (message) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("success");
  newDiv.textContent = message;
  errors.appendChild(newDiv);
};

// Checking Number of errors
const errorCheck = (error) => {
  if (Array.isArray(error)) {
    error.forEach((err) => {
      errorDisplay(err.message);
    });
  } else {
    errorDisplay(error);
  }
  setTimeout(() => {
    errors.innerHTML = "";
  }, 5000);
};

// SIGN IN
const signInBtn = document.querySelector(".sign-in");
const email = document.getElementById("em");
const password = document.getElementById("ps");
const errors = document.querySelector(".errors");
const role = localStorage.getItem("role");
const signIn = async () => {
  console.log("clicked");
  try {
    const response = await fetch(
      "https://planit-production-e550.up.railway.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw data.errors || data.message;
    }

    console.log(data);

    role === "planner"
      ? window.location.replace("planner-dashboard.html")
      : window.location.replace("vendor-dashboard.html");
  } catch (error) {
    errorCheck(error);
  }
};

signInBtn.addEventListener("click", signIn);
