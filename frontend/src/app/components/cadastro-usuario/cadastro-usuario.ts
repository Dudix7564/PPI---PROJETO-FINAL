import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cadastro-usuario.html'
})
export class CadastroUsuario {

  nome = '';
  email = '';
  senha = '';
  tipo = 'comunidade';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  cadastrar() {
    this.http.post('http://localhost:3000/usuarios', {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipo: this.tipo
    }).subscribe(() => {
      alert('Usuário cadastrado!');
      this.router.navigate(['/login']);
    });
  }
}
