# Guía de Instalación

Este documento proporciona instrucciones paso a paso para configurar y desplegar el Asistente IA de SystemPlus tanto en entornos de desarrollo como de producción.

## Tabla de Contenidos

- [Prerrequisitos](#prerrequisitos)
- [Configuración de Desarrollo](#configuración-de-desarrollo)
- [Despliegue de Producción](#despliegue-de-producción)
- [Configuración del Servidor](#configuración-del-servidor)
- [Actualización de Datos de Contexto](#actualización-de-datos-de-contexto)
- [Solución de Problemas](#solución-de-problemas)

## Prerrequisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- Node.js (v16.x o posterior)
- npm (v8.x o posterior)
- Git

Para el despliegue en producción, también necesitarás:

- Un servidor ejecutando Linux (Ubuntu 20.04 LTS recomendado)
- Nginx
- Nombre de dominio con DNS configurado
- Certificado SSL (Let's Encrypt recomendado)

## Configuración de Desarrollo

### 1. Clonar el Repositorio

```bash
git clone https://github.com/JhonHurtado/systemplus_ai_assistant.git
cd systemplus_ai_assistant
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` y completa los valores requeridos:

```
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=tu_clave_api_gemini_aquí
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRY=24h
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=30
```

### 4. Iniciar Servidores de Desarrollo

Inicia ambos servidores de desarrollo (backend y frontend):

```bash
npm run dev
```

O ejecútalos por separado:

```bash
# Solo backend
npm run dev:backend

# Solo widget
npm run dev:widget
```

El servidor backend estará disponible en http://localhost:3000, y puedes probar el widget abriendo la página de ejemplo en tu navegador:

```bash
# Abre example/index.html en tu navegador
```

## Despliegue de Producción

### 1. Compilar la Aplicación

```bash
npm run build
```

Esto creará archivos optimizados en el directorio `dist`.

### 2. Desplegar Usando Script (Recomendado)

La forma más fácil de desplegar es usando el script de despliegue incluido:

```bash
node scripts/deploy.js
```

Sigue las indicaciones para seleccionar el entorno de destino (desarrollo, staging o producción).

### 3. Despliegue Manual

Alternativamente, puedes desplegar manualmente:

1. Compilar la aplicación:
   ```bash
   npm run build
   ```

2. Transferir archivos al servidor:
   ```bash
   rsync -avz --delete ./dist/ systemplus@tu-servidor.com:/var/www/assistant-prod/
   ```

3. Configurar variables de entorno en el servidor:
   ```bash
   cp .env.example /var/www/assistant-prod/.env
   # Edita el archivo de entorno con valores de producción
   ```

4. Iniciar o reiniciar el servicio:
   ```bash
   sudo systemctl restart systemplus-assistant
   ```

## Configuración del Servidor

### Configuración de Nginx

1. Copia el archivo de configuración de Nginx a tu servidor:
   ```bash
   sudo cp configs/nginx/systemplus-assistant.conf /etc/nginx/sites-available/
   ```

2. Crea un enlace simbólico para habilitar el sitio:
   ```bash
   sudo ln -s /etc/nginx/sites-available/systemplus-assistant.conf /etc/nginx/sites-enabled/
   ```

3. Prueba la configuración:
   ```bash
   sudo nginx -t
   ```

4. Recarga Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

### Configuración de SSL con Let's Encrypt

1. Instala Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. Obtén certificado SSL:
   ```bash
   sudo certbot --nginx -d asistente.systemplus.systems
   ```

3. Prueba la renovación automática:
   ```bash
   sudo certbot renew --dry-run
   ```

### Configuración del Servicio systemd

1. Copia el archivo de servicio:
   ```bash
   sudo cp configs/systemd/systemplus-assistant.service /etc/systemd/system/
   ```

2. Habilita e inicia el servicio:
   ```bash
   sudo systemctl enable systemplus-assistant
   sudo systemctl start systemplus-assistant
   ```

3. Verifica el estado del servicio:
   ```bash
   sudo systemctl status systemplus-assistant
   ```

## Actualización de Datos de Contexto

El conocimiento del asistente IA puede actualizarse modificando los datos de contexto:

### 1. Crear Archivo de Contexto Actualizado

Crea un nuevo archivo JSON con el contexto actualizado. Estructura de ejemplo:

```json
{
  "institucion": "System Plus Popayán",
  "tipo": "Institución de Educación para el Trabajo y el Desarrollo Humano",
  "fecha_fundacion": "1994-08-23",
  "ciudad": "Popayán",
  "departamento": "Cauca",
  "pais": "Colombia",
  "descripcion": "System Plus Popayán es una institución educativa enfocada en programas técnicos y tecnológicos.",
  "sede_principal": {
    "direccion": "Calle 5 # 5-59, Popayán, Cauca",
    "telefono": "(602) 823-1234",
    "correo": "info@systemplus.edu.co",
    "horario": "Lunes a viernes: 8:00am - 6:00pm | Sábados: 8:00am - 12:00pm"
  },
  "programas": [
    "Técnico en Sistemas",
    "Técnico en Contabilidad",
    "Técnico en Diseño Gráfico",
    "Inglés",
    "Soporte Técnico"
  ],
  "modalidades": ["Presencial", "Virtual", "Mixta"],
  "mision": "Formar personas competentes en el ámbito técnico y tecnológico.",
  "vision": "Ser líderes en formación técnica en el suroccidente colombiano."
}
```

### 2. Actualizar vía API

Utiliza el endpoint API protegido para actualizar el contexto:

```bash
curl -X PUT https://asistente.systemplus.systems/api/admin/context \
  -H "Authorization: Bearer TU_TOKEN_ADMIN" \
  -H "Content-Type: application/json" \
  -d @nuevo_contexto.json
```

Reemplaza `TU_TOKEN_ADMIN` con un token JWT válido y `nuevo_contexto.json` con la ruta a tu nuevo archivo de contexto.

## Solución de Problemas

### Problemas Comunes

#### Widget No Carga

1. Verifica la consola del navegador para errores
2. Comprueba que el script del widget esté correctamente incluido en tu HTML
3. Asegúrate de que `apiBasePath` en la configuración del widget apunte al servidor correcto
4. Verifica la configuración CORS si el widget se carga desde un dominio diferente

#### Errores de API

1. Verifica los logs del servidor:
   ```bash
   sudo journalctl -u systemplus-assistant -f
   ```
2. Comprueba que las variables de entorno estén correctamente configuradas
3. Asegúrate de que la clave API de Google Gemini sea válida
4. Verifica la configuración de limitación de tasa si estás recibiendo errores 429

#### Problemas de Despliegue

1. Verifica los permisos de archivos:
   ```bash
   sudo chown -R systemplus:systemplus /var/www/assistant-prod
   sudo chmod -R 755 /var/www/assistant-prod
   ```
2. Comprueba la versión de Node.js en el servidor:
   ```bash
   node -v
   ```
3. Revisa los logs de Nginx:
   ```bash
   sudo tail -f /var/log/nginx/systemplus-assistant-error.log
   ```

### Obtener Ayuda

Si encuentras problemas no cubiertos en esta guía, por favor:

1. Revisa los [Issues de GitHub](https://github.com/JhonHurtado/systemplus_ai_assistant/issues) para problemas similares
2. Abre un nuevo issue con información detallada sobre tu problema
3. Contacta al equipo de desarrollo de SystemPlus en desarrollo@systemplus.edu.co