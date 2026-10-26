// Login dimostrativo lato client: nginx serve solo file statici,
// quindi il controllo avviene nel browser (NON è sicuro, è solo un esempio).
const DEMO_USER = "studente";
const DEMO_PASS = "docker";

const loginView = document.getElementById("login-view");
const welcomeView = document.getElementById("welcome-view");
const form = document.getElementById("login-form");
const error = document.getElementById("error");
const welcomeName = document.getElementById("welcome-name");
const clock = document.getElementById("clock");
let clockTimer = null;

function showWelcome(name) {
  welcomeName.textContent = name;
  loginView.hidden = true;
  welcomeView.hidden = false;
  const tick = () => (clock.textContent = new Date().toLocaleTimeString("it-IT"));
  tick();
  clockTimer = setInterval(tick, 1000);
}

function showLogin() {
  clearInterval(clockTimer);
  sessionStorage.removeItem("user");
  form.reset();
  welcomeView.hidden = true;
  loginView.hidden = false;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = form.username.value.trim();
  const pass = form.password.value;
  if (user === DEMO_USER && pass === DEMO_PASS) {
    error.hidden = true;
    sessionStorage.setItem("user", user);
    showWelcome(user);
  } else {
    error.hidden = false;
  }
});

document.getElementById("logout").addEventListener("click", showLogin);

const saved = sessionStorage.getItem("user");
if (saved) showWelcome(saved);
