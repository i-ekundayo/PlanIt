const menu = document.querySelector(".header__search img");
const container = document.querySelector(".container");
const token = localStorage.getItem("token");




menu.addEventListener("click", () => {
  container.classList.toggle("collapsed");
});

const userProfile = async () => {
  try {
    const response = await fetch(
      "https://planit-production-e550.up.railway.app/api/auth/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    console.log(data);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    document.querySelector(".planner__name").textContent = data.fullName;

  } catch (error) {
    console.error(error);
  }
};

userProfile();
