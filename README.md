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

## 💻 Ejecución en Local (Con Backend Spring Boot & MongoDB Atlas)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/brianherna/FluxG.git
   cd FluxG
   ```

2. Ejecuta la aplicación con Maven:
   ```bash
   mvn spring-boot:run
   ```

3. Abre en tu navegador favorito:
   - **Inicio / Landing**: [http://localhost:8080](http://localhost:8080)
   - **Planes & Prototipos**: [http://localhost:8080/planes.html](http://localhost:8080/planes.html)
   - **Contacto / Háblanos de tu proyecto**: [http://localhost:8080/contacto.html](http://localhost:8080/contacto.html)
   - **Login**: [http://localhost:8080/login.html](http://localhost:8080/login.html)
   - **Registro**: [http://localhost:8080/crear-cuenta.html](http://localhost:8080/crear-cuenta.html)

---

## 🚀 Despliegue Fullstack en la Nube con Docker (Render / Railway)

Si además de la versión estática de GitHub Pages deseas que el backend Java Spring Boot esté en la nube conectado en vivo a MongoDB Atlas:

1. Entra a [render.com](https://render.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **New +** y selecciona **Web Service**.
3. Elige tu repositorio: `brianherna/FluxG`.
4. Render detectará automáticamente el archivo `Dockerfile` incluido en la raíz.
5. Haz clic en **Deploy Web Service**. Render te dará un enlace público oficial (ej. `https://fluxg.onrender.com`).

