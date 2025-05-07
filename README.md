# SystemPlus AI Assistant

![SystemPlus Logo](https://systemplus.systems/images/svg/icon_bot.svg)

> AI Assistant for SystemPlus educational institution using Node.js, Express, TypeScript, and Google Gemini 2.0 Flash

## 📋 Overview

SystemPlus AI Assistant is a professional, embeddable chat widget for the SystemPlus educational institution. The assistant provides concise, accurate information to students, parents, and visitors based on a customizable knowledge context.

Built with modern web technologies, the widget offers a seamless integration experience for any website with extensive customization options while maintaining enterprise-grade security.

## 🌟 Key Features

- **Contextual AI Responses**: Powered by Google's Gemini 2.0 Flash model
- **Custom Embeddable Widget**: Easy integration via a single script tag
- **Professional UI/UX**: Shadow DOM for style isolation and smooth animations
- **Responsive Design**: Works on any device and screen size
- **Dynamic Context Updates**: Update the knowledge base without service restart
- **Enhanced Security**: JWT authentication, rate limiting, and CORS protection
- **Highly Customizable**: Multiple theming and styling options

## 🛠️ Technologies

- **Backend**: Node.js + Express + TypeScript
- **Frontend**: TypeScript (compiled to JavaScript)
- **AI Model**: Google Gemini 2.0 Flash
- **Bundler**: Webpack for widget compilation
- **Security**: Helmet, JWT, and rate limiting

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/JhonHurtado/systemplus_ai_assistant.git
cd systemplus_ai_assistant

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your settings
```

### Development

```bash
# Start development servers
npm run dev

# Backend only
npm run dev:backend

# Widget only
npm run dev:widget
```

### Building for Production

```bash
# Build both backend and frontend
npm run build

# Run production server
npm start
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t systemplus-assistant .

# Run the container
docker run -d -p 3000:3000 --env-file .env --name assistant systemplus-assistant
```

## 💻 Integration

Add the widget to any website using a simple script tag:

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

## ⚙️ Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `color` | Main color theme (hex code) | `#be3124` |
| `title` | Widget title | `"Asistente System Plus"` |
| `initialMessage` | First message from assistant | `"¡Hola! Soy el asistente..."` |
| `theme` | Color theme | `"light"` (or `"dark"`) |
| `avatarUrl` | URL to assistant avatar | Bot icon URL |
| `apiBasePath` | Base URL for API endpoints | `"https://asistente.systemplus.systems"` |
| `position` | Screen position | `"bottom-right"` |
| `fontFamily` | Main font | `"Poppins, sans-serif"` |
| `enableSound` | Enable notification sounds | `true` |
| `suggestionsEnabled` | Show suggestions | `true` |
| `size` | Widget size | `"medium"` (or `"small"`, `"large"`) |
| `autoOpen` | Auto-open on page load | `false` |

## 📂 Project Structure

```
/src
  /backend
    /services
      contextEngine.ts    # Contextual reasoning engine
    /middleware
      auth.ts             # API authentication middleware
    /config
      constants.ts        # Configuration and constants
    server.ts             # Express server
  
  /frontend
    /components
      chatInterface.ts    # Chat UI interface
      messageItem.ts      # Individual message component
    /utils
      domHelpers.ts       # DOM utility functions
    widget.ts             # Widget entry point
  
/dist                     # Compiled files
/data
  context.json            # Initial context example
  
/scripts
  build.js                # Build script
  deploy.js               # Deployment script
  
tsconfig.json             # TypeScript configuration
webpack.config.js         # Webpack configuration
package.json              # Dependencies and scripts
.env.example              # Environment variables example
```

## 🔄 Updating Context

Use the protected API endpoint to update the assistant's knowledge base:

```bash
curl -X PUT https://asistente.systemplus.systems/api/admin/context \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d @new_context.json
```

## 🔒 Security Features

- **CORS Protection**: Configured for specific domains
- **JWT Authentication**: For admin endpoints
- **HTTP Headers**: Secured with Helmet
- **Rate Limiting**: Prevents abuse by limiting requests per IP
- **Input Sanitization**: All user inputs are validated and sanitized

## 📄 License

This project is proprietary software owned by SystemPlus.

## 👥 Support

For questions or assistance, please contact:
- Email: info@systemplus.edu.co
- Website: [SystemPlus](https://systemplus.systems)
