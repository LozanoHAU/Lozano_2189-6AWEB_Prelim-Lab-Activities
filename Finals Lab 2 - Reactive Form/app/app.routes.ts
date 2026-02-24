import { Routes } from '@angular/router';
import { TemplateDemo } from './template-demo/template-demo'
import { ReactiveDemo } from './reactive-demo/reactive-demo'
import { Register } from './register/register';

export const routes: Routes = [
  {path: '', component: TemplateDemo},
  {path: 'reactivedemo', component: ReactiveDemo},
  {path: 'register', component: Register},
];
