function openModal() {
  document.getElementById("roleModal").style.display = "flex";
}

function openUserLogin() {
  document.getElementById("roleModal").style.display = "none";
  document.getElementById("loginModal").style.display = "flex";
}

function redirectAdmin() {
  document.getElementById("roleModal").style.display = "none";
  document.getElementById("adminLoginModal").style.display = "flex";
}


function closeModal() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("adminLoginModal").style.display = "none";
}


window.onclick = function (event) {
  const login = document.getElementById("loginModal");
  const role = document.getElementById("roleModal");
  if (event.target === login) login.style.display = "none";
  if (event.target === role) role.style.display = "none";
};
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("login") === "true") {
    if (params.get("login") === "true") {
  openUserLogin();
}
  }
});
    