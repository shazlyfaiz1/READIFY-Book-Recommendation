/* =========================
   1) AUTO-ROTATING QUOTES
========================= */
const quotes = [
  {
    text: '"A room without books is like a body without a soul."',
    author: "— Marcus Tullius Cicero"
  },
  {
    text: '"There is no friend as loyal as a book."',
    author: "— Ernest Hemingway"
  },
  {
    text: '"Books are a uniquely portable magic."',
    author: "— Stephen King"
  },
  {
    text: '"Today a reader, tomorrow a leader."',
    author: "— Margaret Fuller"
  }
];

let quoteIndex = 0;
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

function changeQuote() {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteText.textContent = quotes[quoteIndex].text;
  quoteAuthor.textContent = quotes[quoteIndex].author;
}

// Change quote every 4 seconds
setInterval(changeQuote, 4000);


/* =========================
   2) AUTHOR OF THE DAY (Daily)
   Uses the date to pick a stable author
========================= */
const authors = [
  {
    icon: "🧙‍♂️",
    name: "J.R.R. Tolkien",
    meta: "Born 1892 • Most Famous: The Lord of the Rings",
    desc: "English writer and philologist, best known for The Hobbit and The Lord of the Rings trilogy."
  },
  {
    icon: "🕵️‍♀️",
    name: "Agatha Christie",
    meta: "Born 1890 • Most Famous: Murder on the Orient Express",
    desc: "Known for mystery novels and creating famous detectives like Hercule Poirot and Miss Marple."
  },
  {
    icon: "🌊",
    name: "Jane Austen",
    meta: "Born 1775 • Most Famous: Pride and Prejudice",
    desc: "Famous for romance and social commentary, with sharp characters and memorable storytelling."
  },
  {
    icon: "🚀",
    name: "Isaac Asimov",
    meta: "Born 1920 • Most Famous: Foundation",
    desc: "A major science fiction writer who popularized big ideas about technology, space, and society."
  }
];

function setAuthorOfTheDay() {
  const today = new Date();

  // Simple daily number (works fine for this assignment)
  const dayNumber = today.getFullYear() * 1000 + today.getMonth() * 50 + today.getDate();
  const pick = dayNumber % authors.length;

  document.getElementById("authorAvatar").textContent = authors[pick].icon;
  document.getElementById("authorName").textContent = authors[pick].name;
  document.getElementById("authorMeta").textContent = authors[pick].meta;
  document.getElementById("authorDesc").textContent = authors[pick].desc;
}

setAuthorOfTheDay();


/* =========================
   3) NEWSLETTER (LocalStorage)
   Save the email so it "remembers" you
========================= */



/* =========================
   4) HAMBURGER MENU (Mobile)
========================= */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});


/* =========================
   5) FOOTER YEAR
========================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
    6) IMAGE ROTATING
=========================*/

const heroSlide = document.getElementById("heroSlide");

const slides = [
  "hero1.jpg",
  "hero2.jpg",
  "hero3.jpg",
  "hero4.jpg"
];

let slideIndex = 0;

function changeSlide(){
  heroSlide.classList.add("fade");

  setTimeout(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    heroSlide.src = slides[slideIndex];
    heroSlide.classList.remove("fade");
  }, 500);
}

// change every 3 seconds
setInterval(changeSlide, 3000);
