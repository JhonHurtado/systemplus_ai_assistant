/**
 * DOM helper utilities for widget
 */

/**
 * Get widget configuration from script tag
 */
export function getWidgetConfig(): any {
  // Find script tag with widget configuration
  const scriptTag = document.getElementById('systemplus-widget-script');
  
  if (!scriptTag) {
    throw new Error('SystemPlus widget script tag not found');
  }
  
  // Get data-config attribute
  const configAttr = scriptTag.getAttribute('data-config');
  
  if (!configAttr) {
    throw new Error('SystemPlus widget configuration not found');
  }
  
  try {
    // Parse configuration JSON
    const config = JSON.parse(configAttr);
    
    // Process configuration
    return processConfig(config);
  } catch (error) {
    console.error('Error parsing SystemPlus widget configuration:', error);
    throw new Error('Invalid SystemPlus widget configuration');
  }
}

/**
 * Process widget configuration
 */
function processConfig(config: any): any {
  // Convert primary color to RGB for opacity calculations
  if (config.color) {
    config.primaryColorRgb = hexToRgb(config.color);
  }
  
  return config;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return `${r}, ${g}, ${b}`;
}

/**
 * Create element with attributes and styles
 */
export function createElement(tag: string, options: any = {}): HTMLElement {
  const element = document.createElement(tag);
  
  // Set attributes
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value as string);
    });
  }
  
  // Set text content
  if (options.text) {
    element.textContent = options.text;
  }
  
  // Set HTML content
  if (options.html) {
    element.innerHTML = options.html;
  }
  
  // Set classes
  if (options.classes) {
    if (Array.isArray(options.classes)) {
      element.classList.add(...options.classes);
    } else {
      element.className = options.classes;
    }
  }
  
  // Set styles
  if (options.styles) {
    Object.entries(options.styles).forEach(([key, value]) => {
      element.style[key as any] = value as string;
    });
  }
  
  // Add event listeners
  if (options.events) {
    Object.entries(options.events).forEach(([event, handler]) => {
      element.addEventListener(event, handler as EventListener);
    });
  }
  
  // Append children
  if (options.children) {
    options.children.forEach((child: HTMLElement) => {
      element.appendChild(child);
    });
  }
  
  return element;
}

/**
 * Format message content (parse links, add line breaks, etc.)
 */
export function formatMessageContent(content: string): string {
  // Convert URLs to links
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const withLinks = content.replace(linkRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
  
  // Convert line breaks to <br>
  return withLinks.replace(/\n/g, '<br>');
}

/**
 * Safely append styles to shadow DOM
 */
export function appendStyles(shadowRoot: ShadowRoot, css: string): void {
  const style = document.createElement('style');
  style.textContent = css;
  shadowRoot.appendChild(style);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function to limit function calls
 */
export function debounce(func: Function, wait: number = 300): Function {
  let timeout: number | null = null;
  
  return function(...args: any[]) {
    const context = this;
    
    if (timeout !== null) {
      window.clearTimeout(timeout);
    }
    
    timeout = window.setTimeout(() => {
      func.apply(context, args);
      timeout = null;
    }, wait);
  };
}