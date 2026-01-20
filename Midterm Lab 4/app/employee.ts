import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {

  public employees: {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
}[] = [];

constructor(
  private _employeeService: Employee
) {}

ngOnInit() {
  this.employees = this._employeeService.getEmployees();
}

  getEmployees() {
  return [
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
}
}
