export interface Assignment {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    instructions: string;
    materials: AttachedFile[];
    maxScore: number;
    courseId: string;
  }
  
  export interface AttachedFile {
    id: string;
    name: string;
    url: string;
    type: string;
  }
  
  export interface Submission {
    id: string;
    assignmentId: string;
    studentId: string;
    submittedAt: Date;
    files: AttachedFile[];
    status: 'on-time' | 'late' | 'extended';
    grade?: number;
    feedback?: string;
    feedbackFiles?: AttachedFile[];
  }