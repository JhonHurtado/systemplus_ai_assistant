# SystemPlus AI Assistant API Documentation

This document provides detailed information about the SystemPlus AI Assistant API endpoints, request/response formats, authentication, and usage examples.

## Base URL

The base URL for all API endpoints is:

```
https://asistente.systemplus.systems/api
```

For development environments:

```
http://localhost:3000/api
```

## Authentication

The admin endpoints require authentication using JWT (JSON Web Token). Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Widget Message API

Endpoint for sending messages to the AI assistant.

**URL**: `/widget/message`  
**Method**: `POST`  
**Authentication**: None required  
**Rate Limiting**: 30 requests per minute per IP  

#### Request

```json
{
  "message": "¿Qué programas ofrecen?"
}
```

#### Response

```json
{
  "response": "Ofrecemos programas técnicos en Sistemas, Contabilidad, Diseño Gráfico, cursos de Inglés y Soporte Técnico. Todas nuestras formaciones están diseñadas para desarrollar competencias laborales prácticas."
}
```

#### Error Responses

**400 Bad Request**
```json
{
  "error": "Message is required"
}
```

**429 Too Many Requests**
```json
{
  "error": "Too many requests, please try again later."
}
```

**500 Internal Server Error**
```json
{
  "error": "Error processing message"
}
```

### Context Update API

Secured endpoint for updating the AI's knowledge context.

**URL**: `/admin/context`  
**Method**: `PUT`  
**Authentication**: JWT required  
**Rate Limiting**: 30 requests per minute per IP  

#### Request

```json
{
  "institucion": "System Plus Popayán",
  "tipo": "Institución de Educación para el Trabajo y el Desarrollo Humano",
  "fecha_fundacion": "1994-08-23",
  "ciudad": "Popayán",
  "departamento": "Cauca",
  "pais": "Colombia",
  "descripcion": "System Plus Popayán es una institución educativa enfocada en programas técnicos y tecnológicos. Fundada en 1994, contamos con más de 25 años de experiencia formando profesionales competentes.",
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
  "mision": "Formar personas competentes en el ámbito técnico y tecnológico, comprometidas con el desarrollo personal y social.",
  "vision": "Ser líderes en formación técnica en el suroccidente colombiano, reconocidos por nuestra calidad académica."
}
```

#### Response

```json
{
  "success": true,
  "message": "Context updated successfully"
}
```

#### Error Responses

**400 Bad Request**
```json
{
  "error": "Context data is required"
}
```

**401 Unauthorized**
```json
{
  "error": "Access denied. No token provided."
}
```

**401 Unauthorized**
```json
{
  "error": "Invalid token."
}
```

**500 Internal Server Error**
```json
{
  "error": "Error updating context"
}
```

## Usage Examples

### cURL Examples

#### Sending a Message to the Assistant

```bash
curl -X POST https://asistente.systemplus.systems/api/widget/message \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Cuáles son los horarios de atención?"}'
```

#### Updating the Context

```bash
curl -X PUT https://asistente.systemplus.systems/api/admin/context \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d @updated_context.json
```

### JavaScript Examples

#### Sending a Message to the Assistant

```javascript
async function sendMessage(message) {
  try {
    const response = await fetch('https://asistente.systemplus.systems/api/widget/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Example usage
sendMessage('¿Dónde están ubicados?')
  .then(response => {
    console.log('Assistant response:', response);
  })
  .catch(error => {
    console.error('Failed to get response:', error);
  });
```

#### Updating the Context

```javascript
async function updateContext(contextData, token) {
  try {
    const response = await fetch('https://asistente.systemplus.systems/api/admin/context', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(contextData),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating context:', error);
    throw error;
  }
}

// Example usage
const token = 'YOUR_JWT_TOKEN';
const newContext = {
  // Context data here
};

updateContext(newContext, token)
  .then(response => {
    console.log('Update result:', response);
  })
  .catch(error => {
    console.error('Failed to update context:', error);
  });
```

## Rate Limiting

To prevent abuse, the API implements rate limiting:

- Standard endpoints: 30 requests per minute per IP
- Authentication failure: 5 attempts per minute per IP

When the rate limit is exceeded, the API returns a 429 status code with a message indicating that too many requests have been made.

## Error Handling

All API responses use standard HTTP status codes:

- `200 OK`: Request succeeded
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication failure
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server-side error

Error responses include an `error` field with a descriptive message.

## Best Practices

1. **Implement Error Handling**: Always handle error responses in your client application
2. **Respect Rate Limits**: Implement backoff strategies when rate limits are encountered
3. **Token Security**: Store JWT tokens securely and never expose them in client-side code
4. **Context Updates**: Keep context data concise and relevant to improve assistant responses
5. **Testing**: Test your integration in development environment before using in production

## Support

For API support, please contact the SystemPlus development team at desarrollo@systemplus.edu.co.