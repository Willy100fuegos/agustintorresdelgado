<div align="center">

# 🍊 Agustín Torres Delgado | Sitio Web Oficial

<p align="center">
  <img src="https://res.cloudinary.com/dt7otpfmm/image/upload/v1771395238/logoatd_hihcav.png" alt="Logo Agustín Torres Delgado" width="130" />
</p>

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-FFA500?style=for-the-badge)](LICENSE)

<br/>

<p align="center">
  <strong>Plataforma web oficial de Agustín Torres Delgado</strong><br/>
  Secretario General de Acuerdos de Movimiento Ciudadano.<br/>
  <em>Construyendo un futuro de causas, justicia y alegría para Coatzacoalcos, Veracruz y México.</em>
</p>

---

<p align="center">
  <img src="https://res.cloudinary.com/dt7otpfmm/image/upload/v1771397834/acercade_a6634o.png" alt="Agustín Torres Delgado" width="700" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</p>

</div>

---

## 🌟 Características Principales

- ⚡ **Rendimiento Ultrarrápido:** Arquitectura Single Page Application (SPA) potenciada por Vite 7 y React 19.
- 🎨 **Diseño Moderno & Responsivo:** Interfaz diseñada con Tailwind CSS, adaptada para móviles, tabletas y monitores 4K con paleta institucional en tonos oscuros y acentos naranja.
- 🏛️ **Secciones Informativas Dinámicas:**
  - **Inicio:** Presentación de identidad y causas.
  - **Acerca de:** Trayectoria académica, política y vocación de servicio.
  - **Causas & Juntos:** Pilares de trabajo social y participación ciudadana.
  - **Noticias & Comunicados:** Cobertura de prensa y boletines de prensa con enrutamiento dinámico.
  - **Galería:** Registro fotográfico de giras y actividades de territorio.
  - **Opinión:** Artículos de análisis y posturas públicas.
- 🔐 **Panel de Administración en Tiempo Real:** Integración con Supabase para autenticación y actualización de contenidos en vivo mediante `InlineEditorModal`.
- 🌐 **Internacionalización:** Base preparada para soporte multilingüe con `i18next`.
- 🚀 **Despliegue Automatizado cPanel:** Configurado para integración continua directa vía `Git™ Version Control` con `.cpanel.yml` y soporte de rutas SPA mediante `.htaccess`.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Tooling** | [Vite 7](https://vitejs.dev/) + SWC (`@vitejs/plugin-react-swc`) |
| **Estilos & UI** | [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS + Autoprefixer |
| **Enrutamiento** | [React Router DOM 7](https://reactrouter.com/) |
| **Backend / DB** | [Supabase](https://supabase.com/) (`@supabase/supabase-js`) |
| **Iconografía & Fuentes** | [Font Awesome 6](https://fontawesome.com/), [RemixIcon 4.5](https://remixicon.com/), [Google Fonts (Poppins)](https://fonts.google.com/) |
| **Hosting & CI/CD** | [cPanel](https://cpanel.net/) (Apache `mod_rewrite` + `.cpanel.yml`) |

---

## 📁 Estructura del Proyecto

```text
├── .cpanel.yml           # Script de despliegue automatizado para cPanel
├── index.html            # Entrypoint HTML del sitio
├── package.json          # Dependencias y scripts del proyecto
├── tailwind.config.ts    # Configuración del sistema de diseño
├── vite.config.ts        # Configuración de compilación Vite (outDir: "out")
├── public/
│   └── .htaccess         # Reglas Apache mod_rewrite para rutas SPA
├── src/
│   ├── App.tsx           # Router principal y Providers
│   ├── components/       # Componentes transversales y secciones (Hero, Navbar, Footer...)
│   ├── contexts/         # Contextos de estado global (SiteContentContext)
│   ├── hooks/            # Hooks reutilizables (useAdminSession)
│   ├── lib/              # Clientes de servicios (supabaseClient)
│   ├── pages/            # Vistas principales (Home, AcercaDe, Noticias, Admin...)
│   └── router/           # Configuración declarativa de rutas
└── out/                  # Distribución compilada lista para producción
```

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Clonar el repositorio
```bash
git clone https://github.com/Willy100fuegos/agustintorresdelgado.git
cd agustintorresdelgado
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz con tus credenciales de Supabase:
```env
VITE_PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
VITE_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key"
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

---

## 📦 Compilación y Despliegue en cPanel

Para generar los archivos estáticos listos para producción:

```bash
npm run build
```

El resultado se genera en la carpeta `out/` con su archivo `.htaccess` configurado.

### Despliegue Continuo con cPanel Git™
El proyecto incluye el archivo `.cpanel.yml`:
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/$USER/public_html
    - /bin/cp -R out/* $DEPLOYPATH/
    - /bin/cp out/.htaccess $DEPLOYPATH/
```
Al hacer clic en **Deploy HEAD Commit** desde el panel de cPanel, la versión compilada se traslada automáticamente a `public_html/`.

---

## ⚖️ Licencia y Créditos

Desarrollado para la difusión oficial de **Agustín Torres Delgado**.  
Todos los derechos reservados © 2026.
