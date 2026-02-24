import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    MessageModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  usuario = '';
  email = '';
  password = '';
  confirmPassword = '';
  nombreCompleto = '';
  direccion = '';
  edad: number | null = null;
  telefono = '';

  errores: string[] = [];

  validar() {
    this.errores = [];

    // Usuario
    if (!this.usuario) this.errores.push('El usuario es obligatorio');

    // Email
    if (!this.email) {
      this.errores.push('El email es obligatorio');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errores.push('El email no tiene un formato válido');
    }

    // Nombre completo
    if (!this.nombreCompleto) this.errores.push('El nombre completo es obligatorio');

    // Dirección
    if (!this.direccion) this.errores.push('La dirección es obligatoria');

    // Edad
    if (!this.edad || this.edad < 18)
      this.errores.push('Debes ser mayor de edad');

    // Teléfono (solo números y exactamente 10 dígitos)
    if (!/^[0-9]{10}$/.test(this.telefono))
      this.errores.push('El teléfono debe tener exactamente 10 números');

    // Contraseña
    if (!this.password || this.password.length < 10)
      this.errores.push('La contraseña debe tener mínimo 10 caracteres');

    if (!/[!@#$%&*]/.test(this.password))
      this.errores.push('La contraseña debe incluir un símbolo especial (!@#$%&*)');

    if (this.password !== this.confirmPassword)
      this.errores.push('Las contraseñas no coinciden');

    // Si no hay errores
    if (this.errores.length === 0) {
      alert('Registro exitoso 🎉');
    }
  }
}
