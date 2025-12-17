import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  constructor(private router: Router) {}

  // ✅ verifica se existe usuário logado
  estaLogado(): boolean {
    return !!localStorage.getItem('id_usuario');
  }

  // ✅ verifica se usuário é funcionário
  ehFuncionario(): boolean {
    return localStorage.getItem('tipo_usuario') === 'funcionario';
  }

  // ✅ verifica se usuário é comunidade
  ehComunidade(): boolean {
    return localStorage.getItem('tipo_usuario') === 'comunidade';
  }

  // ✅ ir para login
  entrar() {
    this.router.navigate(['/login']);
  }

  // ✅ logout
  sair() {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    console.log('Usuario logado:', localStorage.getItem('usuario'));
  }
}
