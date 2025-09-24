export interface Education {
  year: string;
  institution: string;
  degree: string;
}

export interface Experience {
  id: string;
  period: string;
  company: string;
  position: string;
  responsibilities: string[];
  expanded?: boolean;
}

export interface Skill {
  name: string;
  description: string;
  category: 'technical' | 'soft';
}

export interface Hobby {
  name: string;
  description: string;
}

export interface WorkProcess {
  step: number;
  title: string;
  details: string[];
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  location: string;
}