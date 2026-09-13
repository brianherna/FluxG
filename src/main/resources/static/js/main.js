/**
 * FluxGuard - Frontend principal
 * Navegación, UI, mapa, autenticación y formularios.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initNavbarAuth();
  initHeroPromos();
  initPlatformCarousel();
  initBackToTop();
  initMap();
  initContactForm();
  initAuthForms();
});

function initNavbar() {
  const toggle = document.getElementById("navbarToggle");
  const menu = document.getElementById("navbarMenu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    const icon = toggle.querySelector("i");
    if (icon) icon.className = open ? "bi bi-x fs-4" : "bi bi-list fs-4";
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    const icon = toggle.querySelector("i");
    if (icon) icon.className = "bi bi-list fs-4";
  }));
  document.addEventListener("click", event => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      const icon = toggle.querySelector("i");
      if (icon) icon.className = "bi bi-list fs-4";
    }
  });
}

function initNavbarAuth() {
  const raw = localStorage.getItem("usuario");
  const container = document.getElementById("navbar-auth-action");
  if (!container || !raw) return;
  try {
    const usuario = JSON.parse(raw);
    const nombre = escapeHtml(usuario.nombre || "Usuario");
    const correo = escapeHtml(usuario.correo || "");
    container.innerHTML = `
      <div class="dropdown">
        <button class="btn-flux-outline dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-person-circle"></i> ${nombre}
        </button>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
          <li><h6 class="dropdown-header">${correo}</h6></li>
          <li><a class="dropdown-item" href="/planes.html"><i class="bi bi-grid me-2"></i>Planes</a></li>
          <li><a class="dropdown-item" href="/contacto.html"><i class="bi bi-chat-left-dots me-2"></i>Contacto</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item text-danger" id="btn-logout"><i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión</button></li>
        </ul>
      </div>`;
    document.getElementById("btn-logout")?.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      window.location.href = "/";
    });
  } catch {
    localStorage.removeItem("usuario");
  }
}

const heroPromos = [
  { eyebrow: "FLUXGUARD / MONITOREO INTELIGENTE", title: "DATOS QUE SE<br><span class='accent-line'>CONVIERTEN EN</span><br>DECISIONES.", desc: "Visualiza el comportamiento de tu infraestructura y detecta lo importante antes de que se convierta en un problema." },
  { eyebrow: "FLUXGUARD / INFORMACIÓN EN TIEMPO REAL", title: "TODO EL SISTEMA.<br><span class='accent-line'>EN UNA SOLA</span><br>VISTA.", desc: "Centraliza indicadores, actividad y alertas en una plataforma pensada para consultar información de forma rápida." },
  { eyebrow: "FLUXGUARD / CONTROL Y ANÁLISIS", title: "ENTIENDE LO QUE<br><span class='accent-line'>ESTÁ PASANDO.</span><br>ACTÚA A TIEMPO.", desc: "Convierte los datos recopilados por IoT en información clara para supervisar y mejorar tu infraestructura." }
];

function initHeroPromos() {
  const eyebrow = document.getElementById("hero-eyebrow");
  const title = document.getElementById("hero-title");
  const desc = document.getElementById("hero-desc");
  const counter = document.getElementById("hero-counter");
  const dots = [...document.querySelectorAll(".hero-dot")];
  const pause = document.getElementById("btn-hero-pause");
  if (!eyebrow || !title || !desc) return;
  let index = 0, timer = null, paused = false;
  const render = next => {
    index = (next + heroPromos.length) % heroPromos.length;
    const promo = heroPromos[index];
    eyebrow.innerHTML = `<span class="status-dot"></span>${promo.eyebrow}`;
    title.innerHTML = promo.title;
    desc.textContent = promo.desc;
    if (counter) counter.textContent = `0${index + 1} / 0${heroPromos.length}`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  };
  const start = () => {
    clearInterval(timer);
    if (!paused) timer = setInterval(() => render(index + 1), 6500);
  };
  dots.forEach((dot, i) => dot.addEventListener("click", () => { render(i); start(); }));
  pause?.addEventListener("click", () => {
    paused = !paused;
    const icon = pause.querySelector("i");
    if (icon) icon.className = paused ? "bi bi-play-fill" : "bi bi-pause-fill";
    start();
  });
  render(0); start();
  const metricV = document.getElementById("metric-voltage");
  const metricA = document.getElementById("metric-current");
  const metricW = document.getElementById("metric-power");
  if (metricV && metricA && metricW) setInterval(() => {
    const v = (127 + Math.random() * 1.8 - .9).toFixed(1);
    const a = (8.5 + Math.random() * .4 - .2).toFixed(2);
    const w = ((Number(v) * Number(a)) / 1000).toFixed(2);
    metricV.textContent = `${v} V`; metricA.textContent = `${a} A`; metricW.textContent = `${w} kW`;
  }, 2800);
}

function initPlatformCarousel() {
  const track = document.getElementById("platformCarouselTrack");
  const prev = document.getElementById("btn-platform-prev");
  const next = document.getElementById("btn-platform-next");
  const counter = document.getElementById("platform-counter");
  const dots = [...document.querySelectorAll("#platform-dots button")];
  const wrapper = document.getElementById("platformCarouselWrapper");
  if (!track || !dots.length) return;
  let index = 0;
  let timer = null;
  const total = dots.length;
  const render = nextIndex => {
    index = (nextIndex + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    if (counter) counter.textContent = `0${index + 1} / 0${total}`;
  };
  const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => render(index + 1), 6500);
  };
  prev?.addEventListener("click", () => { render(index - 1); startTimer(); });
  next?.addEventListener("click", () => { render(index + 1); startTimer(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { render(i); startTimer(); }));
  wrapper?.addEventListener("mouseenter", () => clearInterval(timer));
  wrapper?.addEventListener("mouseleave", () => startTimer());
  render(0);
  startTimer();
}

function initBackToTop() {
  const button = document.getElementById("btn-back-to-top");
  if (!button) return;
  const update = () => button.classList.toggle("visible", window.scrollY > 650);
  window.addEventListener("scroll", update, { passive: true });
  button.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  update();
}

function initMap() {
  const container = document.getElementById("map");
  if (!container || typeof L === "undefined") return;
  const destination = [20.204881, -99.220931];
  const map = L.map(container, { center: destination, zoom: 14, scrollWheelZoom: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap contributors" }).addTo(map);
  const fluxIcon = L.divIcon({ className: "custom-div-icon", html: `<div style="background:#b9a7ff;color:#100b19;padding:5px 10px;border-radius:999px;font-weight:900;font-size:10px;box-shadow:0 0 18px rgba(185,167,255,.7);white-space:nowrap">FLUXGUARD</div>`, iconSize: [110, 30], iconAnchor: [55, 15] });
  L.marker(destination, { icon: fluxIcon }).addTo(map).bindPopup("<b>FluxGuard</b><br>Mixquiahuala de Juárez, Hidalgo.");
  const locate = document.getElementById("btn-map-locate");
  const status = document.getElementById("map-route-status");
  const distanceEl = document.getElementById("route-distance-val");
  const durationEl = document.getElementById("route-duration-val");
  document.getElementById("btn-reset-map")?.addEventListener("click", () => map.setView(destination, 14));
  locate?.addEventListener("click", () => {
    if (!navigator.geolocation) { if (status) status.textContent = "Tu navegador no permite geolocalización."; return; }
    locate.disabled = true; locate.innerHTML = `<span class="spinner-border spinner-border-sm"></span> CALCULANDO...`;
    if (status) status.textContent = "Obteniendo tu ubicación...";
    navigator.geolocation.getCurrentPosition(async position => {
      const user = [position.coords.latitude, position.coords.longitude];
      const userIcon = L.divIcon({ className: "custom-div-icon", html: `<div style="background:#58e0a0;color:#07110d;padding:4px 8px;border-radius:999px;font-weight:900;font-size:9px;box-shadow:0 0 14px rgba(88,224,160,.6)">TÚ</div>`, iconSize: [35, 24], iconAnchor: [17, 12] });
      L.marker(user, { icon: userIcon }).addTo(map);
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${user[1]},${user[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`;
        const response = await fetch(url); const data = await response.json(); const route = data.routes?.[0];
        if (!route) throw new Error("Ruta no encontrada");
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
        const line = L.polyline(coords, { color: "#b9a7ff", weight: 5, opacity: .9 }).addTo(map);
        map.fitBounds(line.getBounds(), { padding: [35, 35] });
        if (distanceEl) distanceEl.textContent = `${(route.distance / 1000).toFixed(1)} km`;
        if (durationEl) durationEl.textContent = `${Math.max(1, Math.round(route.duration / 60))} min`;
        if (status) status.textContent = "Ruta calculada correctamente desde tu ubicación.";
      } catch {
        map.setView(user, 12);
        if (status) status.textContent = "Ubicación obtenida, pero no fue posible calcular la ruta en línea.";
      } finally {
        locate.disabled = false; locate.innerHTML = `<i class="bi bi-crosshair"></i> USAR MI UBICACIÓN`;
      }
    }, () => {
      locate.disabled = false; locate.innerHTML = `<i class="bi bi-crosshair"></i> USAR MI UBICACIÓN`;
      if (status) status.textContent = "No se concedió permiso para usar tu ubicación.";
    }, { enableHighAccuracy: true, timeout: 10000 });
  });
}

function initContactForm() {
  const form = document.getElementById("prospect-form");
  if (!form) return;
  const alertBox = document.getElementById("prospect-alert"); const button = document.getElementById("btn-submit-prospect");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!document.getElementById("prospect-acepta")?.checked) return showAlert(alertBox, "danger", "Debes aceptar el uso de tus datos para continuar.");
    const value = id => document.getElementById(id)?.value.trim() || "";
    const payload = { nombre:value("prospect-nombre"), apellido:value("prospect-apellido"), correo:value("prospect-correo"), telefono:value("prospect-telefono"), empresa:value("prospect-empresa"), cargo:value("prospect-cargo"), sector:document.getElementById("prospect-sector")?.value || "", interes:document.getElementById("prospect-interes")?.value || "", mensaje:value("prospect-mensaje") };
    if (button) { button.disabled = true; button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> ENVIANDO...`; }
    try {
      const response = await fetch("/api/prospectos", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
      const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message || "No se pudo registrar la información.");
      showAlert(alertBox, "success", data.message || "Información registrada correctamente en MongoDB Atlas."); form.reset();
    } catch (error) { showAlert(alertBox, "danger", error.message || "No se pudo conectar con el servidor."); }
    finally { if (button) { button.disabled = false; button.innerHTML = `Quiero conocer FluxGuard <i class="bi bi-send-fill ms-2"></i>`; } }
  });
}

function initAuthForms() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    const alertBox = document.getElementById("login-alert"); const button = document.getElementById("btn-login-submit");
    if (new URLSearchParams(location.search).get("creada") === "1") showAlert(alertBox, "success", "Cuenta creada correctamente. Ahora inicia sesión.");
    loginForm.addEventListener("submit", async event => {
      event.preventDefault(); const email = document.getElementById("login-email")?.value.trim() || ""; const password = document.getElementById("login-password")?.value || "";
      if (button) { button.disabled = true; button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> VERIFICANDO...`; }
      try {
        const response = await fetch("/api/auth/login", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email,password}) });
        const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message || "Correo o contraseña incorrectos.");
        localStorage.setItem("usuario", JSON.stringify(data.usuario)); location.href = "/";
      } catch (error) { showAlert(alertBox, "danger", error.message || "No se pudo conectar con el servidor."); }
      finally { if (button) { button.disabled = false; button.innerHTML = `ENTRAR A FLUXGUARD <i class="bi bi-arrow-up-right ms-2"></i>`; } }
    });
  }
  const registerForm = document.getElementById("create-account-form");
  if (registerForm) {
    const alertBox = document.getElementById("register-alert"); const button = document.getElementById("btn-register-submit");
    registerForm.addEventListener("submit", async event => {
      event.preventDefault(); const get = id => document.getElementById(id)?.value.trim() || ""; const password = document.getElementById("reg-password")?.value || ""; const confirm = document.getElementById("reg-confirm")?.value || "";
      if (password !== confirm) return showAlert(alertBox, "danger", "Las contraseñas no coinciden.");
      if (password.length < 8) return showAlert(alertBox, "danger", "La contraseña debe tener al menos 8 caracteres.");
      if (button) { button.disabled = true; button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> CREANDO CUENTA...`; }
      try {
        const response = await fetch("/api/auth/register", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({nombre:get("reg-nombre"),apellido:get("reg-apellido"),email:get("reg-email"),password}) });
        const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message || "No se pudo crear la cuenta."); location.href = "/login.html?creada=1";
      } catch (error) { showAlert(alertBox, "danger", error.message || "No se pudo conectar con el servidor."); }
      finally { if (button) { button.disabled = false; button.innerHTML = `CREAR MI CUENTA <i class="bi bi-arrow-up-right ms-2"></i>`; } }
    });
  }
  document.querySelectorAll(".password-toggle-btn").forEach(button => button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target); const icon = button.querySelector("i"); if (!input) return;
    input.type = input.type === "password" ? "text" : "password"; if (icon) icon.className = input.type === "password" ? "bi bi-eye" : "bi bi-eye-slash";
  }));
}

function showAlert(container, type, message) {
  if (!container) return;
  container.className = `alert alert-${type} py-2 px-3 mb-3 border-0`;
  container.style.fontSize = "13px";
  container.innerHTML = `<i class="bi ${type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"} me-2"></i>${escapeHtml(message)}`;
  container.classList.remove("d-none");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>\'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
}
