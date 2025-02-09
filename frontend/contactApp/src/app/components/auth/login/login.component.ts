import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  message: string = '';

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login () {
    if (this.loginForm?.invalid) {
      this.message = "Wszystkie pola są wymagane";
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token); // setting token for logged in user
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = 'Dane nieprawidłowe!';
      }
    })
  }

}
