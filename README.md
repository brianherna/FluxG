# FluxG - Monitoreo & Protección Eléctrica IoT

Plataforma web construida con **Spring Boot 3**, **MongoDB Atlas** y frontend moderno en **HTML5, CSS3, JavaScript y Bootstrap 5**.

## 🚀 Requisitos Previos

- Java 17 o superior
- Maven 3.8+
- Conexión a Internet (MongoDB Atlas)

## 💻 Ejecución en Local

1. Clona el repositorio si aún no lo has hecho:
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

## 🌐 Cómo desplegarlo en la Nube GRATIS (Render / Railway)

Dado que FluxG utiliza un backend en **Spring Boot (Java)** conectado a **MongoDB Atlas**, no se puede alojar en GitHub Pages (ya que Pages no ejecuta Java).

La forma más rápida y 100% gratuita de tenerlo público en Internet es mediante **Render**:

1. Entra a [render.com](https://render.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **New +** y selecciona **Web Service**.
3. Elige tu repositorio: `brianherna/FluxG`.
4. Render detectará automáticamente el archivo `Dockerfile`:
   - **Environment**: `Docker`
   - **Plan**: `Free`
5. Haz clic en **Deploy Web Service**.
6. En unos minutos tendrás tu enlace público oficial (ej. `https://fluxg.onrender.com`) accesible desde cualquier dispositivo.

