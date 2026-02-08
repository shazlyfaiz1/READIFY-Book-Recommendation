// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");
hamburgerBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// FAQ accordion
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("open");
  });
});

// Form (save to localStorage and show message)
const form = document.getElementById("feedbackForm");
const formMsg = document.getElementById("formMsg");
const KEY = "readify_feedback_messages";

function loadMsgs() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveMsgs(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = "Please fill all fields.";
    return;
  }

  const list = loadMsgs();
  list.push({
    name,
    email,
    message,
    time: new Date().toISOString()
  });
  saveMsgs(list);

  form.reset();
  formMsg.textContent = "Thanks! Your feedback was saved.";
});
