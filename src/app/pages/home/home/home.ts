import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SidebarComponent } from '../../../components/sidebar/sidebar'; // 👈 importa tu Sidebar

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModule, ], // 👈 agrega Sidebar aquí
  templateUrl: './home.html',
  styleUrls: ['./home.css']   // 👈 corregido: debe ser styleUrls (plural)
})
export class Home {}
