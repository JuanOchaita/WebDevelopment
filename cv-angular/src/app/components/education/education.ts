import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Education, EducationService } from '../../services/education';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './education.html',
  styleUrls: ['./education.css']
})
export class EducationComponent implements OnInit {
  educationList: Education[] = [];
  loading = false;
  error = '';
  
  showForm = false;
  newEducation: Omit<Education, 'id'> = {
    year: '',
    institution: '',
    degree: ''
  };

  editingEducation: Education | null = null;

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation(): void {
    this.loading = true;
    this.educationService.getEducation().subscribe({
      next: (data) => {
        this.educationList = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar la educación';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.editingEducation = null;
    this.resetForm();
  }

  onSubmit(): void {
    if (this.editingEducation) {
      this.educationService.updateEducation(this.editingEducation.id, this.newEducation)
        .subscribe({
          next: (updated) => {
            const index = this.educationList.findIndex(e => e.id === this.editingEducation!.id);
            if (index !== -1) {
              this.educationList[index] = updated;
            }
            this.cancelEdit();
          },
          error: (error) => {
            this.error = 'Error al actualizar el registro';
            console.error('Error:', error);
          }
        });
    } else {
      this.educationService.createEducation(this.newEducation).subscribe({
        next: (created) => {
          this.educationList.push(created);
          this.resetForm();
          this.showForm = false;
        },
        error: (error) => {
          this.error = 'Error al crear el registro';
          console.error('Error:', error);
        }
      });
    }
  }

  editEducation(education: Education): void {
    this.editingEducation = education;
    this.newEducation = {
      year: education.year,
      institution: education.institution,
      degree: education.degree
    };
    this.showForm = true;
  }

  cancelEdit(): void {
    this.editingEducation = null;
    this.resetForm();
    this.showForm = false;
  }

  deleteEducation(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      this.educationService.deleteEducation(id).subscribe({
        next: () => {
          this.educationList = this.educationList.filter(e => e.id !== id);
        },
        error: (error) => {
          this.error = 'Error al eliminar el registro';
          console.error('Error:', error);
        }
      });
    }
  }

  private resetForm(): void {
    this.newEducation = {
      year: '',
      institution: '',
      degree: ''
    };
  }
}