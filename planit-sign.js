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

const signUpBtn = document.querySelector(".sign-up");
const fullName = document.getElementById("fnm");
const email = document.getElementById("em");
const password = document.getElementById("ps");

// Displaying Error
const errorDisplay = (message) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("error");
  newDiv.textContent = message;
  errors.appendChild(newDiv);
};

// Checking Number of errors
const errorCheck = (errorMessages) => {
  errorMessages.forEach((error) => {
    errorDisplay(error.message);
  });
  setTimeout(() => {
    errors.innerHTML = "";
  }, 5000);
};

// Creating a POST request for Signup
const errors = document.querySelector(".errors");
const signUp = async () => {
  try {
    const response = await fetch(
      "https://planit-production-e550.up.railway.app/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
          fullName: fullName.value,
          role: "planner",
          phoneNumber: "",
        }),
      }
    );
    

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);

      throw new Error(errorData.message);
    }

    // const data = await response.json();
    // const errors = data.error;

    // const errorMessages = errors.map((error) => error.message);
    // console.log(errorMessages);
    

    // if (errorMessages !== "") {
    //   // errorCheck(errorMessages);
    // } else {
    //   console.log(data);
    //   window.location.replace("verify-email.html");
    // }
  } catch (error) {
    errorCheck(error.message);
  }
};

signUpBtn.addEventListener("click", signUp);
