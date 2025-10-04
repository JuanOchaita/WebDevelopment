import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubService, GithubRepo } from '../services/github';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agregar FormsModule
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent implements OnInit {
  repos: GithubRepo[] = [];
  filteredRepos: GithubRepo[] = [];
  loading: boolean = true;
  error: string = '';
  searchTerm: string = '';

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getRepos().subscribe({
      next: (data) => {
        this.repos = data;
        this.filteredRepos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los repositorios';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  filterRepos(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredRepos = this.repos;
      return;
    }

    this.filteredRepos = this.repos.filter(repo => {
      const matchName = repo.name.toLowerCase().includes(term);
      const matchDescription = repo.description?.toLowerCase().includes(term);
      const matchLanguage = repo.language?.toLowerCase().includes(term);
      const matchTopics = repo.topics?.some(topic => 
        topic.toLowerCase().includes(term)
      );

      return matchName || matchDescription || matchLanguage || matchTopics;
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredRepos = this.repos;
  }
}