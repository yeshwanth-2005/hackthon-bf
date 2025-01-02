export interface Interview {
  id: string;
  companyName: string;
  jobRole: string;
  date: string;
  time: string;
  mode: 'online' | 'offline';
  resources: Resource[];
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  type: 'pdf' | 'video' | 'url';
  title: string;
  url: string;
}

export interface InterviewRegistration {
  id: string;
  interviewId: string;
  studentId: string;
  status: 'pending' | 'approved' | 'rejected';
  mockInterviewScore?: number;
  feedback?: string;
  registeredAt: string;
}