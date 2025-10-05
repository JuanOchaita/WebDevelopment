import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Arreglo de habilidades
  skills: string[] = [
    'Project manager',
    'Software projects',
    'Electronic projects',
    '3D Design'
  ];

  // Arreglo de trabajos
  jobs: string[] = [
    'Frontend Dev', 
    'Backend Dev', 
    'Fullstack Dev'
  ];

  constructor() { }

  // Métodos para obtener los datos
  getSkills(): string[] {
    return this.skills;
  }

  getJobs(): string[] {
    return this.jobs;
  }

  // Métodos para agregar nuevos elementos
  addSkill(skill: string): void {
    this.skills.push(skill);
  }

  addJob(job: string): void {
    this.jobs.push(job);
  }

  // Método para obtener ambos arreglos
  getAllData() {
    return {
      skills: this.skills,
      jobs: this.jobs
    };
  }
}