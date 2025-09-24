import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  @Output() downloadPdf = new EventEmitter<void>();

  onDownloadPDF() {
    this.downloadPdf.emit();
  }
}