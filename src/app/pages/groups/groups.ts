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
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-groups',
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
  templateUrl: './groups.html',
  styleUrls: ['./groups.css']
})
export class Groups {
  showDialog: boolean = false;
  editDialog: boolean = false;

  nuevoNombre: string = '';
  nuevoAutor: string = '';
  nuevoNivel: string = '';
  nuevoIntegrantes: number = 0;
  nuevoTickets: number = 0;
  nuevoDescripcion: string = '';

  grupoEditando: any = null;

  constructor(
    private permsSvc: PermissionsService,
    public groupsSvc: GroupsService
  ) {}

  addGroup() {
    if (this.permsSvc.hasPermission('groups:add')) {
      const nuevo = {
        id: Date.now(),
        nombre: this.nuevoNombre,
        autor: this.nuevoAutor,
        nivel: this.nuevoNivel,
        integrantes: this.nuevoIntegrantes,
        tickets: this.nuevoTickets,
        descripcion: this.nuevoDescripcion
      };
      this.groupsSvc.addGroup(nuevo);
      this.resetNuevo();
      this.showDialog = false;
    } else {
      alert('No tienes permiso para agregar grupos');
    }
  }

  editGroup(group: any) {
    if (this.permsSvc.hasPermission('groups:edit')) {
      this.grupoEditando = { ...group };
      this.editDialog = true;
    } else {
      alert('No tienes permiso para editar grupos');
    }
  }

  guardarEdicion() {
    if (this.permsSvc.hasPermission('groups:edit')) {
      this.groupsSvc.editGroup(this.grupoEditando);
      this.editDialog = false;
    }
  }

  deleteGroup(group: any) {
    if (this.permsSvc.hasPermission('groups:delete')) {
      this.groupsSvc.deleteGroup(group.id);
    } else {
      alert('No tienes permiso para borrar grupos');
    }
  }

  private resetNuevo() {
    this.nuevoNombre = '';
    this.nuevoAutor = '';
    this.nuevoNivel = '';
    this.nuevoIntegrantes = 0;
    this.nuevoTickets = 0;
    this.nuevoDescripcion = '';
  }
}
