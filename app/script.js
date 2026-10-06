/* ===== Ivaiporã Turismo — Script Principal ===== */

const STORAGE_KEY = "ivaipora_app_v5";
const THEME_KEY = "ivaipora_theme";
const LANG_KEY = "ivaipora_lang";

const IVAIPORA = {
  lat: -24.24778,
  lng: -51.68472,
  name: "Ivaiporã, Paraná, Brasil"
};

const storage = (() => {
  try {
    const browserStorage = window.localStorage;
    const testKey = "__ivaipora_storage_test__";
    browserStorage.setItem(testKey, "1");
    browserStorage.removeItem(testKey);
    return browserStorage;
  } catch (_) {
    const memory = new Map();
    return {
      getItem: key => memory.has(key) ? memory.get(key) : null,
      setItem: (key, value) => memory.set(key, String(value)),
      removeItem: key => memory.delete(key)
    };
  }
})();

const TRANSLATIONS = {
  pt: {
    splash_subtitle: "Descubra a beleza da nossa cidade",
    settings_title: "Configurações",
    settings_language: "Idioma",
    settings_language_desc: "Português / English / Español",
    settings_theme: "Tema",
    settings_theme_desc: "Modo claro ou escuro",
    theme_light: "Claro",
    theme_dark: "Escuro",
    nav_home: "Início",
    nav_earth: "Google Earth",
    home_title: "Descubra Ivaiporã",
    home_desc: "Explore os principais pontos turísticos, áreas verdes e lugares conhecidos de Ivaiporã, no Paraná.",
    section_attractions: "Lugares para conhecer",
    map_title: "Mapa de Ivaiporã",
    map_desc: "Explore a cidade no mapa e na visualização de satélite.",
    map_select: "Ivaiporã no mapa",
    map_select_desc: "O mapa está centralizado na cidade de Ivaiporã, Paraná.",
    btn_back: "Voltar",
    gallery_title: "Fotos reais de Ivaiporã",
    location_title: "Localização",
    poi_title: "Destaques do local",
    footer_text: "Ivaiporã Turismo — Feito com ❤️ para nossa cidade.",
    footer_credits: "Fotos aéreas: Jornal Paraná Centro. Mapas e imagens de satélite: Google.",
    view_details: "Ver detalhes →",
    no_attractions: "Nenhum lugar cadastrado.",
    map_points_label: "Destaques:",
    photo_of: "Vista de",
    photo_n: "Foto",
    welcome_title: "Bem-vindo a Ivaiporã",
    welcome_tagline: "Coração Verde do Paraná 🌿",
    welcome_desc: "Conheça o Parque Ambiental Jardim Botânico, o Lago das Flores, a Casa da Memória e outros lugares de Ivaiporã.",
    welcome_btn: "Explorar a Cidade",
    stat_attractions: "Lugares",
    stat_flowers: "Coração Verde",
    stat_earth: "Google Earth",
    earth_banner_title: "Explorar Ivaiporã no Google Earth",
    earth_banner_desc: "Abre o Google Earth já centralizado em Ivaiporã, Paraná",
    btn_google_earth: "Abrir no Google Earth",
    tab_map: "Mapa",
    tab_satellite: "Satélite",
    tab_streetview: "Google Maps",
    satellite_title: "Ivaiporã vista de cima",
    satellite_desc: "Imagens de satélite interativas para explorar a cidade e alguns dos principais pontos.",
    satellite_city: "Centro de Ivaiporã",
    satellite_garden: "Parque Jardim Botânico",
    satellite_lake: "Lago das Flores",
    map_external: "Abrir no Google Maps"
  },
  en: {
    splash_subtitle: "Discover the beauty of our city",
    settings_title: "Settings",
    settings_language: "Language",
    settings_language_desc: "Portuguese / English / Spanish",
    settings_theme: "Theme",
    settings_theme_desc: "Light or dark mode",
    theme_light: "Light",
    theme_dark: "Dark",
    nav_home: "Home",
    nav_earth: "Google Earth",
    home_title: "Discover Ivaiporã",
    home_desc: "Explore Ivaiporã's main attractions, green areas and well-known places in Paraná.",
    section_attractions: "Places to visit",
    map_title: "Ivaiporã Map",
    map_desc: "Explore the city on the map and satellite view.",
    map_select: "Ivaiporã on the map",
    map_select_desc: "The map is centered on Ivaiporã, Paraná.",
    btn_back: "Back",
    gallery_title: "Real photos of Ivaiporã",
    location_title: "Location",
    poi_title: "Place highlights",
    footer_text: "Ivaiporã Tourism — Made with ❤️ for our city.",
    footer_credits: "Aerial photos: Jornal Paraná Centro. Maps and satellite imagery: Google.",
    view_details: "View details →",
    no_attractions: "No places registered.",
    map_points_label: "Highlights:",
    photo_of: "View of",
    photo_n: "Photo",
    welcome_title: "Welcome to Ivaiporã",
    welcome_tagline: "Green Heart of Paraná 🌿",
    welcome_desc: "Discover the Environmental Botanical Garden Park, Lago das Flores, Casa da Memória and other places in Ivaiporã.",
    welcome_btn: "Explore the City",
    stat_attractions: "Places",
    stat_flowers: "Green Heart",
    stat_earth: "Google Earth",
    earth_banner_title: "Explore Ivaiporã in Google Earth",
    earth_banner_desc: "Opens Google Earth already centered on Ivaiporã, Paraná",
    btn_google_earth: "Open in Google Earth",
    tab_map: "Map",
    tab_satellite: "Satellite",
    tab_streetview: "Google Maps",
    satellite_title: "Ivaiporã from above",
    satellite_desc: "Interactive satellite imagery to explore the city and some of its main places.",
    satellite_city: "Ivaiporã city center",
    satellite_garden: "Botanical Garden Park",
    satellite_lake: "Lago das Flores",
    map_external: "Open in Google Maps"
  },
  es: {
    splash_subtitle: "Descubre la belleza de nuestra ciudad",
    settings_title: "Configuración",
    settings_language: "Idioma",
    settings_language_desc: "Portugués / Inglés / Español",
    settings_theme: "Tema",
    settings_theme_desc: "Modo claro u oscuro",
    theme_light: "Claro",
    theme_dark: "Oscuro",
    nav_home: "Inicio",
    nav_earth: "Google Earth",
    home_title: "Descubre Ivaiporã",
    home_desc: "Explora los principales lugares turísticos, áreas verdes y sitios conocidos de Ivaiporã, Paraná.",
    section_attractions: "Lugares para conocer",
    map_title: "Mapa de Ivaiporã",
    map_desc: "Explora la ciudad en el mapa y en vista satelital.",
    map_select: "Ivaiporã en el mapa",
    map_select_desc: "El mapa está centrado en Ivaiporã, Paraná.",
    btn_back: "Volver",
    gallery_title: "Fotos reales de Ivaiporã",
    location_title: "Ubicación",
    poi_title: "Destacados del lugar",
    footer_text: "Ivaiporã Turismo — Hecho con ❤️ para nuestra ciudad.",
    footer_credits: "Fotos aéreas: Jornal Paraná Centro. Mapas e imágenes satelitales: Google.",
    view_details: "Ver detalles →",
    no_attractions: "No hay lugares registrados.",
    map_points_label: "Destacados:",
    photo_of: "Vista de",
    photo_n: "Foto",
    welcome_title: "Bienvenido a Ivaiporã",
    welcome_tagline: "Corazón Verde de Paraná 🌿",
    welcome_desc: "Conoce el Parque Ambiental Jardim Botânico, el Lago das Flores, la Casa da Memória y otros lugares de Ivaiporã.",
    welcome_btn: "Explorar la Ciudad",
    stat_attractions: "Lugares",
    stat_flowers: "Corazón Verde",
    stat_earth: "Google Earth",
    earth_banner_title: "Explorar Ivaiporã en Google Earth",
    earth_banner_desc: "Abre Google Earth ya centrado en Ivaiporã, Paraná",
    btn_google_earth: "Abrir en Google Earth",
    tab_map: "Mapa",
    tab_satellite: "Satélite",
    tab_streetview: "Google Maps",
    satellite_title: "Ivaiporã desde arriba",
    satellite_desc: "Imágenes satelitales interactivas para explorar la ciudad y algunos de sus principales lugares.",
    satellite_city: "Centro de Ivaiporã",
    satellite_garden: "Parque Jardim Botânico",
    satellite_lake: "Lago das Flores",
    map_external: "Abrir en Google Maps"
  }
};

let currentLang = "pt";

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.pt[key] || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
}

const DEFAULT_DATA = {
  attractions: [
    {
      name: "Parque Ambiental Jardim Botânico",
      query: "Parque Jardim Botânico, Ivaiporã, PR, Brasil",
      desc: "Um dos principais espaços verdes de Ivaiporã, com lago, áreas de lazer, caminhada e contato com a natureza.",
      descEn: "One of Ivaiporã's main green spaces, with a lake, leisure areas, walking paths and contact with nature.",
      descEs: "Uno de los principales espacios verdes de Ivaiporã, con lago, áreas de ocio, caminatas y contacto con la naturaleza.",
      highlights: ["Lago", "Caminhada", "Áreas verdes"]
    },
    {
      name: "Lago das Flores",
      query: "Lago das Flores, Ivaiporã, PR, Brasil",
      desc: "Ponto turístico e de lazer de Ivaiporã, com pista de caminhada, paisagismo e espaços para convivência.",
      descEn: "A leisure and tourism spot in Ivaiporã, with a walking path, landscaping and community spaces.",
      descEs: "Punto turístico y de ocio de Ivaiporã, con pista para caminar, paisajismo y espacios de convivencia.",
      highlights: ["Lazer", "Paisagismo", "Caminhada"]
    },
    {
      name: "Praça Manoel Teodoro da Rocha",
      query: "Praça Manoel Teodoro da Rocha, Ivaiporã, PR, Brasil",
      desc: "Praça preservada de Ivaiporã e um dos espaços urbanos indicados para conhecer a cidade.",
      descEn: "A preserved square in Ivaiporã and one of the urban spaces worth visiting in the city.",
      descEs: "Una plaza preservada de Ivaiporã y uno de los espacios urbanos recomendados para conocer la ciudad.",
      highlights: ["Praça", "Paisagismo", "Centro urbano"]
    },
    {
      name: "Casa da Memória Vera Vargas",
      query: "Casa da Memória Vera Vargas, Ivaiporã, PR, Brasil",
      desc: "Espaço cultural voltado à preservação da memória e da história local, instalado junto ao Parque Jardim Botânico.",
      descEn: "A cultural space dedicated to preserving local memory and history, located by the Botanical Garden Park.",
      descEs: "Espacio cultural dedicado a preservar la memoria y la historia local, junto al Parque Jardim Botânico.",
      highlights: ["História local", "Cultura", "Memória"]
    },
    {
      name: "Estação Ecológica Faian",
      query: "Estação Ecológica Faian, Ivaiporã, PR, Brasil",
      desc: "Área verde citada pelo turismo oficial do Paraná entre os espaços de preservação ambiental de Ivaiporã.",
      descEn: "A green area listed by Paraná's official tourism information among Ivaiporã's environmental preservation sites.",
      descEs: "Área verde citada por el turismo oficial de Paraná entre los espacios de preservación ambiental de Ivaiporã.",
      highlights: ["Preservação", "Natureza", "Área verde"]
    },
    {
      name: "Horto Florestal Cayuá",
      query: "Horto Florestal Cayuá, Ivaiporã, PR, Brasil",
      desc: "Área ligada à conservação ambiental e ao conjunto de espaços verdes do município.",
      descEn: "An area connected to environmental conservation and Ivaiporã's network of green spaces.",
      descEs: "Área vinculada a la conservación ambiental y al conjunto de espacios verdes del municipio.",
      highlights: ["Conservação", "Vegetação", "Meio ambiente"]
    },
    {
      name: "IFPR - Campus Ivaiporã",
      query: "IFPR Campus Ivaiporã, Rua Max Arthur Greipel 505, Ivaiporã, PR, Brasil",
      desc: "Campus do Instituto Federal do Paraná em Ivaiporã, importante instituição pública de ensino da cidade.",
      descEn: "The Federal Institute of Paraná campus in Ivaiporã, an important public educational institution in the city.",
      descEs: "Campus del Instituto Federal de Paraná en Ivaiporã, una importante institución pública de enseñanza de la ciudad.",
      highlights: ["Ensino público", "Campus", "Educação"]
    },
    {
      name: "Univale - Faculdade",
      query: "Univale Avenida Minas Gerais 651, Ivaiporã, PR, Brasil",
      desc: "Instituição de ensino superior localizada na Avenida Minas Gerais, em Ivaiporã.",
      descEn: "A higher education institution located on Minas Gerais Avenue in Ivaiporã.",
      descEs: "Institución de educación superior ubicada en la Avenida Minas Gerais, en Ivaiporã.",
      highlights: ["Ensino superior", "Faculdade", "Educação"]
    },
    {
      name: "Café do Urso",
      query: "Café do Urso Avenida Paraná 218, Ivaiporã, PR, Brasil",
      desc: "Cafeteria localizada na Avenida Paraná, no Centro de Ivaiporã.",
      descEn: "A coffee shop located on Paraná Avenue in downtown Ivaiporã.",
      descEs: "Cafetería ubicada en la Avenida Paraná, en el centro de Ivaiporã.",
      highlights: ["Cafeteria", "Centro", "Gastronomia"]
    }
  ]
};

const REAL_CITY_PHOTOS = [
  "ivaipora_aerea_real.webp",
  "ivaipora_centro_real.webp"
];

function getData() {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.attractions)) throw new Error("invalid data");
    return parsed;
  } catch (_) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  storage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getDescription(attraction) {
  if (currentLang === "en") return attraction.descEn || attraction.desc;
  if (currentLang === "es") return attraction.descEs || attraction.desc;
  return attraction.desc;
}

function getAttractionPhotos() {
  return REAL_CITY_PHOTOS.slice();
}

function getGoogleEarthCityUrl() {
  return `https://earth.google.com/web/@${IVAIPORA.lat},${IVAIPORA.lng},900a,9000d,35y,0h,0t,0r`;
}

function getGoogleEarthSearchUrl(query) {
  return `https://earth.google.com/web/search/${encodeURIComponent(query)}`;
}

function getGoogleMapsExternalUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getMapEmbedUrl(query, satellite = false) {
  const type = satellite ? "k" : "m";
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=${type}&z=${satellite ? 17 : 15}&output=embed`;
}

function makeIframe(url, title) {
  return `<iframe
    src="${escapeHtml(url)}"
    title="${escapeHtml(title)}"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    allowfullscreen
  ></iframe>`;
}

function bindImageFallbacks(root = document) {
  root.querySelectorAll("img").forEach(image => {
    if (image.dataset.fallbackBound === "true") return;
    image.dataset.fallbackBound = "true";
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.src = "ivaipora_logo.jpg";
      image.classList.add("image-fallback");
    }, { once: true });
  });
}

function initSplash() {
  const splash = document.getElementById("splash-screen");
  if (!splash) return;

  const dismiss = () => {
    splash.classList.add("hidden");
    setTimeout(() => { splash.style.display = "none"; }, 600);
  };

  setTimeout(dismiss, 2200);
  splash.addEventListener("click", dismiss, { once: true });
}

function applyTheme(theme) {
  const current = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", current);
  storage.setItem(THEME_KEY, current);

  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  if (toggle) toggle.classList.toggle("toggled", current === "dark");
  if (icon) icon.textContent = current === "dark" ? "🌙" : "☀️";
}

function initTheme() {
  applyTheme(storage.getItem(THEME_KEY) || "light");
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
}

function renderSatellitePreviews() {
  const cards = [
    ["satellite-city", "Ivaiporã, PR, Brasil", t("satellite_city")],
    ["satellite-garden", "Parque Jardim Botânico, Ivaiporã, PR, Brasil", t("satellite_garden")],
    ["satellite-lake", "Lago das Flores, Ivaiporã, PR, Brasil", t("satellite_lake")]
  ];

  cards.forEach(([id, query, label]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = makeIframe(getMapEmbedUrl(query, true), `${label} — satélite`);
  });
}

function renderHome() {
  const data = getData();
  const list = document.getElementById("attractions");
  if (!list) return;

  if (data.attractions.length === 0) {
    list.innerHTML = `<li class="muted">${escapeHtml(t("no_attractions"))}</li>`;
    return;
  }

  list.innerHTML = data.attractions.map((attraction, index) => {
    const photo = REAL_CITY_PHOTOS[index % REAL_CITY_PHOTOS.length];
    return `
      <li class="attraction-item" data-attraction-name="${escapeHtml(attraction.name)}" role="button" tabindex="0">
        <img class="attraction-photo" src="${escapeHtml(photo)}" alt="${escapeHtml(t("photo_of"))} Ivaiporã" loading="lazy" decoding="async">
        <div>
          <strong class="attraction-name">${escapeHtml(attraction.name)}</strong>
          <p class="attraction-desc">${escapeHtml(getDescription(attraction))}</p>
          <span class="view-details-tag">${escapeHtml(t("view_details"))}</span>
        </div>
      </li>`;
  }).join("");

  bindImageFallbacks(list);
  list.querySelectorAll(".attraction-item").forEach(item => {
    const open = () => viewAttractionDetails(item.dataset.attractionName);
    item.addEventListener("click", open);
    item.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function renderMainMap() {
  const map = document.getElementById("map");
  const details = document.getElementById("map-details");
  if (map) {
    map.innerHTML = makeIframe(getMapEmbedUrl(IVAIPORA.name, false), "Mapa de Ivaiporã");
  }
  if (details) {
    details.innerHTML = `
      <h4>${escapeHtml(t("map_select"))}</h4>
      <img class="map-details-photo" src="ivaipora_centro_real.webp" alt="Vista aérea real de Ivaiporã" loading="lazy" decoding="async">
      <p class="muted">${escapeHtml(t("map_select_desc"))}</p>
      <a class="map-external-link" href="${escapeHtml(getGoogleMapsExternalUrl(IVAIPORA.name))}" target="_blank" rel="noopener">${escapeHtml(t("map_external"))} ↗</a>
    `;
    bindImageFallbacks(details);
  }
}

function refreshLanguageDependentContent() {
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : currentLang;
  applyTranslations();
  renderHome();
  renderMainMap();
  renderSatellitePreviews();

  const placeSection = document.getElementById("place-section");
  const placeTitle = document.getElementById("place-title");
  if (placeSection && !placeSection.hidden && placeTitle) {
    const attraction = getData().attractions.find(item => item.name === placeTitle.textContent);
    if (attraction) populatePlaceDetails(attraction);
  }
}

function initLanguage() {
  const saved = storage.getItem(LANG_KEY);
  currentLang = Object.prototype.hasOwnProperty.call(TRANSLATIONS, saved) ? saved : "pt";

  document.querySelectorAll(".lang-btn[data-lang]").forEach(button => {
    const lang = button.dataset.lang;
    const updateButton = () => {
      const active = lang === currentLang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    };

    updateButton();
    button.addEventListener("click", () => {
      if (!Object.prototype.hasOwnProperty.call(TRANSLATIONS, lang)) return;
      currentLang = lang;
      storage.setItem(LANG_KEY, currentLang);
      document.querySelectorAll(".lang-btn[data-lang]").forEach(item => {
        const active = item.dataset.lang === currentLang;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      refreshLanguageDependentContent();
    });
  });

  refreshLanguageDependentContent();
}

function initSettings() {
  const openBtn = document.getElementById("settings-btn");
  const overlay = document.getElementById("settings-overlay");
  const closeBtn = document.getElementById("settings-close");
  if (!openBtn || !overlay) return;

  const open = () => {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("open"));
  };

  const close = () => {
    overlay.classList.remove("open");
    setTimeout(() => { overlay.hidden = true; }, 350);
  };

  openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", event => {
    if (event.target === overlay) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !overlay.hidden) close();
  });
}

let currentAttraction = null;

function populatePlaceDetails(attraction) {
  currentAttraction = attraction;
  const title = document.getElementById("place-title");
  const desc = document.getElementById("place-desc");
  const earth = document.getElementById("btn-google-earth");
  const gallery = document.getElementById("place-gallery");
  const list = document.getElementById("mini-map-attractions");

  if (title) title.textContent = attraction.name;
  if (desc) desc.textContent = getDescription(attraction);
  if (earth) earth.href = getGoogleEarthSearchUrl(attraction.query || `${attraction.name}, Ivaiporã, PR, Brasil`);

  if (gallery) {
    gallery.innerHTML = getAttractionPhotos().map((url, index) => `
      <figure class="gallery-figure">
        <img class="gallery-photo" src="${escapeHtml(url)}" alt="${escapeHtml(t("photo_n"))} ${index + 1} — Ivaiporã" loading="lazy" decoding="async">
        <figcaption>Ivaiporã — vista aérea real</figcaption>
      </figure>`).join("");
    bindImageFallbacks(gallery);
  }

  if (list) {
    const highlights = Array.isArray(attraction.highlights) ? attraction.highlights : [];
    list.innerHTML = highlights.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  }

  renderMiniMap("map");
}

function viewAttractionDetails(name) {
  const attraction = getData().attractions.find(item => item.name.toLowerCase() === String(name).toLowerCase());
  if (!attraction) return;

  populatePlaceDetails(attraction);
  document.getElementById("welcome-section").hidden = true;
  document.getElementById("home-section").hidden = true;
  document.getElementById("place-section").hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderMiniMap(tabName) {
  const mapContainer = document.getElementById("mini-map");
  const streetContainer = document.getElementById("mini-streetview");
  const tabMap = document.getElementById("tab-map");
  const tabSat = document.getElementById("tab-satellite");
  const tabExternal = document.getElementById("tab-streetview");
  if (!mapContainer || !streetContainer || !tabMap || !tabSat || !tabExternal || !currentAttraction) return;

  [tabMap, tabSat, tabExternal].forEach(button => button.classList.remove("active"));
  const query = currentAttraction.query || `${currentAttraction.name}, Ivaiporã, PR, Brasil`;

  if (tabName === "map") {
    tabMap.classList.add("active");
    mapContainer.hidden = false;
    streetContainer.hidden = true;
    mapContainer.innerHTML = makeIframe(getMapEmbedUrl(query, false), `Mapa — ${currentAttraction.name}`);
  } else if (tabName === "satellite") {
    tabSat.classList.add("active");
    mapContainer.hidden = false;
    streetContainer.hidden = true;
    mapContainer.innerHTML = makeIframe(getMapEmbedUrl(query, true), `Satélite — ${currentAttraction.name}`);
  } else {
    tabExternal.classList.add("active");
    mapContainer.hidden = true;
    streetContainer.hidden = false;
    streetContainer.innerHTML = `
      <div class="external-map-cta">
        <span class="external-map-icon">🗺️</span>
        <strong>${escapeHtml(currentAttraction.name)}</strong>
        <p>${escapeHtml(t("map_external"))}</p>
        <a class="btn-earth" href="${escapeHtml(getGoogleMapsExternalUrl(query))}" target="_blank" rel="noopener">${escapeHtml(t("map_external"))} ↗</a>
      </div>`;
  }
}

function backToHome() {
  document.getElementById("place-section").hidden = true;
  document.getElementById("home-section").hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
  document.getElementById("welcome-section").hidden = true;
  document.getElementById("place-section").hidden = true;
  document.getElementById("home-section").hidden = false;
  renderHome();
  renderMainMap();
  renderSatellitePreviews();
}

function initNavigation() {
  const navHome = document.getElementById("nav-home");
  const back = document.getElementById("btn-back");
  const start = document.getElementById("btn-welcome-start");
  const earthNav = document.getElementById("nav-google-earth");
  const earthBanner = document.getElementById("earth-banner-link");
  const tabMap = document.getElementById("tab-map");
  const tabSat = document.getElementById("tab-satellite");
  const tabExternal = document.getElementById("tab-streetview");

  if (navHome) navHome.addEventListener("click", showHome);
  if (back) back.addEventListener("click", backToHome);
  if (start) start.addEventListener("click", showHome);
  if (earthNav) earthNav.href = getGoogleEarthCityUrl();
  if (earthBanner) earthBanner.href = getGoogleEarthCityUrl();
  if (tabMap) tabMap.addEventListener("click", () => renderMiniMap("map"));
  if (tabSat) tabSat.addEventListener("click", () => renderMiniMap("satellite"));
  if (tabExternal) tabExternal.addEventListener("click", () => renderMiniMap("external"));
}

if (!storage.getItem(STORAGE_KEY)) {
  saveData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
}

initSplash();
initTheme();
initSettings();
initNavigation();
initLanguage();
bindImageFallbacks(document);
