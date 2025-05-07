/**
 * Component for individual chat messages
 */
export class MessageItem {
  private role: string;
  private content: string;
  private config: any;
  
  constructor(role: string, content: string, config: any) {
    this.role = role;
    this.content = content;
    this.config = config;
  }
  
  /**
   * Render message item
   */
  public render(): HTMLElement {
    const messageElement = document.createElement('div');
    messageElement.className = `systemplus-message systemplus-message-${this.role}`;
    
    // Create message bubble
    const bubbleElement = document.createElement('div');
    bubbleElement.className = 'systemplus-message-bubble';
    
    // Apply custom styling to bubble based on role
    if (this.role === 'assistant') {
      bubbleElement.style.backgroundColor = this.config.theme === 'dark' ? '#444444' : '#f0f0f0';
      bubbleElement.style.color = this.config.theme === 'dark' ? '#ffffff' : '#333333';
      
      // Add avatar for assistant messages
      if (this.config.avatarUrl) {
        const avatarElement = document.createElement('img');
        avatarElement.className = 'systemplus-message-avatar';
        avatarElement.src = this.config.avatarUrl;
        avatarElement.alt = 'Assistant Avatar';
        messageElement.appendChild(avatarElement);
      }
    } else {
      // User message
      bubbleElement.style.backgroundColor = this.config.color;
      bubbleElement.style.color = '#ffffff';
    }
    
    // Process message content
    this.processContent(bubbleElement, this.content);
    
    // Add bubble to message
    messageElement.appendChild(bubbleElement);
    
    // Add styles to message item
    this.applyStyles(messageElement);
    
    return messageElement;
  }
  
  /**
   * Process message content (parse links, format text, etc.)
   */
  private processContent(container: HTMLElement, content: string): void {
    // Process links
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const processedContent = content.replace(linkRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    
    // Process line breaks
    const formattedContent = processedContent.replace(/\n/g, '<br>');
    
    // Set processed content
    container.innerHTML = formattedContent;
  }
  
  /**
   * Apply styles to message item
   */
  private applyStyles(element: HTMLElement): void {
    // Add CSS to element
    const style = document.createElement('style');
    style.textContent = `
      .systemplus-message {
        display: flex;
        margin-bottom: 10px;
        align-items: flex-start;
      }
      
      .systemplus-message-user {
        justify-content: flex-end;
      }
      
      .systemplus-message-assistant {
        justify-content: flex-start;
      }
      
      .systemplus-message-bubble {
        padding: 10px 15px;
        border-radius: 18px;
        max-width: 80%;
        word-wrap: break-word;
        line-height: 1.4;
      }
      
      .systemplus-message-user .systemplus-message-bubble {
        border-top-right-radius: 4px;
      }
      
      .systemplus-message-assistant .systemplus-message-bubble {
        border-top-left-radius: 4px;
      }
      
      .systemplus-message-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: cover;
      }
      
      .systemplus-message a {
        color: inherit;
        text-decoration: underline;
      }
      
      .systemplus-loading-indicator {
        display: flex;
      }
      
      .systemplus-loading-indicator div {
        width: 8px;
        height: 8px;
        margin: 0 2px;
        background-color: ${this.config.theme === 'dark' ? '#aaaaaa' : '#888888'};
        border-radius: 50%;
        animation: systemplus-loading 1s infinite ease-in-out;
      }
      
      .systemplus-loading-indicator div:nth-child(1) {
        animation-delay: 0s;
      }
      
      .systemplus-loading-indicator div:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .systemplus-loading-indicator div:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes systemplus-loading {
        0%, 100% {
          transform: scale(1);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.3);
          opacity: 1;
        }
      }
    `;
    
    element.appendChild(style);
  }
}