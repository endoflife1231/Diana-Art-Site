const artworks = [
  {
    "id": "boy",
    "title": "Мальчишка",
    "year": 2025,
    "technique": "холст, масло, акрил",
    "size": "—",
    "status": "sold",
    "price": "",
    "categories": [
      "social"
    ],
    "image": "assets/images/art/boy.webp",
    "alt": "Картина Дианы «Мальчишка»: мальчик в большой футболке на сиреневом фоне",
    "description": "Мальчик в огромной футболке на фоне обшарпанной стены. Маленький цветок в руках становится образом хрупкости, внимания и неслучившегося взросления.",
    "story": "Сюжет предельно прост: ребёнок, стена и цветок. Но именно в этой простоте появляется вопрос — о ком на самом деле речь: о цветке, о мальчике или о любом шансе, которому не дали вырасти.",
    "quote": "Каждый находит в этом что-то своё, и смыслу не обязательно быть гениально неочевидным.",
    "featured": 1
  },
  {
    "id": "poker",
    "title": "Покер",
    "year": 2025,
    "technique": "холст, масло, акрил",
    "size": "50×70 см",
    "status": "sold",
    "price": "",
    "categories": [
      "pop"
    ],
    "image": "assets/images/art/poker.webp",
    "alt": "Картина Дианы «Покер»: женские руки, карты, фишки и розовый фон",
    "description": "Контраст взрослых женских рук, яркого розового, фишек, напитков и деталей игры. Реальный сюжет фул‑хауса вместо случайной декоративности.",
    "story": "Диана специально разбиралась в покере, чтобы сцена была не фантазией на тему карт, а действительным игровым эпизодом. В этом и работает её внимание к деталям: даже ироничная вещь не становится пустой.",
    "quote": "Картина сама за себя говорит, но фул‑хаус там не случайно.",
    "featured": 2
  },
  {
    "id": "zaliv",
    "title": "Залив",
    "year": 2025,
    "technique": "масло",
    "size": "30×40 см",
    "status": "available",
    "price": "8 000 ₽",
    "categories": [
      "city"
    ],
    "image": "assets/images/art/zaliv.webp",
    "alt": "Картина Дианы «Залив»: спокойный горизонт воды в приглушённых оттенках",
    "description": "Работа о Петербурге, влажном воздухе, Неве и личной привязанности к городу, которая началась не с открытки, а с частного болезненного воспоминания.",
    "story": "Пейзаж не пытается продавать «романтику Петербурга». Он больше похож на след: вода, дальняя линия, холод и город, к которому постепенно привязываешься, даже если пришёл туда совсем за другим.",
    "quote": "В Питере греет не солнце, в Питере греют люди.",
    "featured": 3
  },
  {
    "id": "rodina",
    "title": "Родина Мать",
    "year": 2025,
    "technique": "масло, акрил",
    "size": "40×50 см",
    "status": "sold",
    "price": "",
    "categories": [
      "city",
      "nature"
    ],
    "image": "assets/images/art/rodina.webp",
    "alt": "Картина Дианы «Родина Мать»: зелёная городская среда с домом и растениями",
    "description": "Волгоградская среда: многоэтажка, трава, ромашки и образ Родины‑матери как энергетика города, которая чувствуется даже без прямого присутствия.",
    "story": "После Петербурга с его повторяющимися символами Диана заметила контраст: в Волгограде Родина‑мать может не попадать в кадр, но всё равно ощущается. Картина вписывает большой символ в базовую повседневность.",
    "quote": "Она везде, и энергетика от неё тоже везде.",
    "featured": 4
  },
  {
    "id": "swan",
    "title": "Лебединое озеро",
    "year": 2025,
    "technique": "акварель, пастель",
    "size": "30×40 см",
    "status": "sold",
    "price": "",
    "categories": [
      "pop"
    ],
    "image": "assets/images/art/swan.webp",
    "alt": "Картина Дианы «Лебединое озеро»: фигура балерины в цветном движении",
    "description": "Работа, вдохновлённая балетом, Майей Плисецкой и архивной записью 1976 года, где качество видео будто переходит в фактуру изображения.",
    "story": "Пока создавался холст, звучало и шло «Лебединое озеро» 1976 года. В работе осталось ощущение старой записи: движение, зерно, цвет и почти экранная дистанция.",
    "quote": "Качество видео соответствует году записи — кажется, это даже отразилось на картине.",
    "featured": 5
  },
  {
    "id": "with-you",
    "title": "With you I’m not scared of the dark",
    "year": 2025,
    "technique": "масло, акрил",
    "size": "50×60 см",
    "status": "available",
    "price": "по запросу",
    "categories": [
      "love",
      "nature"
    ],
    "image": "assets/images/art/with-you.webp",
    "alt": "Картина Дианы с двумя белыми ягнятами на тёмном фоне",
    "description": "Тёплая работа про близость и поддержку: темнота любого масштаба становится менее страшной, если рядом есть свой человек.",
    "story": "На поверхности — два ягнёнка. Внутри — формула поддержки: с тобой не так страшны кризисы, экзамены, налоги, стоматолог и любой другой вид темноты.",
    "quote": "С тобой я не боюсь вообще любой темноты.",
    "featured": 6
  },
  {
    "id": "centre",
    "title": "The one in the centre",
    "year": 2026,
    "technique": "холст, акрил",
    "size": "25×35 см",
    "status": "sold",
    "price": "",
    "categories": [
      "nature",
      "social"
    ],
    "image": "assets/images/art/centre.webp",
    "alt": "Картина Дианы «The one in the centre»: маленькая фигура пингвина на фоне гор",
    "description": "Пингвин, который не идёт к кормовым местам и не возвращается к колонии, а снова и снова уходит к горам.",
    "story": "В центре не героический жест, а странное упорство. Одинокое движение к горам становится образом выбора, который никто до конца не может объяснить.",
    "quote": "But why…?",
    "featured": 7
  },
  {
    "id": "czechoslovaks",
    "title": "16 чехословаков",
    "year": 2026,
    "technique": "холст, акрил, масло",
    "size": "30×50 см",
    "status": "sold",
    "price": "",
    "categories": [
      "pop"
    ],
    "image": "assets/images/art/czechoslovaks.webp",
    "alt": "Картина Дианы «16 чехословаков»: два персонажа на снежном фоне",
    "description": "Поп‑культурная работа с кинематографичным холодом, снежным фоном и репликой, которая превращается в отдельный визуальный мем.",
    "story": "Работа существует на границе фанатского кадра, интерьерной иронии и живописного объекта: узнавание важно, но не отменяет композицию.",
    "quote": "В тиктоке они висят уже месяца два — оставлю их и тут.",
    "featured": 8
  },
  {
    "id": "february",
    "title": "fuck the 14th February / I love you everyday",
    "year": 2026,
    "technique": "холст, акрил",
    "size": "30×40 см",
    "status": "sold",
    "price": "",
    "categories": [
      "love",
      "pop"
    ],
    "image": "assets/images/art/february.webp",
    "alt": "Картина Дианы о любви вне календарных дат с двумя фигурами у экрана",
    "description": "Работа про любовь вне календарных дат: не открытка к празднику, а личное признание в ежедневности чувства.",
    "story": "Здесь важен не День святого Валентина, а жест сопротивления календарной романтике: любовь не обязана случаться по расписанию.",
    "quote": "Love you. Love art. Love life.",
    "featured": 9
  },
  {
    "id": "medieval",
    "title": "Medieval Adriana and Chris",
    "year": 2026,
    "technique": "холст, акрил, пастель",
    "size": "25×30 см",
    "status": "available",
    "price": "по запросу",
    "categories": [
      "pop",
      "nature"
    ],
    "image": "assets/images/art/medieval.webp",
    "alt": "Картина Дианы «Medieval Adriana and Chris» с персонажем за столом и кошками",
    "description": "Поп‑культурная работа с отсылкой к «Клану Сопрано», средневековой интонацией и мистической природой кошек.",
    "story": "Крис и Адриана здесь существуют как личная мифология: фанатская память, кошачья магия и мягкая театральность в одном небольшом холсте.",
    "quote": "She is the legend in every universe.",
    "featured": 10
  }
];

const categoryLabels = {
  city: "город",
  pop: "поп‑культура",
  love: "любовь",
  social: "социальное",
  nature: "природа"
};

const statusLabels = {
  available: "в наличии",
  sold: "продано"
};

const storage = {
  get(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* localStorage can be unavailable */ }
  }
};

const state = {
  filter: storage.get("dianaFinalFilter", "all"),
  view: storage.get("dianaFinalView", "grid"),
  sort: storage.get("dianaFinalSort", "featured"),
  search: ""
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const nodes = {
  header: $("[data-header]"),
  nav: $("[data-nav]"),
  menuToggle: $("[data-menu-toggle]"),
  gallery: $("[data-gallery]"),
  empty: $("[data-empty]"),
  search: $("[data-search]"),
  sort: $("[data-sort]"),
  filters: $$("[data-filter]"),
  viewButtons: $$("[data-view]"),
  modal: $("[data-modal]"),
  modalContent: $("[data-modal-content]"),
  modalClose: $("[data-modal-close]"),
  availableList: $("[data-available-list]"),
  backTop: $("[data-back-top]"),
  toast: $("[data-toast]"),
  form: $("[data-contact-form]"),
  formOutput: $("[data-form-output]"),
  year: $("[data-year]"),
  totalCount: $("[data-total-count]"),
  availableCount: $("[data-available-count]"),
  rotatingSource: $("[data-rotating-source]"),
  rotatingResult: $("[data-rotating-result]")
};

let lastFocusedElement = null;
let toastTimer = null;
let phraseTimer = null;

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getFilteredArtworks() {
  const query = state.search.trim().toLowerCase();
  const filtered = artworks.filter((art) => {
    const matchesFilter = state.filter === "all" || art.status === state.filter || art.categories.includes(state.filter);
    const searchable = [art.title, art.year, art.technique, art.size, art.description, art.story, art.quote, art.categories.map((cat) => categoryLabels[cat]).join(" ")].join(" ").toLowerCase();
    return matchesFilter && (!query || searchable.includes(query));
  });

  return filtered.sort((a, b) => {
    if (state.sort === "newest") return b.year - a.year || a.featured - b.featured;
    if (state.sort === "available") return Number(b.status === "available") - Number(a.status === "available") || a.featured - b.featured;
    if (state.sort === "title") return a.title.localeCompare(b.title, "ru");
    return a.featured - b.featured;
  });
}

function badge(status) {
  return `<span class="badge ${escapeHTML(status)}">${escapeHTML(statusLabels[status] || status)}</span>`;
}

function renderGallery() {
  if (!nodes.gallery || !nodes.empty) return;
  const items = getFilteredArtworks();
  nodes.gallery.classList.toggle("is-list", state.view === "list");
  nodes.empty.hidden = items.length > 0;
  nodes.gallery.innerHTML = items.map((art) => {
    const tags = art.categories.map((cat) => categoryLabels[cat] || cat).join(" · ");
    const price = art.price ? ` · ${escapeHTML(art.price)}` : "";
    return `<article class="art-card" data-art-id="${escapeHTML(art.id)}">
      <figure>
        <div class="art-image"><img src="${escapeHTML(art.image)}" alt="${escapeHTML(art.alt)}" loading="lazy"></div>
        <figcaption class="art-card-body">
          <div class="art-topline">
            <div>
              <h3 class="art-title">${escapeHTML(art.title)}</h3>
              <p class="art-meta">${escapeHTML(art.technique)} · ${escapeHTML(art.size)} · ${escapeHTML(art.year)}${price}</p>
            </div>
            ${badge(art.status)}
          </div>
          <p class="art-desc">${escapeHTML(art.description)}</p>
          <div class="art-actions">
            <span class="art-tags">${escapeHTML(tags)}</span>
            <button class="detail-button" type="button" data-open-art="${escapeHTML(art.id)}">читать историю</button>
          </div>
        </figcaption>
      </figure>
    </article>`;
  }).join("");
}

function renderAvailable() {
  if (!nodes.availableList) return;
  const available = artworks.filter((art) => art.status === "available");
  nodes.availableList.innerHTML = available.map((art) => `<article class="available-item">
    <img src="${escapeHTML(art.image)}" alt="${escapeHTML(art.alt)}" loading="lazy">
    <div><h3>${escapeHTML(art.title)}</h3><p>${escapeHTML(art.technique)} · ${escapeHTML(art.size)}</p></div>
    <strong>${escapeHTML(art.price || "по запросу")}</strong>
  </article>`).join("");
}

function renderCounts() {
  if (nodes.totalCount) nodes.totalCount.textContent = artworks.length;
  if (nodes.availableCount) nodes.availableCount.textContent = artworks.filter((art) => art.status === "available").length;
}

function syncControls() {
  nodes.filters.forEach((button) => button.classList.toggle("is-active", button.dataset.filter === state.filter));
  nodes.viewButtons.forEach((button) => {
    const active = button.dataset.view === state.view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (nodes.sort) nodes.sort.value = state.sort;
}

function openModal(id) {
  if (!nodes.modal || !nodes.modalContent) return;
  const art = artworks.find((item) => item.id === id);
  if (!art) return;
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const tags = art.categories.map((cat) => `<span>${escapeHTML(categoryLabels[cat] || cat)}</span>`).join("");
  nodes.modalContent.innerHTML = `<div class="modal-image"><img src="${escapeHTML(art.image)}" alt="${escapeHTML(art.alt)}"></div>
    <article class="modal-copy">
      ${badge(art.status)}
      <h2 id="modal-title">${escapeHTML(art.title)}</h2>
      <p class="modal-meta">${escapeHTML(art.technique)} · ${escapeHTML(art.size)} · ${escapeHTML(art.year)}${art.price ? " · " + escapeHTML(art.price) : ""}</p>
      <div class="modal-story"><p>${escapeHTML(art.description)}</p><p>${escapeHTML(art.story)}</p></div>
      <blockquote class="modal-quote">${escapeHTML(art.quote)}</blockquote>
      <div class="modal-tags" aria-label="Темы работы">${tags}</div>
    </article>`;
  if (typeof nodes.modal.showModal === "function") {
    nodes.modal.showModal();
  } else {
    nodes.modal.setAttribute("open", "");
  }
  if (nodes.modalClose) nodes.modalClose.focus();
}

function closeModal() {
  if (!nodes.modal || !nodes.modal.open) return;
  nodes.modal.close();
  if (lastFocusedElement) lastFocusedElement.focus();
}

function showToast(message) {
  if (!nodes.toast) return;
  nodes.toast.textContent = message;
  nodes.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => nodes.toast.classList.remove("is-visible"), 2800);
}

function closeMenu() {
  if (!nodes.nav || !nodes.menuToggle) return;
  nodes.nav.classList.remove("is-open");
  nodes.menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("is-menu-open");
}

function bindEvents() {
  nodes.filters.forEach((button) => button.addEventListener("click", () => {
    state.filter = button.dataset.filter || "all";
    storage.set("dianaFinalFilter", state.filter);
    syncControls();
    renderGallery();
  }));

  nodes.viewButtons.forEach((button) => button.addEventListener("click", () => {
    state.view = button.dataset.view || "grid";
    storage.set("dianaFinalView", state.view);
    syncControls();
    renderGallery();
  }));

  if (nodes.search) nodes.search.addEventListener("input", (event) => {
    state.search = event.target.value || "";
    renderGallery();
  });

  if (nodes.sort) nodes.sort.addEventListener("change", (event) => {
    state.sort = event.target.value || "featured";
    storage.set("dianaFinalSort", state.sort);
    renderGallery();
  });

  if (nodes.gallery) nodes.gallery.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-open-art]");
    if (opener) openModal(opener.dataset.openArt);
  });

  if (nodes.modalClose) nodes.modalClose.addEventListener("click", closeModal);
  if (nodes.modal) nodes.modal.addEventListener("click", (event) => {
    if (event.target === nodes.modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeMenu();
    }
  });

  if (nodes.menuToggle && nodes.nav) nodes.menuToggle.addEventListener("click", () => {
    const expanded = nodes.menuToggle.getAttribute("aria-expanded") === "true";
    nodes.menuToggle.setAttribute("aria-expanded", String(!expanded));
    nodes.nav.classList.toggle("is-open", !expanded);
    document.body.classList.toggle("is-menu-open", !expanded);
  });

  $$("a[href^='#']").forEach((link) => link.addEventListener("click", closeMenu));

  if (nodes.backTop) nodes.backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  if (nodes.form) nodes.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(nodes.form);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !contact || !message) {
      showToast("Заполните имя, контакт и сообщение.");
      return;
    }
    const prepared = `Привет, Диана! Меня зовут ${name}.\nМой контакт: ${contact}.\n\n${message}`;
    if (nodes.formOutput) {
      nodes.formOutput.hidden = false;
      nodes.formOutput.textContent = prepared;
    }
    showToast("Сообщение подготовлено — скопируйте его в Telegram.");
  });

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 18;
    if (nodes.header) nodes.header.classList.toggle("is-scrolled", scrolled);
    if (nodes.backTop) nodes.backTop.classList.toggle("is-visible", window.scrollY > 620);
  }, { passive: true });
}

function initReveal() {
  const revealItems = $$(".reveal");
  if (!revealItems.length) return;
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  revealItems.forEach((item) => observer.observe(item));
}

function initRotatingPhrases() {
  if (!nodes.rotatingSource || !nodes.rotatingResult) return;
  const phrases = [
    ["фраза из дневника", "визуальная сцена"],
    ["городская привязанность", "горизонт воды"],
    ["поп‑культурная гиперфиксация", "личная мифология"],
    ["нежность без открытки", "два белых ягнёнка"],
    ["усталость и смешная злость", "цвет, фактура, подпись"]
  ];
  let index = 0;
  phraseTimer = window.setInterval(() => {
    index = (index + 1) % phrases.length;
    nodes.rotatingSource.textContent = phrases[index][0];
    nodes.rotatingResult.textContent = phrases[index][1];
  }, 2600);
}

function initActiveNav() {
  const links = $$(".main-nav a");
  const sections = links.map((link) => $(link.getAttribute("href"))).filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { threshold: 0.35 });
  sections.forEach((section) => observer.observe(section));
}

function init() {
  if (nodes.year) nodes.year.textContent = new Date().getFullYear();
  renderCounts();
  renderAvailable();
  syncControls();
  renderGallery();
  bindEvents();
  initReveal();
  initRotatingPhrases();
  initActiveNav();
}

document.addEventListener("DOMContentLoaded", init);
