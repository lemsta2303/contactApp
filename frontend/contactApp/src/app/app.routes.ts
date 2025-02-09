import { Routes } from '@angular/router';
import {ContactComponent} from "./components/contact/contact.component";
import {ContactsListComponent} from "./components/contacts-list/contacts-list.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {AddUpdateContactComponent} from "./components/contacts-list/add-update-contact/add-update-contact.component";

export const routes: Routes = [
  {path: '', component: ContactsListComponent},
  {path: 'contact/:id', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add', component: AddUpdateContactComponent},
  {path: 'edit/:id', component: AddUpdateContactComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' } //fallback
];
