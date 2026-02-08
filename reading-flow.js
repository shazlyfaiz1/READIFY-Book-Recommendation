// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");
hamburgerBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// -----------------------------
// COMPLETED BOOKS (localStorage)
// -----------------------------
const LIST_KEY = "readify_completed_books";
const bookInput = document.getElementById("bookInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const completedList = document.getElementById("completedList");

function getBooks() {
  try { return JSON.parse(localStorage.getItem(LIST_KEY)) || []; }
  catch { return []; }
}

function saveBooks(arr) {
  localStorage.setItem(LIST_KEY, JSON.stringify(arr));
}

function renderBooks() {
  const books = getBooks();
  completedList.innerHTML = "";

  if (books.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No completed books yet.";
    completedList.appendChild(li);
    return;
  }

  books.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    completedList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const name = bookInput.value.trim();
  if (!name) return;

  const books = getBooks();
  books.unshift(name);
  saveBooks(books);

  bookInput.value = "";
  renderBooks();
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(LIST_KEY);
  renderBooks();
});

renderBooks();

// -----------------------------
// COZY SOUNDS (select + play/stop)
// -----------------------------
const soundSelect = document.getElementById("soundSelect");
const toggleSoundBtn = document.getElementById("toggleSoundBtn");

const volRange = document.getElementById("volRange");
const volText = document.getElementById("volText");
const soundMsg = document.getElementById("soundMsg");

let audioCtx = null;
let masterGain = null;
let src = null;
let running = false;

function setVol(v) {
  volText.textContent = v + "%";
  if (masterGain) masterGain.gain.value = v / 100;
}
setVol(Number(volRange.value));

function ensureAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.connect(audioCtx.destination);
}

function noiseBuffer(seconds = 2) {
  const sr = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, sr * seconds, sr);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2) - 1;
  return buffer;
}

function stopSound() {
  if (src) {
    try { src.stop(); } catch(e) {}
    try { src.disconnect(); } catch(e) {}
  }
  src = null;
  running = false;
  soundMsg.textContent = "Sound: Off";
}

function playSound() {
  ensureAudio();
  if (audioCtx.state === "suspended") audioCtx.resume();

  stopSound();

  const type = soundSelect.value;

  src = audioCtx.createBufferSource();
  src.buffer = noiseBuffer(2);
  src.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";

  const gain = audioCtx.createGain();

  // simple presets
  if (type === "rain") { filter.frequency.value = 1400; gain.gain.value = 0.18; }
  if (type === "fire") { filter.frequency.value = 800;  gain.gain.value = 0.22; }
  if (type === "waves"){ filter.frequency.value = 600;  gain.gain.value = 0.16; }
  if (type === "forest"){ filter.frequency.value = 1200; gain.gain.value = 0.15; }
  if (type === "cafe"){ filter.frequency.value = 2000; gain.gain.value = 0.12; }
  if (type === "whitenoise"){ filter.frequency.value = 24000; gain.gain.value = 0.10; }

  src.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);

  setVol(Number(volRange.value));

  src.start();
  running = true;

  const name = soundSelect.options[soundSelect.selectedIndex].text;
  soundMsg.textContent = "Sound: " + name;
}

toggleSoundBtn.addEventListener("click", () => {
  if (!running) playSound();
  else stopSound();
});



soundSelect.addEventListener("change", () => {
  if (running) playSound();
});

volRange.addEventListener("input", () => {
  setVol(Number(volRange.value));
});


