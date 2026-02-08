/* =========================
   1) BOOK DATA 
========================= */
const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    rating: 4.4,
    image: "atomic-habits.jpg",
    synopsis: "A practical guide on building good habits and breaking bad ones using small daily improvements.",
    series: {
      prequels: [],
      sequels: []
    },
    reviews: [
      { source: "Goodreads", reviewer: "Reader A", comment: "Simple and practical habit advice.", score: "4.5/5" },
      { source: "Blog", reviewer: "Reader B", comment: "Easy to follow, great examples.", score: "4/5" }
    ]
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    rating: 4.6,
    image: "dune.jpg",
    synopsis: "Paul Atreides becomes involved in a power struggle over the desert planet Arrakis and its valuable spice.",
    series: {
      prequels: [],
      sequels: ["Dune Messiah", "Children of Dune"]
    },
    reviews: [
      { source: "Goodreads", reviewer: "SciFiFan", comment: "World building is amazing.", score: "5/5" },
      { source: "Review", reviewer: "Ali", comment: "A bit long, but worth it.", score: "4/5" }
    ]
  },
  {
    id: 3,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    rating: 4.7,
    image: "hp1.jpg",
    synopsis: "A young boy discovers he is a wizard and begins his journey at Hogwarts School of Witchcraft and Wizardry.",
    series: {
      prequels: [],
      sequels: ["Chamber of Secrets", "Prisoner of Azkaban"]
    },
    reviews: [
      { source: "Goodreads", reviewer: "Fan 1", comment: "Magical and nostalgic.", score: "5/5" },
      { source: "Reader", reviewer: "Sam", comment: "Great start to the series.", score: "4.5/5" }
    ]
  },
  {
    id: 4,
    title: "Murder on the Orient Express",
    author: "Agatha Christie",
    genre: "Mystery",
    rating: 4.5,
    image: "orient-express.jpg",
    synopsis: "Detective Hercule Poirot investigates a murder on a snowbound train with many suspects.",
    series: {
      prequels: [],
      sequels: []
    },
    reviews: [
      { source: "Goodreads", reviewer: "Reader X", comment: "Classic mystery plot.", score: "4.5/5" },
      { source: "Blog", reviewer: "Nim", comment: "The ending was surprising!", score: "5/5" }
    ]
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    rating: 4.6,
    image: "pride-prejudice.jpg",
    synopsis: "Elizabeth Bennet navigates love and social class while sparring with the proud Mr. Darcy.",
    series: {
      prequels: [],
      sequels: []
    },
    reviews: [
      { source: "Goodreads", reviewer: "ClassicFan", comment: "Smart and funny.", score: "5/5" },
      { source: "Review", reviewer: "Maya", comment: "A little slow but brilliant.", score: "4/5" }
    ]
  },
  {
    id: 6,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    rating: 4.2,
    image: "alchemist.jpg",
    synopsis: "A shepherd named Santiago travels in search of treasure and discovers the value of destiny and dreams.",
    series: {
      prequels: [],
      sequels: []
    },
    reviews: [
      { source: "Goodreads", reviewer: "Reader Z", comment: "Short and meaningful.", score: "4/5" },
      { source: "Review", reviewer: "Fahim", comment: "Motivating message.", score: "4/5" }
    ]
  }
];


/* =========================
   2) ELEMENTS
========================= */
const booksGrid = document.getElementById("booksGrid");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const sortSelect = document.getElementById("sortSelect");
const clearBtn = document.getElementById("clearBtn");

const readingListEl = document.getElementById("readingList");
const clearListBtn = document.getElementById("clearListBtn");

const modalOverlay = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalRating = document.getElementById("modalRating");
const modalSynopsis = document.getElementById("modalSynopsis");
const modalSeries = document.getElementById("modalSeries");
const modalReviews = document.getElementById("modalReviews");


/* =========================
   3) GENRE OPTIONS
========================= */
function loadGenres(){
  const genres = ["All", ...new Set(books.map(b => b.genre))];
  genreSelect.innerHTML = "";

  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    genreSelect.appendChild(opt);
  });
}
loadGenres();


/* =========================
   4) RENDER BOOKS (WITH IMAGE)
========================= */
function renderBooks(list){
  booksGrid.innerHTML = "";

  list.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = book.id;

    card.innerHTML = `
      <img class="card-img" src="${book.image}" alt="${book.title}">
      <span class="badge">${book.genre}</span>
      <div class="card-title">${book.title}</div>
      <div class="card-author">by ${book.author}</div>

      <div class="card-bottom">
        <div class="rating"><span class="star">★</span> ${book.rating}</div>
        <button class="add-btn" data-add="${book.id}">Add</button>
      </div>
    `;

    booksGrid.appendChild(card);
  });
}


/* =========================
   5) FILTER + SORT
========================= */
function getFilteredBooks(){
  const search = searchInput.value.trim().toLowerCase();
  const genre = genreSelect.value;
  const sort = sortSelect.value;

  let result = books.filter(b => {
    const matchText =
      b.title.toLowerCase().includes(search) ||
      b.author.toLowerCase().includes(search);

    const matchGenre = (genre === "All") ? true : b.genre === genre;
    return matchText && matchGenre;
  });

  if (sort === "az") result.sort((a,b) => a.title.localeCompare(b.title));
  if (sort === "za") result.sort((a,b) => b.title.localeCompare(a.title));
  if (sort === "ratingHigh") result.sort((a,b) => b.rating - a.rating);
  if (sort === "ratingLow") result.sort((a,b) => a.rating - b.rating);

  return result;
}


/* =========================
   6) MODAL (BOOK DETAILS)
========================= */
function openModal(book){
  modalImg.src = book.image;
  modalTitle.textContent = book.title;
  modalMeta.textContent = `${book.author} • ${book.genre}`;
  modalRating.textContent = `Rating: ${book.rating} ★`;
  modalSynopsis.textContent = book.synopsis;

  modalSeries.innerHTML = "";
  const pre = book.series.prequels || [];
  const seq = book.series.sequels || [];

  if (pre.length === 0 && seq.length === 0){
    const li = document.createElement("li");
    li.textContent = "No prequels or sequels listed.";
    modalSeries.appendChild(li);
  } else {
    if (pre.length > 0){
      const li = document.createElement("li");
      li.textContent = "Prequels: " + pre.join(", ");
      modalSeries.appendChild(li);
    }
    if (seq.length > 0){
      const li = document.createElement("li");
      li.textContent = "Sequels: " + seq.join(", ");
      modalSeries.appendChild(li);
    }
  }

  modalReviews.innerHTML = "";
  (book.reviews || []).forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.source}</td>
      <td>${r.reviewer}</td>
      <td>${r.comment}</td>
      <td>${r.score}</td>
    `;
    modalReviews.appendChild(tr);
  });

  modalOverlay.classList.add("open");
}

function closeModal(){
  modalOverlay.classList.remove("open");
}

modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});


/* =========================
   7) READING LIST (localStorage)
========================= */
const LIST_KEY = "readify_reading_list";

function getList(){
  try { return JSON.parse(localStorage.getItem(LIST_KEY)) || []; }
  catch { return []; }
}

function saveList(arr){
  localStorage.setItem(LIST_KEY, JSON.stringify(arr));
}

function renderList(){
  const list = getList();
  readingListEl.innerHTML = "";

  if (list.length === 0){
    const li = document.createElement("li");
    li.textContent = "No books added yet.";
    li.style.opacity = "0.7";
    readingListEl.appendChild(li);
    return;
  }

  list.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.title}</span>
      <button class="remove-btn" data-remove="${index}">Remove</button>
    `;
    readingListEl.appendChild(li);
  });
}

function addToList(book){
  const list = getList();
  if (list.some(x => x.id === book.id)) return;
  list.push({ id: book.id, title: book.title });
  saveList(list);
  renderList();
}

function removeFromList(index){
  const list = getList();
  list.splice(index, 1);
  saveList(list);
  renderList();
}

clearListBtn.addEventListener("click", () => {
  localStorage.removeItem(LIST_KEY);
  renderList();
});


/* =========================
   8) CLICK EVENTS 
========================= */
booksGrid.addEventListener("click", e => {
  const addId = e.target.dataset.add;

  if (addId){
    e.stopPropagation();
    const book = books.find(b => b.id === Number(addId));
    if (book) addToList(book);
    return;
  }

  const card = e.target.closest(".card");
  if (!card) return;

  const id = Number(card.dataset.id);
  const book = books.find(b => b.id === id);
  if (book) openModal(book);
});


/* =========================
   9) FILTER EVENTS
========================= */
function update(){
  renderBooks(getFilteredBooks());
}

searchInput.addEventListener("input", update);
genreSelect.addEventListener("change", update);
sortSelect.addEventListener("change", update);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  genreSelect.value = "All";
  sortSelect.value = "az";
  update();
});


/* =========================
   10) HAMBURGER + YEAR
========================= */
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("hamburgerBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});


/* =========================
   11) INITIAL RENDER
========================= */
renderBooks(getFilteredBooks());
renderList();
