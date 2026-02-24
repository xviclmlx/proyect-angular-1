import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true, // 👈 asegúrate de que esté marcado como standalone
  imports: [RouterOutlet, ButtonModule], // 👈 aquí se importa el ButtonModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ERP');
}
