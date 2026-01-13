import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, NgFor, PercentPipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pipes-demo',
  imports: [DatePipe, UpperCasePipe, LowerCasePipe, AsyncPipe, CurrencyPipe, SlicePipe, DecimalPipe, KeyValuePipe, NgFor, PercentPipe, TitleCasePipe],

  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.css',
})
export class PipesDemo {
   presentDate = new Date();
   time$ = interval(1000).pipe(
    map(() => new Date())
    );
    price : number = 20000;
    Fruits = ["Apple", "Orange", "Grapes", "Mango", "Kiwi", "Pomegranate"];
    decimalNum1: number = 8.7489623;
    decimalNum2: number = 5.43;

    studentGrade = {
      id: 123,
      name: 'Lalic Lozano',
      course: 'ADET',
      grade: 1.0,
    }

    percentValue: number = 0.259;


    titleStr: string = "i did all of this on my own";


}
