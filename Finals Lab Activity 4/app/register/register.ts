import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
    MatDialogModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  readonly dialog = inject(MatDialog);

  userName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkillLevel: number = 5;
  submitted = false;
  minSkillLevel = 1;
  maxSkillLevel = 10;
  formCompletionPercentage: number = 0;

  formdata: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5)
  });

  ngOnInit() {
    this.calculateFormCompletion();
    this.formdata.valueChanges.subscribe(() => {
      this.calculateFormCompletion();
    });
  }

  calculateFormCompletion(): void {
    const fields = [
      { control: this.formdata.get('userName'), isRequired: false },
      { control: this.formdata.get('email'), isRequired: true },
      { control: this.formdata.get('password'), isRequired: true },
      { control: this.formdata.get('gender'), isRequired: true },
      { control: this.formdata.get('birthDate'), isRequired: true },
      { control: this.formdata.get('address'), isRequired: false },
      { control: this.formdata.get('angularSkillLevel'), isRequired: false }
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
          if (value !== null && value !== '' && value !== 5) {
            filledFields++;
          } else if (field.control === this.formdata.get('angularSkillLevel')) {
            filledFields++;
          }
        }
      }
    });

    this.formCompletionPercentage = Math.round((filledFields / totalFields) * 100);
  }

  onClickSubmit(data: {
    userName: string;
    email: string;
    password: string;
    gender: string;
    address: string;
    birthDate: Date;
    angularSkillLevel: number;
  }) {
    this.submitted = true;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.address = data.address;
    this.angularSkillLevel = data.angularSkillLevel;
    this.birthDate = data.birthDate;

    if (this.formdata.valid) {
      console.log("Form Submitted!", this.formdata.value);
    } else {
      console.log('Form is not valid!');
    }
  }

  openResetDialog(): void {
    const dialogRef = this.dialog.open(ResetConfirmDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    this.formdata.reset({
      userName: '',
      email: '',
      password: '',
      gender: '',
      birthDate: null,
      address: '',
      angularSkillLevel: 5
    });
    this.submitted = false;
    this.userName = '';
    this.email = '';
    this.password = '';
    this.gender = '';
    this.address = '';
    this.angularSkillLevel = 5;
    this.calculateFormCompletion();
    console.log('Form has been reset!');
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