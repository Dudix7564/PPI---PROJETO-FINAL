import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  constructor(private router: Router) {}

  ehFuncionario(): boolean {
  const tipo = localStorage.getItem('tipo_usuario'); // 'funcionario' ou 'comunidade'
  return tipo === 'funcionario';
}


  irParaListar() {
    this.router.navigate(['/listar-itens']);
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar-item']);
  }
}
