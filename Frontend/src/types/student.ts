export interface Student {
    id: string;
    name: string;
    email: string;
    enrollmentDate: string;
    courses: Course[];
    overallGrade: number;
    status: 'active' | 'inactive';
  }
  
  export interface Course {
    id: string;
    name: string;
    progress: number;
    grade: number;
    testScores: TestScore[];
    projects: Project[];
  }
  
  export interface TestScore {
    id: string;
    name: string;
    score: number;
    date: string;
  }
  
  export interface Project {
    id: string;
    name: string;
    status: 'pending' | 'in_progress' | 'completed';
    grade?: number;
    dueDate: string;
  }