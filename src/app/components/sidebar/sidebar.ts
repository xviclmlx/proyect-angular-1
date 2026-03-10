import { Component, effect } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { PermissionsService } from '../../services/permissions.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  items: MenuItem[] = [];

  constructor(private permsSvc: PermissionsService) {
    effect(() => {
      this.buildMenu();
    });
  }

  buildMenu() {
    const menu: MenuItem[] = [
      {
        label: 'General',
        icon: 'pi pi-home',
        items: [
          { label: 'Landing', icon: 'pi pi-globe', routerLink: '/landing' },
          { label: 'Home', icon: 'pi pi-home', routerLink: '/home' }
        ]
      },
      {
        label: 'User',
        icon: 'pi pi-user',
        items: []
      },
      {
        label: 'Auth',
        icon: 'pi pi-lock',
        items: [
          { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' },
          { label: 'Register', icon: 'pi pi-user-plus', routerLink: '/register' },
          { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
        ]
      }
    ];

    // Usuario normal
    if (this.permsSvc.hasPermission('profile:view')) {
      menu[1].items?.push({ label: 'Perfil', icon: 'pi pi-id-card', routerLink: '/user' });
    }
    if (this.permsSvc.hasPermission('groups:view')) {
      menu[1].items?.push({ label: 'Groups', icon: 'pi pi-users', routerLink: '/groups' });
    }

    // Admin extra
    if (this.permsSvc.hasPermission('users:addAdmin')) {
      menu[1].items?.push({ label: 'Administradores', icon: 'pi pi-shield', routerLink: '/admin' });
    }

    this.items = menu;
  }

  logout() {
    this.permsSvc.clearPermissions();
    window.location.href = '/login';  
  }
}
