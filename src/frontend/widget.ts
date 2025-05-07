import { ChatInterface } from './components/chatInterface';
import { getWidgetConfig } from './utils/domHelpers';

/**
 * Main entry point for the widget
 */
class SystemPlusWidget {
  private config: any;
  private chatInterface: ChatInterface | null = null;
  
  constructor() {
    // Initialize the widget when DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initialize();
      });
    } else {
      // DOM already loaded
      this.initialize();
    }
  }
  
  /**
   * Initialize the widget with configuration from script tag
   */
  private initialize(): void {
    try {
      // Get configuration from script tag
      this.config = getWidgetConfig();
      
      // Create and append the chat interface
      this.chatInterface = new ChatInterface(this.config);
      document.body.appendChild(this.chatInterface.render());
      
      // Register global access methods
      this.registerGlobalMethods();
      
      // Auto-open chat if configured
      if (this.config.autoOpen) {
        setTimeout(() => {
          this.chatInterface?.open();
        }, 1000);
      }
      
      console.log('SystemPlus AI Assistant Widget initialized successfully');
    } catch (error) {
      console.error('Error initializing SystemPlus Widget:', error);
    }
  }
  
  /**
   * Register global methods for external access
   */
  private registerGlobalMethods(): void {
    // Create namespace if it doesn't exist
    if (!window.SystemPlusWidget) {
      (window as any).SystemPlusWidget = {};
    }
    
    // Register methods
    (window as any).SystemPlusWidget.open = () => {
      this.chatInterface?.open();
    };
    
    (window as any).SystemPlusWidget.close = () => {
      this.chatInterface?.close();
    };
    
    (window as any).SystemPlusWidget.toggle = () => {
      this.chatInterface?.toggleChat();
    };
    
    (window as any).SystemPlusWidget.sendMessage = (message: string) => {
      this.chatInterface?.sendMessage(message);
    };
  }
}

// Create widget instance
new SystemPlusWidget();

// Add TypeScript interface for window
declare global {
  interface Window {
    SystemPlusWidget?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
      sendMessage: (message: string) => void;
    };
  }
}