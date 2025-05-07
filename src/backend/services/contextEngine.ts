import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { promisify } from 'util';

// Promisify fs functions
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export class ContextEngine {
  private contextFilePath: string;
  private context: any;
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize with default context file path
    this.contextFilePath = path.join(process.cwd(), 'data', 'context.json');
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Load initial context
    this.loadContext();
  }

  /**
   * Load context from the JSON file
   */
  private async loadContext(): Promise<void> {
    try {
      const data = await readFile(this.contextFilePath, 'utf8');
      this.context = JSON.parse(data);
      console.log('Context loaded successfully');
    } catch (error) {
      console.error('Error loading context:', error);
      // Initialize with empty context if file doesn't exist
      this.context = {};
    }
  }

  /**
   * Save context to the JSON file
   */
  private async saveContext(): Promise<void> {
    try {
      await writeFile(
        this.contextFilePath,
        JSON.stringify(this.context, null, 2),
        'utf8'
      );
      console.log('Context saved successfully');
    } catch (error) {
      console.error('Error saving context:', error);
      throw error;
    }
  }

  /**
   * Update the context with new data
   */
  public async updateContext(newContext: any): Promise<void> {
    this.context = newContext;
    await this.saveContext();
  }

  /**
   * Process a user query using the Gemini model
   */
  public async processQuery(query: string): Promise<string> {
    // Instruction for the model with the current context
    const prompt = `
      Eres un asistente educativo amable y respetuoso.
      Responde ÚNICAMENTE basándote en la siguiente información institucional:
      ${JSON.stringify(this.context)}
      
      La consulta es: "${query}"
      
      Instrucciones:
      1. Si la información está en el contexto, proporciona una respuesta breve, precisa y cordial
      2. Si la información no está en el contexto, responde: "Lo siento, no dispongo de esa información específica. ¿Puedo ayudarte con algo más sobre nuestra institución?"
      3. Mantén un tono profesional y respetuoso apropiado para una institución educativa
      4. Limita tu respuesta a 2-3 oraciones
    `;
    
    try {
      // Get response from the model
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      return 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo más tarde.';
    }
  }
}
