/* ===== Ivaiporã Turismo — Script Principal ===== */

// ===== STORAGE KEYS =====
const STORAGE_KEY = "ivaipora_app_v4";
const THEME_KEY = "ivaipora_theme";
const LANG_KEY = "ivaipora_lang";
const MAPS_KEY = "google_maps_api_key";

let mapsScriptLoaded = false;
let mapsCallbacks = [];

function loadGoogleMapsScript(callback, fallback) {
  if (window.google && window.google.maps) {
    if (callback) callback();
    return;
  }
  
  const savedKey = localStorage.getItem(MAPS_KEY) || "";
  
  // Set a 3-second timeout to trigger the fallback if Google Maps fails to load
  const timeoutId = setTimeout(() => {
    if (!window.google || !window.google.maps) {
      console.warn("Google Maps JS API failed to load (timeout). Using iframe fallback.");
      if (fallback) fallback();
    }
  }, 3000);

  const scriptId = "google-maps-api-script";
  let script = document.getElementById(scriptId);

  if (script) {
    if (window.google && window.google.maps) {
      clearTimeout(timeoutId);
      if (callback) callback();
    } else {
      mapsCallbacks.push(() => {
        clearTimeout(timeoutId);
        callback();
      });
    }
    return;
  }

  if (callback) {
    mapsCallbacks.push(() => {
      clearTimeout(timeoutId);
      callback();
    });
  }
  
  mapsScriptLoaded = true;

  script = document.createElement("script");
  script.id = scriptId;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${savedKey}&callback=googleMapsCallback&loading=async`;
  script.async = true;
  script.defer = true;
  
  script.onerror = () => {
    clearTimeout(timeoutId);
    console.error("Google Maps JS API script error. Using iframe fallback.");
    if (fallback) fallback();
  };

  window.googleMapsCallback = function() {
    delete window.googleMapsCallback;
    while (mapsCallbacks.length > 0) {
      const cb = mapsCallbacks.shift();
      if (cb) cb();
    }
  };

  document.head.appendChild(script);
}

function updateMapsApiKey(newKey) {
  localStorage.setItem(MAPS_KEY, newKey.trim());
  alert(currentLang === "en" ? "API Key saved! Reloading page to apply..." : "Chave API salva! Recarregando a página para aplicar...");
  window.location.reload();
}

// ===== i18n TRANSLATIONS =====
const TRANSLATIONS = {
  pt: {
    splash_subtitle: "Descubra a beleza da nossa cidade",
    settings_title: "Configurações",
    settings_language: "Idioma",
    settings_language_desc: "Português / English",
    settings_theme: "Tema",
    settings_theme_desc: "Modo claro ou escuro",
    theme_light: "Claro",
    theme_dark: "Escuro",
    nav_home: "Início",
    home_title: "Descubra Ivaiporã",
    home_desc: "Explore os pontos turísticos, atrações naturais e a cultura vibrante de Ivaiporã, no coração do Paraná.",
    section_attractions: "Atrações Turísticas",
    map_title: "Mapa de Ivaiporã",
    map_desc: "Clique nos marcadores para ver os pontos turísticos da cidade.",
    map_select: "Selecione um ponto",
    map_select_desc: "Clique em um marcador no mapa para visualizar detalhes.",
    btn_back: "Voltar",
    gallery_title: "Galeria de Fotos",
    location_title: "Localização & Atrações",
    poi_title: "Pontos de Interesse",
    footer_text: "Ivaiporã Turismo — Feito com ❤️ para nossa cidade.",
    view_details: "Ver detalhes →",
    no_attractions: "Nenhuma atração cadastrada.",
    map_points_label: "Pontos turísticos principais:",
    tourist_point: "Ponto Turístico",
    center: "Centro",
    photo_of: "Foto de",
    photo_n: "Foto",
    welcome_title: "Bem-vindo ao Ivaiporã Turismo",
    welcome_desc: "Este é o guia definitivo para explorar e se apaixonar por Ivaiporã. Conheça as belezas naturais do Lago de Santana, mergulhe na história da Casa da Memória, visite as instituições de ensino Univale e IFPR, e aproveite momentos agradáveis no Café do Urso e na Cafeteria Florenza.",
    welcome_btn: "Explorar a Cidade",
    btn_google_earth: "Abrir no Google Earth",
    settings_api_key: "Google Maps API Key",
    settings_api_key_desc: "Chave para carregar mapas oficiais",
    btn_save: "Salvar",
    tab_map: "Mapa",
    tab_satellite: "Satélite (Earth)",
    tab_streetview: "Street View"
  },
  en: {
    splash_subtitle: "Discover the beauty of our city",
    settings_title: "Settings",
    settings_language: "Language",
    settings_language_desc: "Portuguese / English",
    settings_theme: "Theme",
    settings_theme_desc: "Light or dark mode",
    theme_light: "Light",
    theme_dark: "Dark",
    nav_home: "Home",
    home_title: "Discover Ivaiporã",
    home_desc: "Explore the tourist attractions, natural beauty and vibrant culture of Ivaiporã, in the heart of Paraná.",
    section_attractions: "Tourist Attractions",
    map_title: "Map of Ivaiporã",
    map_desc: "Click on the markers to see the city's tourist spots.",
    map_select: "Select a point",
    map_select_desc: "Click a marker on the map to view details.",
    btn_back: "Back",
    gallery_title: "Photo Gallery",
    location_title: "Location & Attractions",
    poi_title: "Points of Interest",
    footer_text: "Ivaiporã Tourism — Made with ❤️ for our city.",
    view_details: "View details →",
    no_attractions: "No attractions registered.",
    map_points_label: "Main tourist points:",
    tourist_point: "Tourist Spot",
    center: "Center",
    photo_of: "Photo of",
    photo_n: "Photo",
    welcome_title: "Welcome to Ivaiporã Tourism",
    welcome_desc: "This is the definitive guide to explore and fall in love with Ivaiporã. Discover the natural beauty of Santana Lake, dive into the history of the House of Memory (Museum), visit Univale and IFPR educational institutions, and enjoy pleasant moments at Bear's Café and Florenza Cafeteria.",
    welcome_btn: "Explore the City",
    btn_google_earth: "Open in Google Earth",
    settings_api_key: "Google Maps API Key",
    settings_api_key_desc: "Key to load official maps",
    btn_save: "Save",
    tab_map: "Map",
    tab_satellite: "Satellite (Earth)",
    tab_streetview: "Street View"
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

// ===== DATA — IVAIPORÃ ONLY =====
const DEFAULT_DATA = {
  attractions: [
    {
      name: "Lago de Santana",
      desc: "Ótimo ponto para lazer, caminhadas e pesca à beira do lago. Muito popular entre famílias nos fins de semana.",
      descEn: "Great spot for leisure, walks and fishing by the lake. Very popular among families on weekends."
    },
    {
      name: "Parque Ecológico de Ivaiporã",
      desc: "Paisagens naturais preservadas com trilhas, fauna e flora do bioma Mata Atlântica.",
      descEn: "Preserved natural landscapes with trails, fauna and flora of the Atlantic Forest biome."
    },
    {
      name: "Centro Cultural de Ivaiporã",
      desc: "Eventos culturais, feiras de artesanato e gastronomia regional no coração da cidade.",
      descEn: "Cultural events, craft fairs and regional cuisine in the heart of the city."
    },
    {
      name: "Casa da Memória Vera Vargas (Museu)",
      desc: "Espaço cultural dedicado à preservação da história de Ivaiporã, reunindo fotos, documentos e peças históricas recolhidas da própria comunidade.",
      descEn: "Cultural space dedicated to preserving Ivaiporã's history, gathering photos, documents, and historical artifacts from the community."
    },
    {
      name: "Univale - Faculdade",
      desc: "Faculdades Integradas do Vale do Ivaí, importante pólo de ensino superior presencial na região central, oferecendo Direito, Odontologia e mais.",
      descEn: "Vale do Ivaí Integrated Colleges, a key higher education hub in the central region, offering Law, Dentistry, and more."
    },
    {
      name: "IFPR - Campus Ivaiporã",
      desc: "Campus do Instituto Federal do Paraná, que oferece ensino técnico de nível médio e cursos superiores públicos e gratuitos de alta qualidade.",
      descEn: "Campus of the Federal Institute of Paraná, offering secondary-level technical education and high-quality free public higher education."
    },
    {
      name: "Cafeteria Florenza",
      desc: "Ponto gastronômico tradicional na Avenida Paraná, reconhecido pelos ótimos cafés, lanches rápidos, tortas doces e pães artesanais.",
      descEn: "Traditional dining spot on Paraná Avenue, famous for its excellent coffee, quick bites, sweet pies, and artisanal breads."
    },
    {
      name: "Café do Urso",
      desc: "Uma charmosa cafeteria temática com cafés gourmet especiais, deliciosas tortas e um ambiente aconchegante perfeito para fotos.",
      descEn: "A charming themed coffee shop with specialty gourmet coffees, delicious pies, and a cozy atmosphere perfect for photos."
    },
    {
      name: "Praça Manoel Ribas",
      desc: "Praça central da cidade, ponto de encontro com bela arborização e espaço para eventos.",
      descEn: "Central square of the city, meeting point with beautiful trees and event spaces."
    },
    {
      name: "Cachoeira do Rio Bom",
      desc: "Cachoeira de fácil acesso na região, ideal para banho e contato com a natureza.",
      descEn: "Easy-access waterfall in the region, ideal for swimming and nature contact."
    },
    {
      name: "Mirante da Serra",
      desc: "Vista panorâmica da cidade e do vale do Rio Ivaí, perfeito para fotos ao pôr do sol.",
      descEn: "Panoramic view of the city and the Ivaí River valley, perfect for sunset photos."
    },
    {
      name: "Igreja Matriz São João Batista",
      desc: "Principal templo religioso da cidade, com arquitetura marcante e missas tradicionais.",
      descEn: "Main religious temple of the city, with striking architecture and traditional masses."
    },
    {
      name: "Feira do Produtor Rural",
      desc: "Produtos coloniais frescos, queijos, mel e artesanato local todos os sábados.",
      descEn: "Fresh colonial products, cheeses, honey and local crafts every Saturday."
    }
  ]
};

const MAP_POINTS = [
  {
    name: "Lago de Santana",
    lat: -24.2755,
    lng: -51.2150,
    attractions: ["Área de Lazer", "Pesca Esportiva", "Trilha Ecológica"]
  },
  {
    name: "Centro de Ivaiporã",
    lat: -24.2878,
    lng: -51.2264,
    attractions: ["Praça Manoel Ribas", "Centro Cultural", "Comércio Local"]
  },
  {
    name: "Parque Ecológico",
    lat: -24.2950,
    lng: -51.2380,
    attractions: ["Trilhas na Mata", "Observação de Aves", "Área de Piquenique"]
  },
  {
    name: "Casa da Memória Vera Vargas (Museu)",
    lat: -24.2865,
    lng: -51.2270,
    attractions: ["Exposições Culturais", "Acervo Histórico", "Galeria de Fotos"]
  },
  {
    name: "Univale - Faculdade",
    lat: -24.2905,
    lng: -51.2230,
    attractions: ["Campus Universitário", "Biblioteca", "Clínicas de Saúde"]
  },
  {
    name: "IFPR - Campus Ivaiporã",
    lat: -24.2790,
    lng: -51.2405,
    attractions: ["Blocos Didáticos", "Laboratórios Técnicos", "Quadra Poliesportiva"]
  },
  {
    name: "Cafeteria Florenza",
    lat: -24.2890,
    lng: -51.2255,
    attractions: ["Cafés Especiais", "Pães Artesanais", "Tortas & Doces"]
  },
  {
    name: "Café do Urso",
    lat: -24.2882,
    lng: -51.2280,
    attractions: ["Cafés Gourmet", "Ambiente Temático", "Tortas Especiais"]
  },
  {
    name: "Igreja Matriz",
    lat: -24.2870,
    lng: -51.2240,
    attractions: ["Arquitetura Histórica", "Praça da Matriz", "Eventos Religiosos"]
  },
  {
    name: "Mirante da Serra",
    lat: -24.2700,
    lng: -51.2100,
    attractions: ["Vista Panorâmica", "Pôr do Sol", "Fotografia"]
  },
  {
    name: "Cachoeira do Rio Bom",
    lat: -24.3100,
    lng: -51.1900,
    attractions: ["Banho de Cachoeira", "Camping", "Trilha do Rio"]
  }
];

const ATTRACTION_PHOTOS = {
  "Lago de Santana": [
    "lago_santana.png"
  ],
  "Parque Ecológico de Ivaiporã": [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "Centro Cultural de Ivaiporã": [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "Casa da Memória Vera Vargas (Museu)": [
    "museu_ivaipora.png"
  ],
  "Univale - Faculdade": [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "IFPR - Campus Ivaiporã": [
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "Cafeteria Florenza": [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "Café do Urso": [
    "cafe_urso.png"
  ],
  "Praça Manoel Ribas": [
    "https://images.unsplash.com/photo-1476362174823-3a23f4aa6a77?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "Cachoeira do Rio Bom": [
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "Mirante da Serra": [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1434725039720-abb26e2b7848?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "Igreja Matriz São João Batista": [
    "https://images.unsplash.com/photo-1548625361-1adba4a28fad?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=800&h=500&q=80"
  ],
  "Feira do Produtor Rural": [
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1506484381205-f7945b68db56?auto=format&fit=crop&w=800&h=500&q=80"
  ]
};
;

function getAttractionPhotos(name) {
  const key = Object.keys(ATTRACTION_PHOTOS).find(
    k => k.toLowerCase().trim() === name.toLowerCase().trim()
  );
  if (key) return ATTRACTION_PHOTOS[key];
  return [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&h=500&q=80"
  ];
}

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
  try {
    return JSON.parse(raw);
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// ===== SPLASH SCREEN =====
function initSplash() {
  const splash = document.getElementById("splash-screen");
  if (!splash) return;

  // Hide splash after animation completes
  setTimeout(() => {
    splash.classList.add("hidden");
    setTimeout(() => { splash.style.display = "none"; }, 600);
  }, 3000);

  // Allow click to dismiss early
  splash.addEventListener("click", () => {
    splash.classList.add("hidden");
    setTimeout(() => { splash.style.display = "none"; }, 600);
  });
}

// ===== THEME =====
function applyTheme(theme) {
  const current = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", current);
  localStorage.setItem(THEME_KEY, current);

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  if (themeToggle) {
    if (current === "dark") {
      themeToggle.classList.add("toggled");
    } else {
      themeToggle.classList.remove("toggled");
    }
  }
  if (themeIcon) {
    themeIcon.textContent = current === "dark" ? "🌙" : "☀️";
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(saved);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
}

// ===== LANGUAGE =====
function initLanguage() {
  const saved = localStorage.getItem(LANG_KEY) || "pt";
  currentLang = saved;

  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    if (saved === "en") {
      langToggle.classList.add("toggled");
    }
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "pt" ? "en" : "pt";
      localStorage.setItem(LANG_KEY, currentLang);
      langToggle.classList.toggle("toggled");
      applyTranslations();
      renderHome();
    });
  }

  applyTranslations();
}

// ===== SETTINGS MODAL =====
function initSettings() {
  const btn = document.getElementById("settings-btn");
  const overlay = document.getElementById("settings-overlay");
  const closeBtn = document.getElementById("settings-close");
  const keyInput = document.getElementById("gmaps-key-input");
  const saveKeyBtn = document.getElementById("btn-save-key");

  if (!btn || !overlay) return;

  // Load saved API key
  if (keyInput) {
    keyInput.value = localStorage.getItem(MAPS_KEY) || "";
  }

  if (saveKeyBtn && keyInput) {
    saveKeyBtn.addEventListener("click", () => {
      updateMapsApiKey(keyInput.value);
    });
  }

  btn.addEventListener("click", () => {
    overlay.hidden = false;
    // Force reflow then add class for animation
    requestAnimationFrame(() => {
      overlay.classList.add("open");
    });
  });

  function closeSettings() {
    overlay.classList.remove("open");
    setTimeout(() => { overlay.hidden = true; }, 350);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeSettings);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeSettings();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeSettings();
  });
}

// ===== RENDER HOME =====
function renderHome() {
  const data = getData();
  const attrEl = document.getElementById("attractions");
  if (!attrEl) return;

  if (data.attractions.length === 0) {
    attrEl.innerHTML = `<li class="muted">${t("no_attractions")}</li>`;
    return;
  }

  attrEl.innerHTML = data.attractions.map((a) => {
    const photo = getAttractionPhotos(a.name)[0];
    const desc = currentLang === "en" && a.descEn ? a.descEn : a.desc;
    return `
      <li class="attraction-item" onclick="viewAttractionDetails('${escapeHtml(a.name)}')">
        <img class="attraction-photo" src="${escapeHtml(photo)}" alt="${t("photo_of")} ${escapeHtml(a.name)}" loading="lazy">
        <div>
          <strong class="attraction-name">${escapeHtml(a.name)}</strong>
          <p class="attraction-desc">${escapeHtml(desc)}</p>
          <span class="view-details-tag">${t("view_details")}</span>
        </div>
      </li>`;
  }).join("");
}

// ===== MAP =====
function renderMapDetails(point) {
  const panel = document.getElementById("map-details");
  if (!panel || !point) return;

  const photo = getAttractionPhotos(point.name)[0];
  const photoHtml = photo
    ? `<div class="map-details-image"><img class="map-details-photo" src="${escapeHtml(photo)}" alt="${t("photo_of")} ${escapeHtml(point.name)}" loading="lazy"></div>`
    : "";

  panel.innerHTML = `
    <h4>${escapeHtml(point.name)}</h4>
    ${photoHtml}
    <p class="muted">${t("map_points_label")}</p>
    <ul class="map-points-list">
      ${point.attractions.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

let mainGoogleMap = null;
let mainMarkers = [];

function triggerMapResize(mapObj) {
  if (mapObj && window.google && window.google.maps) {
    google.maps.event.trigger(mapObj, 'resize');
  }
}

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;
  if (window.__ivaiporaMap) return;

  loadGoogleMapsScript(
    // Success Callback (Google Maps JS API)
    () => {
      const center = { lat: -24.2878, lng: -51.2264 };
      
      const map = new google.maps.Map(mapEl, {
        center: center,
        zoom: 13,
        mapTypeId: 'roadmap',
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      });

      window.__ivaiporaMap = map;

      mainMarkers.forEach(m => m.setMap(null));
      mainMarkers = [];

      MAP_POINTS.forEach((point, index) => {
        const marker = new google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: map,
          title: point.name
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="color: #0f172a; padding: 4px;">
                      <b style="font-size: 0.95rem;">${escapeHtml(point.name)}</b>
                    </div>`
        });

        marker.addListener("click", () => {
          map.panTo(marker.getPosition());
          infoWindow.open(map, marker);
          renderMapDetails(point);
        });

        mainMarkers.push(marker);
      });

      renderMapDetails(MAP_POINTS[0]);
    },
    // Fallback Callback (Iframe)
    () => {
      mapEl.innerHTML = `<iframe 
        width="100%" 
        height="100%" 
        style="border:0; border-radius: var(--radius);" 
        loading="lazy" 
        allowfullscreen 
        src="https://maps.google.com/maps?q=-24.2878,-51.2264&z=13&output=embed">
      </iframe>`;
      renderMapDetails(MAP_POINTS[0]);
    }
  );
}

// ===== ATTRACTION DETAILS =====
let miniMapInstance = null;

function viewAttractionDetails(attractionName) {
  const data = getData();
  const attraction = data.attractions.find(
    a => a.name.toLowerCase() === attractionName.toLowerCase()
  );
  if (!attraction) return;

  const mapPoint = MAP_POINTS.find(
    p => p.name.toLowerCase() === attractionName.toLowerCase()
  ) || { lat: -24.2878, lng: -51.2264, attractions: [attraction.name] };

  document.getElementById("place-title").textContent = attraction.name;
  const desc = currentLang === "en" && attraction.descEn ? attraction.descEn : attraction.desc;
  document.getElementById("place-desc").textContent = desc;

  // Google Earth link
  const earthBtn = document.getElementById("btn-google-earth");
  if (earthBtn) {
    earthBtn.href = `https://earth.google.com/web/@${mapPoint.lat},${mapPoint.lng},650a,30y,0h,0t,0r`;
  }

  // Gallery
  const galleryEl = document.getElementById("place-gallery");
  const photos = getAttractionPhotos(attraction.name);
  galleryEl.innerHTML = photos
    .map((url, i) => `<img class="gallery-photo" src="${escapeHtml(url)}" alt="${t("photo_n")} ${i + 1} - ${escapeHtml(attraction.name)}" loading="lazy">`)
    .join("");

  // Attractions list
  const listEl = document.getElementById("mini-map-attractions");
  listEl.innerHTML = mapPoint.attractions
    .map(attr => `<li>${escapeHtml(attr)}</li>`)
    .join("");

  // Toggle sections
  document.getElementById("home-section").hidden = true;
  document.getElementById("place-section").hidden = false;

  // Init mini map with ESRI satellite tiles
  initMiniMap(mapPoint.lat, mapPoint.lng, attraction.name, mapPoint.attractions);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

let miniStreetViewInstance = null;
let miniMapMarkers = [];
let currentMiniMapPosition = null;

let miniMapUseIframe = false;

function initMiniMap(lat, lng, name, attractions) {
  const mapContainer = document.getElementById("mini-map");
  const streetViewContainer = document.getElementById("mini-streetview");
  if (!mapContainer) return;

  currentMiniMapPosition = { lat: lat, lng: lng };

  loadGoogleMapsScript(
    // Success Callback (Google Maps JS API)
    () => {
      miniMapUseIframe = false;
      
      // Clean old markers
      miniMapMarkers.forEach(m => m.setMap(null));
      miniMapMarkers = [];

      // Reset container styles for JS Map
      mapContainer.style.display = "block";
      streetViewContainer.style.display = "none";
      mapContainer.innerHTML = "";

      // Create Map
      miniMapInstance = new google.maps.Map(mapContainer, {
        center: currentMiniMapPosition,
        zoom: 15,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });

      // Create main marker
      const mainMarker = new google.maps.Marker({
        position: currentMiniMapPosition,
        map: miniMapInstance,
        title: name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="color: #0f172a; padding: 4px;">
                    <b>${escapeHtml(name)}</b><br>${t("center")}
                  </div>`
      });
      infoWindow.open(miniMapInstance, mainMarker);
      miniMapMarkers.push(mainMarker);

      // Offset markers for attractions
      const offsets = [
        { lat: 0.0006, lng: 0.0006 },
        { lat: -0.0006, lng: 0.0009 },
        { lat: -0.0008, lng: -0.0006 },
        { lat: 0.0005, lng: -0.0009 }
      ];

      attractions.forEach((attr, index) => {
        const offset = offsets[index % offsets.length];
        const attrPos = { lat: lat + offset.lat, lng: lng + offset.lng };

        const attrMarker = new google.maps.Marker({
          position: attrPos,
          map: miniMapInstance,
          title: attr,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });

        const attrInfoWindow = new google.maps.InfoWindow({
          content: `<div style="color: #0f172a; padding: 4px;">
                      <b>${escapeHtml(attr)}</b><br>${t("tourist_point")}
                    </div>`
        });

        attrMarker.addListener("click", () => {
          attrInfoWindow.open(miniMapInstance, attrMarker);
        });

        miniMapMarkers.push(attrMarker);
      });

      // Initialize Street View
      miniStreetViewInstance = new google.maps.StreetViewPanorama(streetViewContainer, {
        position: currentMiniMapPosition,
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
        visible: false
      });

      miniMapInstance.setStreetView(miniStreetViewInstance);

      // Set default tab as Map
      switchMiniMapTab("map");
    },
    // Fallback Callback (Iframes)
    () => {
      miniMapUseIframe = true;
      switchMiniMapTab("map");
    }
  );
}

function switchMiniMapTab(tabName) {
  const mapContainer = document.getElementById("mini-map");
  const streetViewContainer = document.getElementById("mini-streetview");
  const tabMap = document.getElementById("tab-map");
  const tabSat = document.getElementById("tab-satellite");
  const tabSV = document.getElementById("tab-streetview");

  if (!tabMap || !tabSat || !tabSV) return;

  // Reset classes
  tabMap.classList.remove("active");
  tabSat.classList.remove("active");
  tabSV.classList.remove("active");

  const lat = currentMiniMapPosition ? currentMiniMapPosition.lat : -24.2878;
  const lng = currentMiniMapPosition ? currentMiniMapPosition.lng : -51.2264;

  if (miniMapUseIframe) {
    // IFRAME MODE (Google Maps & Earth Embeds)
    if (tabName === "map") {
      tabMap.classList.add("active");
      mapContainer.style.display = "block";
      streetViewContainer.style.display = "none";
      mapContainer.innerHTML = `<iframe 
        width="100%" 
        height="100%" 
        style="border:0; border-radius: 0 0 var(--radius) var(--radius);" 
        loading="lazy" 
        allowfullscreen 
        src="https://maps.google.com/maps?q=${lat},${lng}&t=m&z=15&output=embed">
      </iframe>`;
    } else if (tabName === "satellite") {
      tabSat.classList.add("active");
      mapContainer.style.display = "block";
      streetViewContainer.style.display = "none";
      // Satellite/hybrid view represents Google Earth
      mapContainer.innerHTML = `<iframe 
        width="100%" 
        height="100%" 
        style="border:0; border-radius: 0 0 var(--radius) var(--radius);" 
        loading="lazy" 
        allowfullscreen 
        src="https://maps.google.com/maps?q=${lat},${lng}&t=k&z=15&output=embed">
      </iframe>`;
    } else if (tabName === "streetview") {
      tabSV.classList.add("active");
      mapContainer.style.display = "none";
      streetViewContainer.style.display = "block";
      streetViewContainer.innerHTML = `<iframe 
        width="100%" 
        height="100%" 
        style="border:0; border-radius: 0 0 var(--radius) var(--radius);" 
        loading="lazy" 
        allowfullscreen 
        src="https://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}&output=embed">
      </iframe>`;
    }
  } else {
    // JS API MODE
    if (tabName === "map") {
      tabMap.classList.add("active");
      mapContainer.style.display = "block";
      streetViewContainer.style.display = "none";
      if (miniMapInstance) {
        miniMapInstance.setMapTypeId('roadmap');
        triggerMapResize(miniMapInstance);
        if (currentMiniMapPosition) miniMapInstance.setCenter(currentMiniMapPosition);
      }
    } else if (tabName === "satellite") {
      tabSat.classList.add("active");
      mapContainer.style.display = "block";
      streetViewContainer.style.display = "none";
      if (miniMapInstance) {
        miniMapInstance.setMapTypeId('hybrid'); // Satellite + Labels
        miniMapInstance.setTilt(45);
        triggerMapResize(miniMapInstance);
        if (currentMiniMapPosition) miniMapInstance.setCenter(currentMiniMapPosition);
      }
    } else if (tabName === "streetview") {
      tabSV.classList.add("active");
      mapContainer.style.display = "none";
      streetViewContainer.style.display = "block";
      if (miniStreetViewInstance) {
        google.maps.event.trigger(miniStreetViewInstance, 'resize');
        if (currentMiniMapPosition) miniStreetViewInstance.setPosition(currentMiniMapPosition);
      }
    }
  }
}

function backToHome() {
  document.getElementById("place-section").hidden = true;
  document.getElementById("home-section").hidden = false;

  if (window.__ivaiporaMap) {
    triggerMapResize(window.__ivaiporaMap);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== SPA NAVIGATION =====
function showSection(name) {
  if (name === "home") {
    document.getElementById("place-section").hidden = true;
    document.getElementById("home-section").hidden = false;
    const welcome = document.getElementById("welcome-section");
    if (welcome) welcome.hidden = true;
    renderHome();
    if (window.__ivaiporaMap) {
      triggerMapResize(window.__ivaiporaMap);
    }
  }
}

// ===== INIT =====
document.getElementById("nav-home").addEventListener("click", () => showSection("home"));
document.getElementById("btn-back").addEventListener("click", backToHome);

const welcomeStartBtn = document.getElementById("btn-welcome-start");
if (welcomeStartBtn) {
  welcomeStartBtn.addEventListener("click", () => {
    document.getElementById("welcome-section").hidden = true;
    document.getElementById("home-section").hidden = false;
    if (window.__ivaiporaMap) {
      triggerMapResize(window.__ivaiporaMap);
    }
  });
}

// Add tab listeners
const tabMapBtn = document.getElementById("tab-map");
if (tabMapBtn) tabMapBtn.addEventListener("click", () => switchMiniMapTab("map"));

const tabSatBtn = document.getElementById("tab-satellite");
if (tabSatBtn) tabSatBtn.addEventListener("click", () => switchMiniMapTab("satellite"));

const tabSVBtn = document.getElementById("tab-streetview");
if (tabSVBtn) tabSVBtn.addEventListener("click", () => switchMiniMapTab("streetview"));

// Initialize data if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  saveData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
}

initSplash();
renderHome();
initMap();
initTheme();
initLanguage();
initSettings();
