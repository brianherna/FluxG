/**
 * FluxGuard - Frontend Principal
 * Bootstrap 5 + Conexión a MongoDB Atlas API
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }
  initNavbarAuth();
  initHeroPromos();
  initMap();
  initContactForm();
  initAuthForms();
});

// ==========================================
// 1. SESIÓN Y ESTADO EN NAVBAR
// ==========================================
function initNavbarAuth() {
  const usuarioRaw = localStorage.getItem("usuario");
  const authContainer = document.getElementById("navbar-auth-action");

  if (!authContainer) return;

  if (usuarioRaw) {
    try {
      const usuario = JSON.parse(usuarioRaw);
      authContainer.innerHTML = `
        <div class="dropdown">
          <button class="btn-flux-outline dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <i class="bi bi-person-circle me-1"></i> ${usuario.nombre || "Usuario"}
          </button>
          <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
            <li><h6 class="dropdown-header text-uppercase text-secondary" style="font-size:10px;">${usuario.correo}</h6></li>
            <li><a class="dropdown-item" href="/planes.html"><i class="bi bi-grid me-2"></i>Planes</a></li>
            <li><a class="dropdown-item" href="/contacto.html"><i class="bi bi-chat-left-dots me-2"></i>Contacto</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item text-danger" id="btn-logout"><i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión</button></li>
          </ul>
        </div>
      `;

      document.getElementById("btn-logout")?.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.reload();
      });
    } catch (e) {
      localStorage.removeItem("usuario");
    }
  }
}

// ==========================================
// 2. HERO PROMOS Y SIMULACIÓN DE MÉTRICAS
// ==========================================
const heroPromos = [
  {
    eyebrow: "FLUXGUARD / MONITOREO INTELIGENTE",
    title: "DATOS QUE SE<br><span class='accent'>CONVIERTEN EN</span><br>DECISIONES.",
    desc: "Visualiza el comportamiento de tu infraestructura y detecta lo importante antes de que se convierta en un problema."
  },
  {
    eyebrow: "FLUXGUARD / INFORMACIÓN EN TIEMPO REAL",
    title: "TODO EL SISTEMA.<br><span class='accent'>EN UNA SOLA</span><br>VISTA.",
    desc: "Centraliza indicadores, actividad y alertas en una plataforma pensada para consultar información de forma rápida."
  },
  {
    eyebrow: "FLUXGUARD / CONTROL Y ANÁLISIS",
    title: "ENTIENDE LO QUE<br><span class='accent'>ESTÁ PASANDO.</span><br>ACTÚA A TIEMPO.",
    desc: "Convierte los datos recopilados por IoT en información clara para supervisar y mejorar tu infraestructura."
  }
];

function initHeroPromos() {
  const eyebrowEl = document.getElementById("hero-eyebrow");
  const titleEl = document.getElementById("hero-title");
  const descEl = document.getElementById("hero-desc");
  const counterEl = document.getElementById("hero-counter");
  const dots = document.querySelectorAll(".hero-dot");

  if (!eyebrowEl || !titleEl || !descEl) return;

  let activeIndex = 0;
  let timer = null;

  function updateHero(index) {
    activeIndex = index;
    const promo = heroPromos[index];
    eyebrowEl.innerHTML = `<span class="status-dot"></span> ${promo.eyebrow}`;
    titleEl.innerHTML = promo.title;
    descEl.textContent = promo.desc;
    if (counterEl) counterEl.textContent = `0${index + 1} / 0${heroPromos.length}`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
      dot.style.background = idx === index ? "var(--gold)" : "#555";
      dot.style.width = idx === index ? "45px" : "25px";
    });
  }

  function startTimer() {
    timer = setInterval(() => {
      updateHero((activeIndex + 1) % heroPromos.length);
    }, 6500);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      clearInterval(timer);
      updateHero(idx);
      startTimer();
    });
  });

  updateHero(0);
  startTimer();

  // Simulación dinámica de métricas en la tarjeta del Hero
  const metricV = document.getElementById("metric-voltage");
  const metricA = document.getElementById("metric-current");
  const metricW = document.getElementById("metric-power");

  if (metricV && metricA && metricW) {
    setInterval(() => {
      const v = (127.0 + (Math.random() * 1.8 - 0.9)).toFixed(1);
      const a = (8.5 + (Math.random() * 0.4 - 0.2)).toFixed(2);
      const w = ((v * a) / 1000).toFixed(2);
      metricV.textContent = `${v} V`;
      metricA.textContent = `${a} A`;
      metricW.textContent = `${w} kW`;
    }, 2800);
  }
}

// ==========================================
// 3. MAPA INTERACTIVO (LEAFLET + OSM)
// ==========================================
function initMap() {
  const mapContainer = document.getElementById("map");
  if (!mapContainer || typeof L === "undefined") return;

  const destination = [20.204881, -99.220931]; // ITSOEH / Mixquiahuala
  const map = L.map("map", {
    center: destination,
    zoom: 14,
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const customIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background:#b9a7ff;color:#0b0815;padding:4px 10px;border-radius:20px;font-weight:800;font-size:11px;border:2px solid #fff;box-shadow:0 0 15px rgba(185,167,255,0.8);white-space:nowrap;"><i class="bi bi-geo-alt-fill"></i> FLUXGUARD</div>`,
    iconSize: [110, 30],
    iconAnchor: [55, 15]
  });

  L.marker(destination, { icon: customIcon }).addTo(map)
    .bindPopup("<b>FluxGuard</b><br>Paseo del Agrarismo 2000, Mixquiahuala de Juárez, Hidalgo.")
    .openPopup();

  // Botón para geolocalizar al usuario
  const btnLocate = document.getElementById("btn-map-locate");
  const statusEl = document.getElementById("map-route-status");

  if (btnLocate) {
    btnLocate.addEventListener("click", () => {
      if (!navigator.geolocation) {
        if (statusEl) statusEl.textContent = "Geolocalización no soportada en tu navegador.";
        return;
      }
      btnLocate.disabled = true;
      btnLocate.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Calculando...`;
      if (statusEl) statusEl.textContent = "Obteniendo tu ubicación actual...";

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const userIcon = L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background:#22c55e;color:#fff;padding:3px 8px;border-radius:14px;font-weight:700;font-size:10px;box-shadow:0 0 10px rgba(34,197,94,0.6);">TÚ</div>`,
            iconSize: [40, 24],
            iconAnchor: [20, 12]
          });

          L.marker([userLat, userLng], { icon: userIcon }).addTo(map);

          try {
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${destination[1]},${destination[0]}?overview=full&geometries=geojson`;
            const resp = await fetch(osrmUrl);
            const data = await resp.json();

            if (data.routes && data.routes[0]) {
              const route = data.routes[0];
              const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
              const polyline = L.polyline(coords, { color: '#b9a7ff', weight: 5, opacity: 0.9 }).addTo(map);
              map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

              const km = (route.distance / 1000).toFixed(1);
              const min = Math.round(route.duration / 60);
              if (statusEl) statusEl.textContent = `Ruta calculada: ~${km} km (${min} min en auto).`;
            }
          } catch (err) {
            map.setView([userLat, userLng], 12);
            if (statusEl) statusEl.textContent = "Ubicación obtenida. (No se pudo trazar la línea de ruta en línea).";
          } finally {
            btnLocate.disabled = false;
            btnLocate.innerHTML = `<i class="bi bi-geo-alt me-1"></i> USAR MI UBICACIÓN`;
          }
        },
        () => {
          btnLocate.disabled = false;
          btnLocate.innerHTML = `<i class="bi bi-geo-alt me-1"></i> USAR MI UBICACIÓN`;
          if (statusEl) statusEl.textContent = "Permiso denegado para acceder a la ubicación.";
        }
      );
    });
  }
}

// ==========================================
// 4. FORMULARIO DE PROSPECTO / CONTACTO (MONGODB)
// ==========================================
function initContactForm() {
  const form = document.getElementById("prospect-form");
  if (!form) return;

  const alertBox = document.getElementById("prospect-alert");
  const submitBtn = document.getElementById("btn-submit-prospect");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const acepta = document.getElementById("prospect-acepta")?.checked;
    if (!acepta) {
      showAlert(alertBox, "danger", "Debes aceptar que FluxGuard utilice tus datos para ponerse en contacto contigo.");
      return;
    }

    const payload = {
      nombre: document.getElementById("prospect-nombre")?.value.trim(),
      apellido: document.getElementById("prospect-apellido")?.value.trim(),
      correo: document.getElementById("prospect-correo")?.value.trim(),
      telefono: document.getElementById("prospect-telefono")?.value.trim(),
      empresa: document.getElementById("prospect-empresa")?.value.trim(),
      cargo: document.getElementById("prospect-cargo")?.value.trim(),
      sector: document.getElementById("prospect-sector")?.value,
      interes: document.getElementById("prospect-interes")?.value,
      mensaje: document.getElementById("prospect-mensaje")?.value.trim()
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Enviando a MongoDB...`;

    try {
      const response = await fetch("/api/prospectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showAlert(alertBox, "success", data.message || "¡Gracias! Hemos registrado tus datos en MongoDB Atlas y nos pondremos en contacto pronto.");
        form.reset();
      } else {
        showAlert(alertBox, "danger", data.message || "No se pudieron registrar tus datos.");
      }
    } catch (err) {
      showAlert(alertBox, "danger", "Error de conexión con el servidor. Verifica que Spring Boot esté activo.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Quiero conocer FluxGuard <i class="bi bi-send-fill ms-2"></i>`;
    }
  });
}

// ==========================================
// 5. AUTENTICACIÓN (LOGIN Y REGISTRO)
// ==========================================
function initAuthForms() {
  // Login Form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    const loginAlert = document.getElementById("login-alert");
    const loginBtn = document.getElementById("btn-login-submit");

    // Revisar si viene de crear cuenta
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("creada") === "1") {
      showAlert(loginAlert, "success", "Cuenta creada exitosamente en MongoDB. Ahora inicia sesión.");
    }

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email")?.value.trim();
      const password = document.getElementById("login-password")?.value;

      loginBtn.disabled = true;
      loginBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Verificando...`;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          window.location.href = "/";
        } else {
          showAlert(loginAlert, "danger", data.message || "Correo o contraseña incorrectos.");
        }
      } catch (err) {
        showAlert(loginAlert, "danger", "No se pudo conectar con el servidor.");
      } finally {
        loginBtn.disabled = false;
        loginBtn.innerHTML = `ENTRAR A FLUXGUARD <i class="bi bi-arrow-up-right ms-2"></i>`;
      }
    });
  }

  // Register Form
  const registerForm = document.getElementById("create-account-form");
  if (registerForm) {
    const registerAlert = document.getElementById("register-alert");
    const registerBtn = document.getElementById("btn-register-submit");

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = document.getElementById("reg-nombre")?.value.trim();
      const apellido = document.getElementById("reg-apellido")?.value.trim();
      const email = document.getElementById("reg-email")?.value.trim();
      const password = document.getElementById("reg-password")?.value;
      const confirm = document.getElementById("reg-confirm")?.value;

      if (password !== confirm) {
        showAlert(registerAlert, "danger", "Las contraseñas no coinciden.");
        return;
      }

      if (password.length < 8) {
        showAlert(registerAlert, "danger", "La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      registerBtn.disabled = true;
      registerBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Creando cuenta en MongoDB...`;

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, apellido, email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          window.location.href = "/login.html?creada=1";
        } else {
          showAlert(registerAlert, "danger", data.message || "Error al crear la cuenta.");
        }
      } catch (err) {
        showAlert(registerAlert, "danger", "No se pudo conectar con el servidor.");
      } finally {
        registerBtn.disabled = false;
        registerBtn.innerHTML = `CREAR MI CUENTA <i class="bi bi-arrow-up-right ms-2"></i>`;
      }
    });
  }

  // Toggle Password Visibility
  document.querySelectorAll(".password-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const inputId = btn.getAttribute("data-target");
      const input = document.getElementById(inputId);
      const icon = btn.querySelector("i");
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        icon.className = "bi bi-eye-slash";
      } else {
        input.type = "password";
        icon.className = "bi bi-eye";
      }
    });
  });
}

function showAlert(container, type, message) {
  if (!container) return;
  container.className = `alert alert-${type} py-2 px-3 mb-3 border-0`;
  container.style.fontSize = "13px";
  container.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i> ${message}`;
  container.classList.remove("d-none");
}
