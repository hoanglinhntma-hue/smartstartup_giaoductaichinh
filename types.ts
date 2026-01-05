
export enum TabType {
  AI_ADVISOR = 'AI_ADVISOR', // M3
  INSTALLMENT = 'INSTALLMENT', // M4.1
  COMPOUND = 'COMPOUND', // M4.2
  STARTUP = 'STARTUP', // M4.3
  JOURNEY = 'JOURNEY' // M5
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export interface LearningStat {
  date: string;
  concept: string;
  stepReached: number;
}
