# Installation Guide

This document provides step-by-step instructions for setting up and deploying the SystemPlus AI Assistant on both development and production environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [Server Configuration](#server-configuration)
- [Updating Context Data](#updating-context-data)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.x or later)
- npm (v8.x or later)
- Git

For production deployment, you'll also need:

- A server running Linux (Ubuntu 20.04 LTS recommended)
- Nginx
- Domain name with DNS configured
- SSL certificate (Let's Encrypt recommended)

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/JhonHurtado/systemplus_ai_assistant.git
cd systemplus_ai_assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file and fill in the required values:

```
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=30
```

### 4. Start Development Servers

Start both backend and frontend development servers:

```bash
npm run dev
```

Or run them separately:

```bash
# Backend only
npm run dev:backend

# Widget only
npm run dev:widget
```

The backend server will be available at http://localhost:3000, and you can test the widget by opening the example page in your browser:

```bash
# Open example/index.html in your browser
```

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

This will create optimized files in the `dist` directory.

### 2. Deploy Using Script (Recommended)

The easiest way to deploy is using the included deployment script:

```bash
node scripts/deploy.js
```

Follow the prompts to select the target environment (development, staging, or production).

### 3. Manual Deployment

Alternatively, you can deploy manually:

1. Build the application:
   ```bash
   npm run build
   ```

2. Transfer files to server:
   ```bash
   rsync -avz --delete ./dist/ systemplus@your-server.com:/var/www/assistant-prod/
   ```

3. Set up environment variables on the server:
   ```bash
   cp .env.example /var/www/assistant-prod/.env
   # Edit the environment file with production values
   ```

4. Start or restart the service:
   ```bash
   sudo systemctl restart systemplus-assistant
   ```

## Server Configuration

### Setting Up Nginx

1. Copy the Nginx configuration file to your server:
   ```bash
   sudo cp configs/nginx/systemplus-assistant.conf /etc/nginx/sites-available/
   ```

2. Create a symbolic link to enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/systemplus-assistant.conf /etc/nginx/sites-enabled/
   ```

3. Test the configuration:
   ```bash
   sudo nginx -t
   ```

4. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

### Setting Up SSL with Let's Encrypt

1. Install Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. Obtain SSL certificate:
   ```bash
   sudo certbot --nginx -d asistente.systemplus.systems
   ```

3. Test automatic renewal:
   ```bash
   sudo certbot renew --dry-run
   ```

### Setting Up systemd Service

1. Copy the service file:
   ```bash
   sudo cp configs/systemd/systemplus-assistant.service /etc/systemd/system/
   ```

2. Enable and start the service:
   ```bash
   sudo systemctl enable systemplus-assistant
   sudo systemctl start systemplus-assistant
   ```

3. Check service status:
   ```bash
   sudo systemctl status systemplus-assistant
   ```

## Updating Context Data

The AI assistant's knowledge can be updated by modifying the context data:

### 1. Create Updated Context File

Create a new JSON file with the updated context. Example structure:

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

### 2. Update via API

Use the protected API endpoint to update the context:

```bash
curl -X PUT https://asistente.systemplus.systems/api/admin/context \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d @nuevo_contexto.json
```

Replace `YOUR_ADMIN_TOKEN` with a valid JWT token and `nuevo_contexto.json` with the path to your new context file.

## Troubleshooting

### Common Issues

#### Widget Not Loading

1. Check browser console for errors
2. Verify that the widget script is correctly included in your HTML
3. Ensure the `apiBasePath` in the widget configuration points to the correct server
4. Check CORS settings if the widget is loaded from a different domain

#### API Errors

1. Check server logs:
   ```bash
   sudo journalctl -u systemplus-assistant -f
   ```
2. Verify environment variables are correctly set
3. Ensure the Google Gemini API key is valid
4. Check rate limiting settings if you're getting 429 errors

#### Deployment Issues

1. Check file permissions:
   ```bash
   sudo chown -R systemplus:systemplus /var/www/assistant-prod
   sudo chmod -R 755 /var/www/assistant-prod
   ```
2. Verify Node.js version on the server:
   ```bash
   node -v
   ```
3. Check Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/systemplus-assistant-error.log
   ```

### Getting Help

If you encounter issues not covered in this guide, please:

1. Check the [GitHub Issues](https://github.com/JhonHurtado/systemplus_ai_assistant/issues) for similar problems
2. Open a new issue with detailed information about your problem
3. Contact the SystemPlus development team at desarrollo@systemplus.edu.co