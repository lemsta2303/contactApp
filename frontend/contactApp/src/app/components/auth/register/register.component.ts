import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  message: string = '';

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
        ]
      ]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.message = 'Błędne hasło lub nazwa użytkownika.';
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.message = 'Rejestracja zakończona sukcesem! Możesz się teraz zalogować.';
        this.registerForm.reset();
      },
      error: (err) => {
        this.message = 'Błędne hasło lub nazwa użytkownika.';
      }
    });
  }

}
