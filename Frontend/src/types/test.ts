export type QuestionType = 'mcq' | 'descriptive';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  marks: number;
  options?: Option[];
  correctAnswer?: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalMarks: number;
  questions: Question[];
  scheduledFor: Date;
  randomizeQuestions: boolean;
  courseId: string;
}

export interface TestResult {
  id: string;
  testId: string;
  studentId: string;
  score: number;
  answers: {
    questionId: string;
    answer: string;
    score: number;
  }[];
  submittedAt: Date;
}

export interface TestAnalytics {
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  totalParticipants: number;
  questionAnalytics: {
    questionId: string;
    averageScore: number;
    correctAnswers: number;
  }[];
}