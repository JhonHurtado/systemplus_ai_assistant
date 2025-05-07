/**
 * Application constants
 */
export const constants = {
  // Widget configuration defaults
  WIDGET_DEFAULTS: {
    color: '#be3124',
    title: 'Asistente System Plus',
    initialMessage: '¡Hola! Soy el asistente virtual de System Plus. ¿En qué puedo ayudarte?',
    theme: 'light',
    avatarUrl: 'https://systemplus.systems/images/svg/icon_bot.svg',
    position: 'bottom-right',
    fontFamily: 'Poppins, sans-serif',
    enableSound: true,
    suggestionsEnabled: true,
    size: 'medium',
    autoOpen: false
  },
  
  // API response messages
  MESSAGES: {
    CONTEXT_UPDATED: 'Contexto actualizado exitosamente',
    UNAUTHORIZED: 'No autorizado para realizar esta acción',
    SERVER_ERROR: 'Error interno del servidor',
    INVALID_REQUEST: 'Solicitud inválida o incompleta'
  },
  
  // Model configuration
  MODEL: {
    NAME: 'gemini-2.0-flash',
    TEMPERATURE: 0.2,
    MAX_OUTPUT_TOKENS: 256
  }
};
