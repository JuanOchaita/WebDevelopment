import { Component } from '@angular/core';
import { ContactInfo } from '../../models/cv-data.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  accordionOpen = true;
  
  contactInfo: ContactInfo = {
    email: 'juanom@ufm.edu',
    linkedin: 'https://www.linkedin.com/in/juan-ochaita-207685334',
    github: 'https://github.com/JuanOchaita',
    location: 'Guatemala City, Guatemala'
  };

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }
}