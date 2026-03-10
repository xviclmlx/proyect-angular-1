import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groups = signal([
    { id: 1, nombre: 'Grupo A', autor: 'Victor', nivel: '1', integrantes: 5, tickets: 10, descripcion: 'Grupo de prueba A' },
    { id: 2, nombre: 'Grupo B', autor: 'Ana', nivel: '2', integrantes: 8, tickets: 20, descripcion: 'Grupo de prueba B' },
    { id: 3, nombre: 'Grupo C', autor: 'Luis', nivel: '3', integrantes: 12, tickets: 30, descripcion: 'Grupo de prueba C' }
  ]);

  addGroup(nuevo: any) {
    this.groups.update(g => [...g, nuevo]);
  }

  editGroup(grupoEditado: any) {
    this.groups.update(g => g.map(x => x.id === grupoEditado.id ? grupoEditado : x));
  }

  deleteGroup(id: number) {
    this.groups.update(g => g.filter(x => x.id !== id));
  }

  getGroups() {
    return this.groups();
  }
}
