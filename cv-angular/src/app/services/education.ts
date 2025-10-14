import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Education {
  id: number;
  year: string;
  institution: string;
  degree: string;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = 'http://localhost:3001/education';

  constructor(private http: HttpClient) { }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrl);
  }

  getEducationById(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.apiUrl}/${id}`);
  }

  createEducation(education: Omit<Education, 'id'>): Observable<Education> {
    return this.http.post<Education>(this.apiUrl, education);
  }

  updateEducation(id: number, education: Partial<Education>): Observable<Education> {
    return this.http.patch<Education>(`${this.apiUrl}/${id}`, education);
  }

  deleteEducation(id: number): Observable<Education> {
    return this.http.delete<Education>(`${this.apiUrl}/${id}`);
  }
}