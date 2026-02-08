// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");
hamburgerBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// Elements
const genreSelect = document.getElementById("genreSelect");
const lengthSelect = document.getElementById("lengthSelect");

const pickBtn = document.getElementById("pickBtn");
const addBtn = document.getElementById("addBtn");
const againBtn = document.getElementById("againBtn");

const resultText = document.getElementById("resultText");
const msg = document.getElementById("msg");

// localStorage key
const LIST_KEY = "readify_reading_list";

// Books (simple list)
const books = [
  { title: "1984", author: "George Orwell", genre: "Fiction", pages: 328 },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", pages: 208 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", pages: 310 },
  { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy", pages: 223 },
  { title: "Murder on the Orient Express", author: "Agatha Christie", genre: "Mystery", pages: 256 },
  { title: "The Da Vinci Code", author: "Dan Brown", genre: "Thriller", pages: 489 },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Classic", pages: 279 },
  { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", pages: 412 },
  { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", pages: 320 },
  { title: "The Power of Now", author: "Eckhart Tolle", genre: "Self-Help", pages: 236 }
];

let currentPick = null;

function lengthMatch(pages, length) {
  if (length === "short") return pages < 200;
  if (length === "medium") return pages >= 200 && pages <= 400;
  return pages > 400;
}

function getList() {
  try {
    return JSON.parse(localStorage.getItem(LIST_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveList(list) {
  localStorage.setItem(LIST_KEY, JSON.stringify(list));
}

function pickBook() {
  const genre = genreSelect.value;
  const length = lengthSelect.value;

  const filtered = books.filter(b => b.genre === genre && lengthMatch(b.pages, length));

  if (filtered.length === 0) {
    currentPick = null;
    resultText.textContent = "Your Book: No match found (try another option)";
    msg.textContent = "";
    addBtn.disabled = true;
    againBtn.disabled = true;
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  currentPick = filtered[randomIndex];

  resultText.textContent = `Your Book: ${currentPick.title} by ${currentPick.author}`;
  msg.textContent = "";
  addBtn.disabled = false;
  againBtn.disabled = false;
}

function addToList() {
  if (!currentPick) return;

  const list = getList();
  const exists = list.some(item => item.title === currentPick.title);

  if (exists) {
    msg.textContent = "Already in your list.";
    return;
  }

  list.push(currentPick);
  saveList(list);
  msg.textContent = "Added to your list (saved in Local Storage).";
}

// Events
pickBtn.addEventListener("click", pickBook);
againBtn.addEventListener("click", pickBook);
addBtn.addEventListener("click", addToList);
