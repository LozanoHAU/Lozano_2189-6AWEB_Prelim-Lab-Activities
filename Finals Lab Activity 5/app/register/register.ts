import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

// Custom Validators
export class CustomValidators {
  // Password validator: alphanumeric, min 8 chars, must start with letter
  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const startsWithLetter = /^[a-zA-Z]/.test(value);
    const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(value);
    const minLength = value.length >= 8;

    const errors: any = {};

    if (!startsWithLetter) {
      errors.startsWithLetter = true;
    }
    if (!isAlphanumeric) {
      errors.alphanumeric = true;
    }
    if (!minLength) {
      errors.minLength = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  // Birth date validator: must be born in 2006 or earlier
  static birthYearValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const birthDate = new Date(value);
    const birthYear = birthDate.getFullYear();

    if (birthYear > 2006) {
      return { tooYoung: true };
    }

    return null;
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  readonly dialog = inject(MatDialog);

  // Form data
  fullName: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  birthDate!: Date;
  company: string = '';
  jobTitle: string = '';
  conferenceTrack: string = '';
  dietaryPreference: string = '';
  tshirtSize: string = '';
  experienceLevel: number = 3;
  specialRequirements: string = '';
  submitted = false;
  minExperience = 1;
  maxExperience = 5;
  formCompletionPercentage: number = 0;

  // Dark mode toggle
  isDarkMode = false;

  // Conference tracks
  conferenceTracks = [
    'Web Development',
    'Mobile Development',
    'Cloud & DevOps',
    'AI & Machine Learning',
    'Cybersecurity',
    'Data Science'
  ];

  // Dietary preferences
  dietaryPreferences = [
    'None',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Kosher'
  ];

  // T-shirt sizes
  tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  formdata: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, CustomValidators.passwordValidator]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]),
    birthDate: new FormControl(null, [Validators.required, CustomValidators.birthYearValidator]),
    company: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    conferenceTrack: new FormControl('', [Validators.required]),
    dietaryPreference: new FormControl('None'),
    tshirtSize: new FormControl('', [Validators.required]),
    experienceLevel: new FormControl(3),
    specialRequirements: new FormControl('')
  });

  ngOnInit() {
    // Calculate initial percentage
    this.calculateFormCompletion();

    // Subscribe to form changes to update percentage in real-time
    this.formdata.valueChanges.subscribe(() => {
      this.calculateFormCompletion();
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.applyTheme();
    }
  }

  calculateFormCompletion(): void {
    const fields = [
      { control: this.formdata.get('fullName'), isRequired: true },
      { control: this.formdata.get('email'), isRequired: true },
      { control: this.formdata.get('password'), isRequired: true },
      { control: this.formdata.get('phone'), isRequired: true },
      { control: this.formdata.get('birthDate'), isRequired: true },
      { control: this.formdata.get('company'), isRequired: true },
      { control: this.formdata.get('jobTitle'), isRequired: true },
      { control: this.formdata.get('conferenceTrack'), isRequired: true },
      { control: this.formdata.get('dietaryPreference'), isRequired: false },
      { control: this.formdata.get('tshirtSize'), isRequired: true },
      { control: this.formdata.get('experienceLevel'), isRequired: false },
      { control: this.formdata.get('specialRequirements'), isRequired: false }
    ];

    let filledFields = 0;
    const totalFields = fields.length;

    fields.forEach(field => {
      if (field.control) {
        const value = field.control.value;
        
        if (field.isRequired) {
          if (field.control.valid && value !== null && value !== '') {
            filledFields++;
          }
        } else {
          if (value !== null && value !== '' && value !== 3) {
            filledFields++;
          } else if (field.control === this.formdata.get('experienceLevel')) {
            filledFields++;
          } else if (field.control === this.formdata.get('dietaryPreference') && value === 'None') {
            filledFields++;
          }
        }
      }
    });

    this.formCompletionPercentage = Math.round((filledFields / totalFields) * 100);
  }

  onClickSubmit(data: any) {
    this.submitted = true;
    this.fullName = data.fullName;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
    this.birthDate = data.birthDate;
    this.company = data.company;
    this.jobTitle = data.jobTitle;
    this.conferenceTrack = data.conferenceTrack;
    this.dietaryPreference = data.dietaryPreference;
    this.tshirtSize = data.tshirtSize;
    this.experienceLevel = data.experienceLevel;
    this.specialRequirements = data.specialRequirements;

    if (this.formdata.valid) {
      console.log("Conference Registration Submitted!", this.formdata.value);
    } else {
      console.log('Form is not valid!');
    }
  }

  openResetDialog(): void {
    const dialogRef = this.dialog.open(ResetConfirmDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    this.formdata.reset({
      fullName: '',
      email: '',
      password: '',
      phone: '',
      birthDate: null,
      company: '',
      jobTitle: '',
      conferenceTrack: '',
      dietaryPreference: 'None',
      tshirtSize: '',
      experienceLevel: 3,
      specialRequirements: ''
    });
    this.submitted = false;
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.phone = '';
    this.company = '';
    this.jobTitle = '';
    this.conferenceTrack = '';
    this.dietaryPreference = '';
    this.tshirtSize = '';
    this.experienceLevel = 3;
    this.specialRequirements = '';
    this.calculateFormCompletion();
    console.log('Form has been reset!');
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  getPasswordErrors(): string {
    const control = this.formdata.get('password');
    if (control?.hasError('required')) {
      return 'Password is required';
    }
    if (control?.hasError('startsWithLetter')) {
      return 'Password must start with a letter';
    }
    if (control?.hasError('alphanumeric')) {
      return 'Password must contain only letters and numbers';
    }
    if (control?.hasError('minLength')) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }
}

// Reset Confirmation Dialog Component
@Component({
  selector: 'reset-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Reset Form</h2>
    <mat-dialog-content>
      <p>Are you sure you want to reset all fields? This action cannot be undone.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Reset</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      padding: 20px 0;
      
    }
    mat-dialog-actions {
      padding: 32px 32px;
      gap: 8px;
    }
  `]
})
export class ResetConfirmDialog {}