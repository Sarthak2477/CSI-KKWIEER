import { TestQuestion } from '../portal/test/types';

export const fetchQuestions = async (): Promise<TestQuestion[]> => {
  try {
    const response = await fetch('/api/questions');
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};