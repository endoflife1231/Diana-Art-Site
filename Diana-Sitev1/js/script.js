const artworks = Array.isArray(window.__SITE_DATA__?.artworks) ? window.__SITE_DATA__.artworks : [];

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
  copyMessage: $("[data-copy-message]"),
  year: $("[data-year]"),
  totalCount: $("[data-total-count]"),
  availableCount: $("[data-available-count]"),
  rotatingSource: $("[data-rotating-source]"),
  rotatingResult: $("[data-rotating-result]")
};

let lastFocusedElement = null;
let toastTimer = null;
let phraseTimer = null;
let preparedMessage = "";
let scrollTicking = false;

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
    return `<article class="art-card" data-art-id="${escapeHTML(art.id)}" tabindex="0" role="button" aria-label="Открыть историю работы ${escapeHTML(art.title)}">
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
  nodes.availableList.innerHTML = available.map((art) => `<article class="available-item" data-available-art="${escapeHTML(art.id)}" tabindex="0" role="button">
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
      ${art.id === "february" ? `<video class="modal-video" controls preload="metadata" poster="${escapeHTML(art.image)}"><source src="assets/videos/february-edit.mp4" type="video/mp4"></video>` : ""}
      ${art.id === "zaliv" ? `<video class="modal-video" controls preload="metadata" poster="${escapeHTML(art.image)}"><source src="assets/videos/hero-zaliv.mp4" type="video/mp4"></video>` : ""}
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
    const card = event.target.closest("[data-art-id]");
    if (opener) {
      openModal(opener.dataset.openArt);
      return;
    }
    if (card && !event.target.closest("a, button, input, select, textarea")) openModal(card.dataset.artId);
  });

  if (nodes.gallery) nodes.gallery.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-art-id]");
    if (!card) return;
    event.preventDefault();
    openModal(card.dataset.artId);
  });

  if (nodes.availableList) nodes.availableList.addEventListener("click", (event) => {
    const item = event.target.closest("[data-available-art]");
    if (item) openModal(item.dataset.availableArt);
  });

  if (nodes.availableList) nodes.availableList.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const item = event.target.closest("[data-available-art]");
    if (!item) return;
    event.preventDefault();
    openModal(item.dataset.availableArt);
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
    if (event.key === "Tab" && nodes.modal?.open) {
      const focusable = $$("a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), video[controls], [tabindex]:not([tabindex='-1'])", nodes.modal)
        .filter((element) => element.offsetParent !== null || element === document.activeElement);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
    preparedMessage = `Привет, Диана! Меня зовут ${name}.\nМой контакт: ${contact}.\n\n${message}`;
    if (nodes.formOutput) {
      nodes.formOutput.hidden = false;
      nodes.formOutput.textContent = preparedMessage;
    }
    if (nodes.copyMessage) nodes.copyMessage.hidden = false;
    showToast("Сообщение подготовлено — скопируйте его в Telegram.");
  });

  if (nodes.copyMessage) nodes.copyMessage.addEventListener("click", async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      showToast("Сообщение скопировано.");
    } catch {
      showToast("Не удалось скопировать автоматически — выделите текст вручную.");
    }
  });

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY > 18;
      if (nodes.header) nodes.header.classList.toggle("is-scrolled", scrolled);
      if (nodes.backTop) nodes.backTop.classList.toggle("is-visible", window.scrollY > 620);
      scrollTicking = false;
    });
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
