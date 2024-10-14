export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  graduationDate: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}