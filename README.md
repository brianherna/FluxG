# FluxG - Monitoreo & Protección Eléctrica IoT

Plataforma web construida con **Spring Boot 3**, **MongoDB Atlas** y frontend moderno en **HTML5, CSS3, JavaScript y Bootstrap 5**.

## 🚀 Requisitos Previos

- Java 17 o superior
- Maven 3.8+
- Conexión a Internet (MongoDB Atlas)

## 🌐 Cómo activar GitHub Pages (2 Pasos)

La web ya está preparada para funcionar en **GitHub Pages** (con enlaces relativos y soporte interactivo total):

1. En tu repositorio de GitHub (`https://github.com/brianherna/FluxG`):
   - Ve a la pestaña **Settings** (Configuración) arriba a la derecha.
   - En el menú lateral izquierdo, haz clic en **Pages**.
2. En la sección **Build and deployment**:
   - **Source**: Selecciona `Deploy from a branch`
   - **Branch**: Selecciona `main` y en la carpeta elige `/docs`
   - Haz clic en **Save**.
3. ¡Listo! En 1 minuto tu sitio estará publicado y accesible en:
   👉 **https://brianherna.github.io/FluxG/**

*(Nota: También se incluyó un flujo de trabajo automático en `.github/workflows/deploy-pages.yml` por si prefieres seleccionar Source: "GitHub Actions").*

---

# ⚡ Fluxguard Corporation

> **Plataforma IoT de Telemetría Crítica y Analítica Predictiva para la Mitigación de Riesgos Eléctricos en Edificios Corporativos y Oficinas.**

*Energía Inteligente. Seguridad de Vanguardia.*

---

## 📌 Información General

* **Institución:** Instituto Tecnológico Superior del Occidente del Estado de Hidalgo (ITSOEH)
* **Carrera:** Ingeniería en Tecnologías de la Información y Comunicaciones (TICC's)
* **Fecha:** 25 de Agosto de 2026
* **Integrantes del Equipo:**
  * Maria Guadalupe Gress Ugarte
  * Irving Maldonado Olguin
  * Brayan Hernández Martinez
  * Alejandro Cruz Martinez

---

## 📋 Resumen Ejecutivo

**Fluxguard Corporation** es una plataforma integral de Internet de las Cosas (IoT) orientada a la supervisión continua, diagnóstico y mitigación de riesgos eléctricos en tableros de distribución de baja tensión para entornos corporativos, edificios comerciales y espacios de coworking.

En la infraestructura corporativa contemporánea, la continuidad del negocio depende de la estabilidad del suministro eléctrico. La elevada concentración de activos tecnológicos (servidores, nodos de telecomunicaciones, estaciones de trabajo) y sistemas HVAC genera sobrecargas térmicas y falsos contactos que constituyen las principales causas de incendios e interrupciones operativas.

Frente a las inspecciones termográficas manuales y periódicas, **Fluxguard Corporation** introduce un paradigma de **Mantenimiento Basado en Condición (CBM)** de alta disponibilidad mediante nodos de instrumentación no invasiva acoplados a un microcontrolador de borde (ESP32) que adquiere corriente eficaz (RMS) y gradientes térmicos en tiempo real.

---

## 🚨 Problema vs. Solución

### ❌ El Problema
1. **Falsos contactos y sobrecalentamiento:** Las variaciones de carga generan puntos calientes en barras colectoras que no se detectan a tiempo mediante revisiones manuales aisladas.
2. **Disparos imprevistos de interruptores:** La sobrecarga no detectada causa cortes repentinos que paralizan la operación, dañan equipos y provocan pérdida de información.
3. **Puntos ciegos de mantenimiento:** Las inspecciones termográficas tradicionales son costosas y se realizan con meses de diferencia entre sí.

### ✅ Nuestra Solución
Una red de nodos de adquisición no invasivos instalados en riel DIN (sensores de corriente de núcleo partido **SCT-013** y sensores digitales de temperatura **DS18B20**) conectados a un microcontrolador **ESP32**. 

El nodo transmite datos mediante un esquema híbrido con conmutación automática por falla (**Failover**) entre Wi-Fi, LoRa (915 MHz) y red celular (GPRS/LTE-M). Los datos se procesan en un servidor central con almacén **InfluxDB**, mostrando el estado del tablero en un dashboard interactivo en **Grafana / Node-RED**, enviando alertas críticas en tiempo real (< 3 segundos) y generando reportes automáticos de salud eléctrica.

---

## 💡 Propuesta de Valor

| Perfil | Necesidad | Propuesta de Fluxguard |
| :--- | :--- | :--- |
| **Facility Manager / Administrador** | Proteger infraestructura contra incendios y reducir costos correctivos. | Monitoreo térmico y de corriente 24/7 que reemplaza la dependencia de visitas manuales. |
| **Director de TI / Sistemas** | Garantizar que servidores, racks y estaciones de trabajo no pierdan energía. | Alertas inmediatas por sobrecalentamiento e historial de consumo por circuito para evitar caídas. |
| **Aseguradoras / Protección Civil** | Comprobar que la instalación opera bajo parámetros reglamentarios. | Bitácoras digitales e historial auditable alineados con la **NOM-001-SEDE-2012**. |

---

## 🏗️ Arquitectura Tecnológica

| Capa | Descripción |
| :--- | :--- |
| **Ingestión de datos** | Nodos ESP32 + Sensores de corriente SCT-013 + Sensores térmicos DS18B20. Transmisión cada 10s vía Wi-Fi local con respaldo automático vía LoRa o red celular. |
| **Procesamiento** | Validación de rangos operativos y evaluación en tiempo real de sobretemperaturas o sobrecargas progresivas antes del disparo electromecánico. |
| **Almacenamiento** | Base de datos de series temporales en **InfluxDB** (retención de 24 meses en la nube) para auditorías y análisis de tendencias. |
| **Acceso / Dashboard** | Panel integral en **Grafana / Node-RED**, alertas automáticas vía Telegram/SMS/WhatsApp y exportación de reportes. |
| **Redundancia (Failover)** | Conmutación del canal de comunicación en **menos de 3.1 segundos** en caso de caída de la red Wi-Fi o del suministro. |

---

## 📈 Análisis de Mercado

* **Mercado Potencial (TAM):** ~600 complejos corporativos y de servicios en la región.
* **Mercado Accesible (SAM):** ~180 edificios de oficinas y espacios de coworking medianos (> 3 niveles).
* **Mercado Objetivo Inicial (SOM):** 10 inmuebles corporativos en el primer año.

### Diferenciación Competitiva

* **vs. Termografía Manual:** Monitoreo continuo 365 días al año vs. inspecciones 1 o 2 veces al año.
* **vs. Analizadores Tradicionales:** Solución modular, económica y no invasiva con monitoreo térmico directo por punto.
* **vs. Sistemas BMS Genéricos:** Especialización en diagnóstico térmico-eléctrico predictivo y conectividad celular de respaldo.

---

## 💰 Modelo de Negocio (HaaS / SaaS)

* 🛠️ **Cuota única de instalación por tablero:** $12,000 – $25,000 MXN (según fases y puntos de medición).
* 💻 **Suscripción mensual SaaS por tablero:** $800 – $1,500 MXN/mes (plataforma en la nube, alertas e informes).
* 🔧 **Mantenimiento y recalibración (Add-on):** $2,500 MXN por visita semestral de revisión de nodos.
* 📄 **Módulo de reportes para seguros/auditorías:** $600 MXN/mes adicional por edificio.

---

## 🛡️ Normativa, Seguridad y Privacidad

> ⚠️ **Nota Regulatoria:** Plataforma de monitoreo no invasiva de diagnóstico preventivo. No altera los dispositivos de protección primaria (breakers) ni interviene en el diseño estructural de la instalación eléctrica.

* **Privacidad de datos:** No identifica personas. Solo recopila variables físicas de infraestructura (corriente en Amperios, temperatura en °C y estado del enlace).
* **Seguridad de datos:** Cifrado **MQTTS** sobre protocolo **TLS v1.3** desde el nodo hacia la nube. Acceso restringido por roles de usuario.
* **Normativa aplicable:**
  * **NOM-001-SEDE-2012:** Límites de temperatura en conductores, barras de distribución y terminales (Artículo 110-14).
  * **NOM-003-SCFI-2014:** Requisitos de seguridad para componentes electrónicos.
  * **IFT-008-2015:** Uso legal de bandas de radiofrecuencia de uso libre (2.4 GHz y 915 MHz).

---

## 🚀 Estrategia de Lanzamiento (Go-To-Market)

1. **Fase 1 (Piloto):** Validar precisión en 2 edificios locales (kit gratuito a cambio de retroalimentación y caso de éxito).
2. **Fase 2 (Expansión Regional):** Cobertura de 10 edificios mediante alianzas con empresas de *Facility Management* y mantenimiento.
3. **Fase 3 (Escalamiento):** Escalar a centros comerciales, sector bancario e integración de **TinyML** en el nodo.

---

## ⚠️ Gestión de Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
| :--- | :---: | :---: | :--- |
| Pérdida de conectividad Wi-Fi corporativa | Media | Alto | Módem celular M2M y LoRa integrado con conmutación automática (Failover). |
| Falla/degradación de sensores por ambiente | Media | Medio | Encapsulado del nodo con protección IP65 e inspección en visitas semestrales. |
| Rechazo por parte del personal técnico | Media | Alto | Diseño de instalación 100% no invasiva (núcleo partido) sin cortar la energía. |
| Vulnerabilidad o ciberataques a la red | Baja | Alto | Aislamiento del nodo en una VLAN independiente y cifrado TLS v1.3. |

