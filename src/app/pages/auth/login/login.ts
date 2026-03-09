import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../services/permissions.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, PasswordModule, ButtonModule, FormsModule, MessageModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private permsSvc: PermissionsService, private router: Router) {}

  login() {
    if (this.email === 'admin@gmail' && this.password === 'admin') {
      // Permisos de admin
      const adminPerms = [
        'groups:view','groups:add','groups:edit','groups:delete',
        'users:view','users:addAdmin',
        'ticket:view','ticket:add','ticket:delete'
      ];
      this.permsSvc.setPermissions(adminPerms);
      this.errorMessage = '';
      this.router.navigate(['/home']);
    } else if (this.email === 'user@gmail' && this.password === 'user') {
      // Permisos de usuario normal
      const userPerms = [
        'profile:view','profile:edit','profile:delete',
        'groups:view','ticket:view','ticket:add'
      ];
      this.permsSvc.setPermissions(userPerms);
      this.errorMessage = '';
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }

  logout() {
    this.permsSvc.clearPermissions();
    this.router.navigate(['/login']);
  }
}
