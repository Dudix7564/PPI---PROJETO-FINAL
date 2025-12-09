import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,               // 👈 OBRIGATÓRIO
  imports: [RouterOutlet],        // Permite usar <router-outlet>
  templateUrl: './app.html',
  styleUrls: ['./app.css']        // 👈 corrigido (plural)
})
export class App {
  title = 'frontend';
}
