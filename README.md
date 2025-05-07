# Asistente IA de SystemPlus

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/JhonHurtado/systemplus_ai_assistant/ci.yml?branch=main&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/JhonHurtado/systemplus_ai_assistant?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/JhonHurtado/systemplus_ai_assistant?style=flat-square)
![GitHub](https://img.shields.io/github/license/JhonHurtado/systemplus_ai_assistant?style=flat-square)
![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=flat-square)

<p align="center">
  <img src="https://systemplus.systems/images/svg/icon_bot.svg" alt="Logo de SystemPlus" width="120" height="120">
</p>

<p align="center">
  <b>Asistente de IA para la institución educativa SystemPlus desarrollado con Node.js, Express, TypeScript y Google Gemini 2.0 Flash</b>
</p>

<p align="center">
  <a href="#visión-general">Visión General</a> •
  <a href="#características-principales">Características Principales</a> •
  <a href="#inicio-rápido">Inicio Rápido</a> •
  <a href="#integración">Integración</a> •
  <a href="#documentación">Documentación</a> •
  <a href="#licencia">Licencia</a>
</p>

## 📋 Visión General

El Asistente IA de SystemPlus es un widget de chat profesional e integrable para la institución educativa SystemPlus. El asistente proporciona información concisa y precisa a estudiantes, padres y visitantes basada en un contexto de conocimiento personalizable.

Construido con tecnologías web modernas, el widget ofrece una experiencia de integración perfecta para cualquier sitio web con amplias opciones de personalización, manteniendo la seguridad a nivel empresarial.

## 🌟 Características Principales

- **Respuestas IA Contextuales**: Impulsado por el modelo Google Gemini 2.0 Flash
- **Widget Personalizado**: Fácil integración mediante una única etiqueta script
- **UI/UX Profesional**: Shadow DOM para aislamiento de estilos y animaciones fluidas
- **Diseño Responsivo**: Funciona en cualquier dispositivo y tamaño de pantalla
- **Actualizaciones Dinámicas de Contexto**: Actualiza la base de conocimientos sin reiniciar el servicio
- **Seguridad Mejorada**: Autenticación JWT, limitación de tasa de solicitudes y protección CORS
- **Altamente Personalizable**: Múltiples opciones de temas y estilos

## 🛠️ Tecnologías

- **Backend**: Node.js + Express + TypeScript
- **Frontend**: TypeScript (compilado a JavaScript)
- **Modelo IA**: Google Gemini 2.0 Flash
- **Bundler**: Webpack para compilación del widget
- **Seguridad**: Helmet, JWT y limitación de tasa de solicitudes

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JhonHurtado/systemplus_ai_assistant.git
cd systemplus_ai_assistant

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración
```

### Desarrollo

```bash
# Iniciar servidores de desarrollo
npm run dev

# Solo backend
npm run dev:backend

# Solo widget
npm run dev:widget
```

### Compilación para Producción

```bash
# Compilar tanto backend como frontend
npm run build

# Ejecutar servidor de producción
npm start
```

### Despliegue con Docker

```bash
# Construir la imagen Docker
docker build -t systemplus-assistant .

# Ejecutar el contenedor
docker run -d -p 3000:3000 --env-file .env --name assistant systemplus-assistant
```

## 💻 Integración

Añade el widget a cualquier sitio web usando una simple etiqueta script:

```html
<script 
  id="systemplus-widget-script"
  src="https://asistente.systemplus.systems/dist/widget.min.js"
  data-config='{
    "color": "#be3124",
    "title": "Asistente System Plus",
    "initialMessage": "¡Hola! Soy el asistente virtual de System Plus. ¿En qué puedo ayudarte?",
    "theme": "light",
    "avatarUrl": "https://systemplus.systems/images/svg/icon_bot.svg",
    "apiBasePath": "https://asistente.systemplus.systems",
    "position": "bottom-right",
    "fontFamily": "Poppins, sans-serif",
    "enableSound": true,
    "suggestionsEnabled": true,
    "size": "medium",
    "autoOpen": false
  }' 
  async>
</script>
```

Consulta la [página de ejemplo de integración](./example/index.html) para una demostración funcional.

## ⚙️ Opciones de Configuración

| Opción | Descripción | Valor Predeterminado |
|--------|-------------|----------------------|
| `color` | Color principal del tema (código hex) | `#be3124` |
| `title` | Título del widget | `"Asistente System Plus"` |
| `initialMessage` | Primer mensaje del asistente | `"¡Hola! Soy el asistente..."` |
| `theme` | Tema de color | `"light"` (o `"dark"`) |
| `avatarUrl` | URL del avatar del asistente | URL del icono del bot |
| `apiBasePath` | URL base para endpoints API | `"https://asistente.systemplus.systems"` |
| `position` | Posición en la pantalla | `"bottom-right"` |
| `fontFamily` | Fuente principal | `"Poppins, sans-serif"` |
| `enableSound` | Habilitar sonidos de notificación | `true` |
| `suggestionsEnabled` | Mostrar sugerencias | `true` |
| `size` | Tamaño del widget | `"medium"` (o `"small"`, `"large"`) |
| `autoOpen` | Apertura automática al cargar | `false` |

## 📚 Documentación

La documentación completa está disponible en el directorio `/docs`:

- [Guía de Instalación](./docs/INSTALLATION.md) - Instrucciones detalladas de configuración y despliegue
- [Documentación API](./docs/API.md) - Referencia de endpoints API
- [Guía de Usuario](./docs/USER_GUIDE.md) - Guía para usuarios finales
- [Lineamientos de Contribución](./docs/CONTRIBUTING.md) - Cómo contribuir al proyecto

## 📂 Estructura del Proyecto

```
/src
  /backend
    /services
      contextEngine.ts    # Motor de razonamiento contextual
    /middleware
      auth.ts             # Middleware de autenticación API
    /config
      constants.ts        # Configuraciones y constantes
    server.ts             # Servidor Express
  
  /frontend
    /components
      chatInterface.ts    # Interfaz de chat UI
      messageItem.ts      # Componente de mensaje individual
    /utils
      domHelpers.ts       # Funciones de utilidad DOM
    widget.ts             # Punto de entrada del widget
  
/dist                     # Archivos compilados
/data
  context.json            # Ejemplo inicial de contexto
  
/docs                     # Documentación
/configs                  # Archivos de configuración para despliegue
/scripts                  # Scripts de compilación y despliegue
/example                  # Integración de ejemplo
/.github                  # Workflows y plantillas de GitHub
  
tsconfig.json             # Configuración de TypeScript
webpack.config.js         # Configuración de Webpack
package.json              # Dependencias y scripts
.env.example              # Ejemplo de variables de entorno
```

## 🔄 Actualización del Contexto

Utiliza el endpoint API protegido para actualizar la base de conocimiento del asistente:

```bash
curl -X PUT https://asistente.systemplus.systems/api/admin/context \
  -H "Authorization: Bearer TU_TOKEN_ADMIN" \
  -H "Content-Type: application/json" \
  -d @nuevo_contexto.json
```

Consulta la [Documentación API](./docs/API.md) para más detalles.

## 🔒 Características de Seguridad

- **Protección CORS**: Configurado para dominios específicos
- **Autenticación JWT**: Para endpoints administrativos
- **Encabezados HTTP**: Asegurados con Helmet
- **Limitación de Tasa**: Previene abusos limitando solicitudes por IP
- **Sanitización de Entrada**: Todas las entradas de usuario son validadas y sanitizadas

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, consulta nuestros [Lineamientos de Contribución](./docs/CONTRIBUTING.md) para más detalles.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Soporte

Para preguntas o asistencia, por favor contacta:
- Email: info@systemplus.edu.co
- Sitio web: [SystemPlus](https://systemplus.systems)

---

<p align="center">
  Hecho con ❤️ por <a href="https://systemplus.systems">SystemPlus</a>
</p>