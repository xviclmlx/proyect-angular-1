import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  admins = signal([
    { id: 1, usuario: 'Victor', email: 'victor@correo.com' },
    { id: 2, usuario: 'Ana', email: 'ana@correo.com' }
  ]);

  addAdmin(usuario: string, email: string) {
    const nuevo = { id: Date.now(), usuario, email };
    this.admins.update(a => [...a, nuevo]);
  }

  deleteAdmin(id: number) {
    this.admins.update(a => a.filter(x => x.id !== id));
  }

  getAdmins() {
    return this.admins();
  }
}
