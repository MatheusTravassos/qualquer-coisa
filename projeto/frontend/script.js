const STORAGE_KEY = "parana_app_v1";
const THEME_KEY = "parana_theme";

const DEFAULT_DATA = {
  cities: [
    {
      name: "Ivaiporã",
      info: "Destino acolhedor do Norte Pioneiro, com parques tranquilos, lago natural e cultura rural vibrante.",
    },
    { name: "Curitiba", info: "Capital do Paraná, parques e cultura rica." },
    { name: "Foz do Iguaçu", info: "Cataratas e usina de Itaipu." },
    {
      name: "Londrina",
      info: "Segunda maior cidade, industrializada e com universidades.",
    },
    {
      name: "Maringá",
      info: "Cidade com bom planejamento urbano e foco em educação.",
    },
    {
      name: "Ponta Grossa",
      info: "Importante polo industrial e educacional do sul paranaense.",
    },
    {
      name: "Cascavel",
      info: "Maior cidade do oeste do Paraná, região agrícola próspera.",
    },
    {
      name: "Apucarana",
      info: "Cidade dinâmica do interior, comércio e indústria textil.",
    },
    {
      name: "União da Vitória",
      info: "Histórica cidade no vale do Iguazu, turismo e natureza.",
    },
    {
      name: "Guarapuava",
      info: "Cidade de montanhas, cultura e natureza no centro-sul paranaense.",
    },
    { name: "Toledo", info: "Polo agroindustrial e cultura forte no oeste." },
    {
      name: "Paranavaí",
      info: "Cidade com forte tradição cafeeira e vida urbana ativa.",
    },
    {
      name: "Campo Mourão",
      info: "Destino de cultura, gastronomia e eventos no noroeste.",
    },
    {
      name: "Irati",
      info: "Conhecida pela tradição e pela paisagem de montanhas.",
    },
    {
      name: "Pato Branco",
      info: "Cidade acolhedora, comércio e eventos regionais.",
    },
    {
      name: "Francisco Beltrão",
      info: "Ponto de referência no sudoeste paranaense.",
    },
    {
      name: "Umuarama",
      info: "Cidade de importante atividade econômica e comércio.",
    },
  ],
  attractions: [
    {
      name: "Lago de Santana",
      desc: "Ótimo ponto para lazer e caminhadas à beira do lago em Ivaiporã.",
    },
    {
      name: "Parque Ecológico de Ivaiporã",
      desc: "Paisagens naturais e trilhas em área de preservação local.",
    },
    {
      name: "Centro Cultural de Ivaiporã",
      desc: "Eventos, feiras e gastronomia regional no coração da cidade.",
    },
    { name: "Parque Nacional do Iguaçu", desc: "Cataratas do Iguaçu." },
    {
      name: "Jardim Botânico de Curitiba",
      desc: "Estufa e jardins bem cuidados.",
    },
    {
      name: "Parque das Pedras",
      desc: "Espaço verde e mirante em Guarapuava.",
    },
    { name: "Museu do Café", desc: "História e cultura do café em Paranavaí." },
    { name: "Pedra do Índio", desc: "Paisagem e trilhas em Irati." },
    {
      name: "Parque do Lago",
      desc: "Lazer e contato com a natureza em Pato Branco.",
    },
    {
      name: "Parque da Cidade",
      desc: "Área de convivência em Francisco Beltrão.",
    },
  ],
};

const MAP_POINTS = [
  {
    name: "Curitiba",
    lat: -25.4284,
    lng: -49.2733,
    attractions: ["Jardim Botânico", "Ópera de Arame", "Parque Barigüi"],
  },
  {
    name: "Ivaiporã",
    lat: -24.2878,
    lng: -51.2264,
    attractions: [
      "Lago de Santana",
      "Parque Ecológico de Ivaiporã",
      "Centro Cultural de Ivaiporã",
    ],
  },
  {
    name: "Foz do Iguaçu",
    lat: -25.5167,
    lng: -54.5853,
    attractions: [
      "Cataratas do Iguaçu",
      "Parque das Aves",
      "Itaipu Binacional",
    ],
  },
  {
    name: "Ponta Grossa",
    lat: -25.095,
    lng: -50.1619,
    attractions: ["Vila Velha", "Pico do Paraná", "Centro Histórico"],
  },
  {
    name: "Londrina",
    lat: -23.3105,
    lng: -51.1621,
    attractions: ["Bosque dos Pássaros", "Parque do Ingá", "Centro Histórico"],
  },
  {
    name: "Maringá",
    lat: -23.4205,
    lng: -51.933,
    attractions: ["Parque do Ingá", "Ponte do Cristo", "Centro de Maringá"],
  },
  {
    name: "Cascavel",
    lat: -24.9555,
    lng: -53.4564,
    attractions: [
      "Parque Municipal da Lagoa",
      "Museu do Oeste",
      "Mercado Municipal",
    ],
  },
  {
    name: "Guarapuava",
    lat: -25.3904,
    lng: -51.4608,
    attractions: ["Parque das Pedras", "Centro Histórico", "Museu Regional"],
  },
  {
    name: "Toledo",
    lat: -24.7136,
    lng: -53.7415,
    attractions: ["Parque Municipal", "Ponte do Rio", "Centro Comercial"],
  },
  {
    name: "Paranavaí",
    lat: -23.0827,
    lng: -52.4659,
    attractions: ["Museu do Café", "Praça Central", "Parque do Povo"],
  },
  {
    name: "Campo Mourão",
    lat: -24.0465,
    lng: -52.3789,
    attractions: ["Parque do Povo", "Centro Histórico", "Lago Municipal"],
  },
  {
    name: "Irati",
    lat: -25.4686,
    lng: -50.6515,
    attractions: ["Pedra do Índio", "Cavernas", "Centro Histórico"],
  },
  {
    name: "Pato Branco",
    lat: -26.2296,
    lng: -52.6716,
    attractions: ["Parque do Lago", "Centro Histórico", "Praça da Matriz"],
  },
  {
    name: "Francisco Beltrão",
    lat: -26.0811,
    lng: -53.0553,
    attractions: ["Parque da Cidade", "Praça Central", "Museu Regional"],
  },
  {
    name: "Umuarama",
    lat: -23.7662,
    lng: -53.3252,
    attractions: ["Praça da Matriz", "Parque Municipal", "Centro"],
  },
  {
    name: "Telêmaco Borba",
    lat: -24.3192,
    lng: -50.617,
    attractions: ["Pedra do Caju", "Cachoeiras", "Centro Histórico"],
  },
];

const MAP_PHOTOS = {
  Curitiba: "https://source.unsplash.com/900x500/?curitiba-brazil",
  Ivaiporã: "https://source.unsplash.com/900x500/?ivaipora-brazil",
  "Foz do Iguaçu": "https://source.unsplash.com/900x500/?foz+do+iguacu",
  "Ponta Grossa": "https://source.unsplash.com/900x500/?ponta+grossa",
  Londrina: "https://source.unsplash.com/900x500/?londrina-brazil",
  Maringá: "https://source.unsplash.com/900x500/?maringa-brazil",
  Cascavel: "https://source.unsplash.com/900x500/?cascavel-brazil",
  Guarapuava: "https://source.unsplash.com/900x500/?guarapuava-brazil",
  Toledo: "https://source.unsplash.com/900x500/?toledo-brazil",
  Paranavaí: "https://source.unsplash.com/900x500/?paranavai-brazil",
  "Campo Mourão": "https://source.unsplash.com/900x500/?campo+mourao",
  Irati: "https://source.unsplash.com/900x500/?irati-brazil",
  "Pato Branco": "https://source.unsplash.com/900x500/?pato+branco",
  "Francisco Beltrão": "https://source.unsplash.com/900x500/?francisco+beltrao",
  Umuarama: "https://source.unsplash.com/900x500/?umuarama-brazil",
  "Telêmaco Borba": "https://source.unsplash.com/900x500/?telemaco+borba",
  Apucarana: "https://source.unsplash.com/900x500/?apucarana-brazil",
  "União da Vitória": "https://source.unsplash.com/900x500/?uniao+da+vitoria",
};

const EXTRA_TRAVEL_POINTS = [
  { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "Belo Horizonte", lat: -19.9167, lng: -43.9345 },
  { name: "Porto Alegre", lat: -30.0346, lng: -51.2177 },
  { name: "Florianópolis", lat: -27.5954, lng: -48.548 },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
  { name: "Montevideo", lat: -34.9011, lng: -56.1645 },
  { name: "Asunción", lat: -25.2637, lng: -57.5759 },
  { name: "Santiago", lat: -33.4489, lng: -70.6693 },
];

const TRAVEL_POINTS = [...MAP_POINTS, ...EXTRA_TRAVEL_POINTS];

function mergeUnique(items, defaults, key) {
  const map = new Map();
  [...defaults, ...items].forEach((item) => {
    const id = String(item[key] || "")
      .trim()
      .toLowerCase();
    if (id) map.set(id, item);
  });
  return [...map.values()];
}

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
  try {
    const parsed = JSON.parse(raw);
    return {
      cities: mergeUnique(parsed.cities || [], DEFAULT_DATA.cities, "name"),
      attractions: mergeUnique(
        parsed.attractions || [],
        DEFAULT_DATA.attractions,
        "name",
      ),
    };
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderHome() {
  const data = getData();
  const citiesEl = document.getElementById("cities");
  const attrEl = document.getElementById("attractions");
  citiesEl.innerHTML = data.cities.length
    ? data.cities
        .map((c) => {
          const photo =
            MAP_PHOTOS[c.name] ||
            `https://source.unsplash.com/900x500/?${encodeURIComponent(c.name)}`;
          return `<li class="city-item"><img class="city-photo" src="${escapeHtml(photo)}" alt="Foto de ${escapeHtml(c.name)}"><div><strong>${escapeHtml(c.name)}</strong> — ${escapeHtml(c.info)}</div></li>`;
        })
        .join("")
    : '<li class="muted">Nenhuma cidade cadastrada.</li>';
  attrEl.innerHTML = data.attractions.length
    ? data.attractions
        .map(
          (a) =>
            `<li><strong>${escapeHtml(a.name)}</strong> — ${escapeHtml(a.desc)}</li>`,
        )
        .join("")
    : '<li class="muted">Nenhuma atração cadastrada.</li>';
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function applyTheme(theme) {
  const current = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", current);
  localStorage.setItem(THEME_KEY, current);
  const toggle = document.getElementById("theme-toggle");
  if (toggle)
    toggle.textContent = current === "dark" ? "Tema: Escuro" : "Tema: Claro";
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved || "light");
  const toggle = document.getElementById("theme-toggle");
  if (toggle)
    toggle.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next);
    });
}

function renderMapDetails(point) {
  const panel = document.getElementById("map-details");
  if (!panel || !point) return;
  const photo = point.photo || MAP_PHOTOS[point.name];
  const photoHtml = photo
    ? `<div class="map-details-image"><img class="map-details-photo" src="${escapeHtml(photo)}" alt="Foto de ${escapeHtml(point.name)}"></div>`
    : "";
  panel.innerHTML = `
    <h4>${escapeHtml(point.name)}</h4>
    ${photoHtml}
    <p class="muted">Pontos turísticos principais desta região:</p>
    <ul class="map-points-list">
      ${point.attractions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  if (window.__paranaMap) return;

  const map = L.map("map", { zoomControl: true }).setView([-24.8, -51.5], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const markers = MAP_POINTS.map((point) =>
    L.marker([point.lat, point.lng]).addTo(map),
  );
  markers.forEach((marker, index) => {
    const point = MAP_POINTS[index];
    marker.on("click", () => {
      map.panTo([point.lat, point.lng]);
      renderMapDetails(point);
    });
  });

  renderMapDetails(MAP_POINTS[0]);
  window.__paranaMap = map;
}

// Simple SPA controls
const homeSection = document.getElementById("home-section");

document
  .getElementById("nav-home")
  .addEventListener("click", () => showSection("home"));

function showSection(name) {
  homeSection.hidden = false;
  renderHome();
}

// initialize sample data if empty (friendly first-time experience)
if (!localStorage.getItem(STORAGE_KEY)) {
  saveData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
}

renderHome();
initMap();
initTheme();
