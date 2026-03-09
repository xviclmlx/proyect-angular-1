import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms'; // 👉 agregado para usar [(ngModel)]
import { PermissionsService } from '../../services/permissions.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';

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
    FormsModule,              // 👉 agregado aquí
    HasPermissionDirective
  ],
  templateUrl: './groups.html',
  styleUrls: ['./groups.css']
})
export class Groups {
  showDialog: boolean = false;   // 👉 modal para crear
  editDialog: boolean = false;   // 👉 modal para editar

  // 👉 campos para nuevo grupo
  nuevoNombre: string = '';
  nuevoAutor: string = '';
  nuevoNivel: string = '';
  nuevoIntegrantes: number = 0;
  nuevoTickets: number = 0;
  nuevoDescripcion: string = '';

  // 👉 grupo en edición
  grupoEditando: any = null;

  // 👉 ahora cada grupo tiene un id único
  groups = signal([
    { id: 1, nombre: 'Grupo A', autor: 'Victor', nivel: '1', integrantes: 5, tickets: 10, descripcion: 'Grupo de prueba A' },
    { id: 2, nombre: 'Grupo B', autor: 'Ana', nivel: '2', integrantes: 8, tickets: 20, descripcion: 'Grupo de prueba B' },
    { id: 3, nombre: 'Grupo C', autor: 'Luis', nivel: '3', integrantes: 12, tickets: 30, descripcion: 'Grupo de prueba C' }
  ]);

  constructor(private permsSvc: PermissionsService) {}

  // 👉 crear grupo con todos los campos y asignar id único
  addGroup() {
    if (this.permsSvc.hasPermission('groups:add')) {
      const nuevo = { 
        id: Date.now(), // id único
        nombre: this.nuevoNombre, 
        autor: this.nuevoAutor, 
        nivel: this.nuevoNivel, 
        integrantes: this.nuevoIntegrantes, 
        tickets: this.nuevoTickets, 
        descripcion: this.nuevoDescripcion 
      };
      this.groups.update(g => [...g, nuevo]);
      this.resetNuevo();
      this.showDialog = false;
    } else {
      alert('No tienes permiso para agregar grupos');
    }
  }

  // 👉 abrir modal de edición
  editGroup(group: any) {
    if (this.permsSvc.hasPermission('groups:edit')) {
      this.grupoEditando = { ...group };
      this.editDialog = true;
    } else {
      alert('No tienes permiso para editar grupos');
    }
  }

  // 👉 guardar cambios de edición comparando por id
  guardarEdicion() {
    if (this.permsSvc.hasPermission('groups:edit')) {
      this.groups.update(g => g.map(x => 
        x.id === this.grupoEditando.id ? this.grupoEditando : x
      ));
      this.editDialog = false;
    }
  }

  // 👉 eliminar grupo comparando por id
  deleteGroup(group: any) {
    if (this.permsSvc.hasPermission('groups:delete')) {
      this.groups.update(g => g.filter(x => x.id !== group.id));
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
