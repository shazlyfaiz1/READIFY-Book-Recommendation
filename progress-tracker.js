// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile menu =====
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");
hamburgerBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// ===== Elements =====
const bookTitle = document.getElementById("bookTitle");
const totalPages = document.getElementById("totalPages");
const pagesRead = document.getElementById("pagesRead");
const speed = document.getElementById("speed");

const calcBtn = document.getElementById("calcBtn");
const saveBtn = document.getElementById("saveBtn");
const msg = document.getElementById("msg");

const placeholder = document.getElementById("placeholder");
const results = document.getElementById("results");

const rTitle = document.getElementById("rTitle");
const rPages = document.getElementById("rPages");
const rPercent = document.getElementById("rPercent");
const fillBar = document.getElementById("fillBar");
const rRemaining = document.getElementById("rRemaining");
const rDaysLeft = document.getElementById("rDaysLeft");

// ===== localStorage key =====
const KEY = "readify_progress_form";

// ===== Helpers =====
function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

function showProgress(data) {
  // calculate
  const total = data.total;
  const read = clamp(data.read, 0, total);
  const daily = data.speed;

  const remaining = Math.max(0, total - read);
  const percent = total > 0 ? Math.round((read / total) * 100) : 0;
  const daysLeft = daily > 0 ? Math.ceil(remaining / daily) : 0;

  // update UI
  rTitle.textContent = data.title;
  rPages.textContent = `${read}/${total}`;
  rPercent.textContent = `${percent}%`;
  fillBar.style.width = `${percent}%`;
  rRemaining.textContent = remaining;
  rDaysLeft.textContent = daysLeft;

  // show results
  placeholder.style.display = "none";
  results.style.display = "block";
}

// ===== Calculate button =====
calcBtn.addEventListener("click", () => {
  msg.textContent = "";

  const title = bookTitle.value.trim();
  const total = Number(totalPages.value);
  const read = Number(pagesRead.value);
  const daily = Number(speed.value);

  if (!title || !total || total < 1 || read < 0 || !daily || daily < 1) {
    msg.textContent = "Please fill all fields with valid numbers.";
    return;
  }

  showProgress({ title, total, read, speed: daily });
});

// ===== Save button =====
saveBtn.addEventListener("click", () => {
  msg.textContent = "";

  const title = bookTitle.value.trim();
  const total = Number(totalPages.value);
  const read = Number(pagesRead.value);
  const daily = Number(speed.value);

  if (!title || !total || total < 1 || read < 0 || !daily || daily < 1) {
    msg.textContent = "Please fill all fields before saving.";
    return;
  }

  const data = { title, total, read, speed: daily };
  localStorage.setItem(KEY, JSON.stringify(data));
  msg.textContent = "Saved!";
});

// ===== Load saved data on page open =====
const saved = localStorage.getItem(KEY);
if (saved) {
  try {
    const data = JSON.parse(saved);
    bookTitle.value = data.title || "";
    totalPages.value = data.total || "";
    pagesRead.value = data.read || "";
    speed.value = data.speed || "";
    showProgress(data);
  } catch (e) {
    // if something wrong, ignore
  }
}