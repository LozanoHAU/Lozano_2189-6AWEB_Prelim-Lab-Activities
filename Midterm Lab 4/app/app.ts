import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-share-data');
  public employees = [
    {
      id: 101,
      firstname: 'Aaron Daniel',
      lastname: 'Lozano',
      email: 'allozano@student.hau.edu.ph',
    },
    {
      id: 102,
      firstname: 'James',
      lastname: 'Atienza',
      email: 'jatienza@hau.edu.ph',
    },
    {
      id: 103,
      firstname: 'John',
      lastname: 'Cena',
      email: 'jcena@hau.edu.ph',
    },
    {
      id: 104,
      firstname: 'Robert',
      lastname: 'Quintana',
      email: 'rquintana@hau.edu.ph',
    },
    {
      id: 105,
      firstname: 'Joseph',
      lastname: 'Dizon',
      email: 'jdizon@hau.edu.ph',
    },
];

  public products = [
  {
    id: 'P-101',
    productName: 'Logitech Mouse',
    description: '6 Button Mechanical Mouse',
    price: 899.00,
  },
  {
    id: 'P-102',
    productName: 'JBL BT Speaker',
    description: 'Waterproof Radio 360 Surround',
    price: 1099.00,
  },
  {
    id: 'P-103',
    productName: 'Mechanical KeyBoard',
    description: 'Hot-swappable RGB Backlit',
    price: 2395.00,
  },
  {
    id: 'P-104',
    productName: 'Oculus Meta',
    description: 'All-in-one Gaming Headset',
    price: 22450.00,
  },
];



}
