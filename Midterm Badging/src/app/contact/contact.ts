import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  formData: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  submittedData: ContactForm | null = null;
  submittedDate: Date | null = null;

  onSubmit(): void {
    this.submittedData = { ...this.formData };
    this.submittedDate = new Date();

    // Reset form after submission
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }

  resetPreview(): void {
    this.submittedData = null;
    this.submittedDate = null;
  }
}
