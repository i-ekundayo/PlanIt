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
