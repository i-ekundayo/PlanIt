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


const fullName = document.getElementById("fnm");
const email = document.getElementById("em");
const password = document.getElementById("ps");


// Creating a POST request for Signup
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
          role: "",
          phoneNumber: "",
        }),
      }
    );

    console.log('clicked');
    
    console.log(response);
    const data = await response.json();
    console.log("✅ Success:", data); 
  } catch (error) {
    console.error("Error:", error.message);
  }
};


signUp();