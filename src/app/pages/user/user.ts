import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PermissionsService } from '../../services/permissions.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    DialogModule,
    ConfirmDialogModule,
    HasPermissionDirective
  ],
  providers: [ConfirmationService],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserComponent {

  usuario = 'admin';
  nombre = 'Victor Manuel';
  email = 'admin@example.com';
  direccion = 'Enrique Segoviano';
  edad: number | null = 25;
  telefono = '4426088640';

  showDialog: boolean = false;
  showUpdateDialog: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private permsSvc: PermissionsService
  ) {}

  leerUsuario() {
    if (!this.permsSvc.hasPermission('profile:view')) {
      alert('No tienes permiso para ver tu perfil');
      return;
    }

    this.confirmationService.confirm({
      message: `Usuario: ${this.usuario}\nNombre: ${this.nombre}\nEmail: ${this.email}\nDirección: ${this.direccion}\nEdad: ${this.edad}\nTeléfono: ${this.telefono}`,
      header: 'Datos del Usuario',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectVisible: false
    });
  }

  guardarCambios() {
    if (!this.permsSvc.hasPermission('profile:edit')) {
      alert('No tienes permiso para editar tu perfil');
      return;
    }

    console.log('Datos actualizados:', {
      usuario: this.usuario,
      nombre: this.nombre,
      email: this.email,
      direccion: this.direccion,
      edad: this.edad,
      telefono: this.telefono
    });
    this.confirmationService.confirm({
      message: 'Datos actualizados correctamente (simulado en front)',
      header: 'Actualización',
      icon: 'pi pi-check-circle',
      acceptLabel: 'Aceptar',
      rejectVisible: false
    });
  }

  eliminarUsuario() {
    if (!this.permsSvc.hasPermission('profile:delete')) {
      alert('No tienes permiso para eliminar tu perfil');
      return;
    }

    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este usuario?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        console.log('Usuario eliminado');
      }
    });
  }
}
