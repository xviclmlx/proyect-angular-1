import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
