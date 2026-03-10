import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { PermissionsService } from '../../services/permissions.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    FormsModule,
    HasPermissionDirective
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {
  showDialog = false;
  nuevoUsuario = '';
  nuevoEmail = '';

  constructor(
    private permsSvc: PermissionsService,
    public adminSvc: AdminService
  ) {}

  addAdmin() {
    if (this.permsSvc.hasPermission('users:addAdmin')) {
      this.adminSvc.addAdmin(this.nuevoUsuario, this.nuevoEmail);
      this.nuevoUsuario = '';
      this.nuevoEmail = '';
      this.showDialog = false;
    } else {
      alert('No tienes permiso para agregar administradores');
    }
  }

  deleteAdmin(admin: any) {
    if (this.permsSvc.hasPermission('users:deleteAdmin')) {
      this.adminSvc.deleteAdmin(admin.id);
    } else {
      alert('No tienes permiso para borrar administradores');
    }
  }
}
