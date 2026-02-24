import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, PasswordModule, ButtonModule, FormsModule, MessageModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  login() {
    const USER = {
      email: '1234',
      password: '1234'
    };

    if (this.email === USER.email && this.password === USER.password) {
      this.errorMessage = '';
      alert('Login correcto 🎉');
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}
