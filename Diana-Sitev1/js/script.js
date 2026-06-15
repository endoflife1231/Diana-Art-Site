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

const allowedFilters = ["all", "available", "sold", ...Object.keys(categoryLabels)];
const allowedViews = ["grid", "list"];
const allowedSorts = ["featured", "newest", "available", "title"];

const storage = {
  get(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* localStorage can be unavailable */ }
  }
};

function storedChoice(key, fallback, allowedValues) {
  const value = storage.get(key, fallback);
  return allowedValues.includes(value) ? value : fallback;
}

const state = {
  filter: storedChoice("dianaFinalFilter", "all", allowedFilters),
  view: storedChoice("dianaFinalView", "grid", allowedViews),
  sort: storedChoice("dianaFinalSort", "featured", allowedSorts),
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
  rotatingResult: $("[data-rotating-result]"),
  heroVideo: $(".hero-video-frame video"),
  heroSound: $("[data-hero-sound]")
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

function isRequestPrice(price) {
  return String(price || "").trim().toLowerCase() === "по запросу";
}

function priceMarkup(art, className = "") {
  const price = art.price || "по запросу";
  const classes = ["price-link", className].filter(Boolean).join(" ");
  if (!isRequestPrice(price)) return `<span class="${escapeHTML(className)}">${escapeHTML(price)}</span>`;
  return `<a class="${escapeHTML(classes)}" href="#contact" data-contact-jump data-art-title="${escapeHTML(art.title)}">${escapeHTML(price)}</a>`;
}

function inlinePrice(art) {
  if (!art.price) return "";
  if (isRequestPrice(art.price)) return priceMarkup(art, "art-price-inline");
  return `<span class="art-price-inline">${escapeHTML(art.price)}</span>`;
}

function renderGallery() {
  if (!nodes.gallery || !nodes.empty) return;
  const items = getFilteredArtworks();
  nodes.gallery.classList.toggle("is-list", state.view === "list");
  nodes.empty.hidden = items.length > 0;
  nodes.gallery.classList.add("is-updating");
  nodes.gallery.innerHTML = items.map((art) => {
    const tags = art.categories.map((cat) => categoryLabels[cat] || cat).join(" · ");
    const price = art.price ? ` · ${inlinePrice(art)}` : "";
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
            <button class="detail-button" type="button" data-open-art="${escapeHTML(art.id)}" aria-label="Открыть историю работы ${escapeHTML(art.title)}">читать историю</button>
          </div>
        </figcaption>
      </figure>
    </article>`;
  }).join("");
  window.requestAnimationFrame(() => nodes.gallery.classList.remove("is-updating"));
}

function renderAvailable() {
  if (!nodes.availableList) return;
  const available = artworks.filter((art) => art.status === "available");
  nodes.availableList.innerHTML = available.map((art) => `<article class="available-item" data-available-art="${escapeHTML(art.id)}">
    <img src="${escapeHTML(art.image)}" alt="${escapeHTML(art.alt)}" loading="lazy">
    <div><h3>${escapeHTML(art.title)}</h3><p>${escapeHTML(art.technique)} · ${escapeHTML(art.size)}</p></div>
    <div class="available-actions">
      ${priceMarkup(art, "available-price")}
      <button class="available-open" type="button" data-open-art="${escapeHTML(art.id)}" aria-label="Открыть историю работы ${escapeHTML(art.title)}">история</button>
    </div>
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
      <p class="modal-meta">${escapeHTML(art.technique)} · ${escapeHTML(art.size)} · ${escapeHTML(art.year)}${art.price ? " · " + priceMarkup(art, "modal-price") : ""}</p>
      <div class="modal-story"><p>${escapeHTML(art.description)}</p><p>${escapeHTML(art.story)}</p></div>
      <blockquote class="modal-quote">${escapeHTML(art.quote)}</blockquote>
      ${art.id === "february" ? `<video class="modal-video" controls preload="metadata" poster="${escapeHTML(art.image)}"><source src="assets/videos/february-edit.mp4" type="video/mp4"></video>` : ""}
      ${art.id === "zaliv" ? `<video class="modal-video" controls preload="metadata" poster="${escapeHTML(art.image)}"><source src="assets/videos/hero-zaliv.mp4" type="video/mp4"></video>` : ""}
      ${art.id === "centre" ? `<div class="modal-media-pair">
        <img src="assets/images/art/penguin-context.jpg" alt="Девушка в снежных горах рядом с фигурой пингвина" loading="lazy">
        <video class="modal-video" controls preload="metadata" poster="${escapeHTML(art.image)}"><source src="assets/videos/penguin-context.mp4" type="video/mp4"></video>
      </div>` : ""}
      <div class="modal-tags" aria-label="Темы работы">${tags}</div>
    </article>`;
  if (typeof nodes.modal.showModal === "function") {
    nodes.modal.showModal();
  } else {
    nodes.modal.setAttribute("open", "");
  }
  if (nodes.modalClose) nodes.modalClose.focus();
}

function openImageModal({ src, title, alt }) {
  if (!nodes.modal || !nodes.modalContent || !src) return;
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  nodes.modalContent.innerHTML = `<div class="modal-image modal-image--archive">
    <img src="${escapeHTML(src)}" alt="${escapeHTML(alt || title || "Архивное изображение")}">
  </div>
  <article class="modal-copy modal-copy--archive">
    <p class="kicker">архив</p>
    <h2 id="modal-title">${escapeHTML(title || "Архивное изображение")}</h2>
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
  $$("video", nodes.modal).forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
  if (typeof nodes.modal.close === "function") {
    nodes.modal.close();
  } else {
    nodes.modal.removeAttribute("open");
  }
  if (lastFocusedElement) lastFocusedElement.focus();
}

function showToast(message) {
  if (!nodes.toast) return;
  nodes.toast.textContent = message;
  nodes.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => nodes.toast.classList.remove("is-visible"), 2800);
}

function setMenuOpen(open) {
  if (!nodes.nav || !nodes.menuToggle) return;
  nodes.nav.classList.toggle("is-open", open);
  nodes.menuToggle.setAttribute("aria-expanded", String(open));
  nodes.menuToggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  document.body.classList.toggle("is-menu-open", open);
}

function closeMenu() {
  setMenuOpen(false);
}

function jumpToContact(artTitle = "") {
  const contactSection = $("#contact");
  if (!contactSection) return;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const messageField = nodes.form ? $("[name='message']", nodes.form) : null;
  if (messageField && artTitle && !messageField.value.trim()) {
    messageField.value = `Здравствуйте! Интересует работа «${artTitle}». Подскажите, пожалуйста, доступность и условия покупки.`;
  }
  window.setTimeout(() => {
    contactSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }, 80);
}

function bindEvents() {
  nodes.filters.forEach((button) => button.addEventListener("click", () => {
    const nextFilter = button.dataset.filter || "all";
    state.filter = allowedFilters.includes(nextFilter) ? nextFilter : "all";
    storage.set("dianaFinalFilter", state.filter);
    syncControls();
    renderGallery();
  }));

  nodes.viewButtons.forEach((button) => button.addEventListener("click", () => {
    const nextView = button.dataset.view || "grid";
    state.view = allowedViews.includes(nextView) ? nextView : "grid";
    storage.set("dianaFinalView", state.view);
    syncControls();
    renderGallery();
  }));

  if (nodes.search) nodes.search.addEventListener("input", (event) => {
    state.search = event.target.value || "";
    renderGallery();
  });

  if (nodes.sort) nodes.sort.addEventListener("change", (event) => {
    const nextSort = event.target.value || "featured";
    state.sort = allowedSorts.includes(nextSort) ? nextSort : "featured";
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

  document.addEventListener("click", (event) => {
    const imageButton = event.target.closest("[data-open-image]");
    if (!imageButton) return;
    openImageModal({
      src: imageButton.dataset.openImage,
      title: imageButton.dataset.imageTitle,
      alt: imageButton.dataset.imageAlt
    });
  });

  document.addEventListener("click", (event) => {
    const contactLink = event.target.closest("[data-contact-jump]");
    if (!contactLink) return;
    event.preventDefault();
    const artTitle = contactLink.dataset.artTitle || "";
    closeModal();
    closeMenu();
    jumpToContact(artTitle);
  });

  if (nodes.availableList) nodes.availableList.addEventListener("click", (event) => {
    if (event.target.closest("[data-contact-jump]")) return;
    const opener = event.target.closest("[data-open-art]");
    if (opener) {
      openModal(opener.dataset.openArt);
      return;
    }
    const item = event.target.closest("[data-available-art]");
    if (item && !event.target.closest("a, button, input, select, textarea")) openModal(item.dataset.availableArt);
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
    setMenuOpen(!expanded);
  });

  $$("a[href^='#']").forEach((link) => link.addEventListener("click", closeMenu));

  if (nodes.backTop) nodes.backTop.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

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
    showToast("Сообщение подготовлено.");
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
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
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
    nodes.rotatingSource.classList.add("is-swapping");
    nodes.rotatingResult.classList.add("is-swapping");
    window.setTimeout(() => {
      nodes.rotatingSource.textContent = phrases[index][0];
      nodes.rotatingResult.textContent = phrases[index][1];
      nodes.rotatingSource.classList.remove("is-swapping");
      nodes.rotatingResult.classList.remove("is-swapping");
    }, 150);
  }, 3200);
}

function initHeroVideoSound() {
  if (!nodes.heroVideo || !nodes.heroSound) return;
  nodes.heroVideo.volume = 0.28;
  const setSound = async (enabled) => {
    nodes.heroVideo.muted = !enabled;
    nodes.heroSound.classList.toggle("is-active", enabled);
    nodes.heroSound.setAttribute("aria-pressed", String(enabled));
    nodes.heroSound.setAttribute("aria-label", enabled ? "Выключить звук видео" : "Включить звук видео");
    nodes.heroSound.querySelector("span").textContent = enabled ? "тихо" : "звук";
    if (!enabled) return;
    try {
      await nodes.heroVideo.play();
    } catch {
      setSound(false);
      showToast("Браузер не разрешил включить звук автоматически.");
    }
  };
  nodes.heroSound.addEventListener("click", () => {
    const enabled = nodes.heroSound.getAttribute("aria-pressed") === "true";
    setSound(!enabled);
  });
}

function initActiveNav() {
  const links = $$(".main-nav a");
  const sections = links.map((link) => $(link.getAttribute("href"))).filter(Boolean);
  if (!sections.length) return;
  let navTicking = false;
  const updateActiveLink = () => {
    const headerOffset = nodes.header?.offsetHeight || 0;
    const position = window.scrollY + headerOffset + 140;
    let activeSection = null;
    sections.forEach((section) => {
      if (section.offsetTop <= position) activeSection = section;
    });
    links.forEach((link) => link.classList.toggle("is-active", Boolean(activeSection) && link.getAttribute("href") === `#${activeSection.id}`));
  };
  const scheduleUpdate = () => {
    if (navTicking) return;
    navTicking = true;
    window.requestAnimationFrame(() => {
      updateActiveLink();
      navTicking = false;
    });
  };
  updateActiveLink();
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", updateActiveLink);
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
  initHeroVideoSound();
  initActiveNav();
}

document.addEventListener("DOMContentLoaded", init);
