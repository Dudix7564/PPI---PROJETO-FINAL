import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email: string = '';
  senha: string = '';
  erro: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  fazerLogin() {
    const body = {
      email: this.email,
      senha: this.senha
    };

    this.http.post("http://localhost:3000/login", body)
      .subscribe({
        next: (res: any) => {
          // salvar dados no localStorage
          localStorage.setItem("id_usuario", res.id_usuario);
          localStorage.setItem("nome", res.nome);
          localStorage.setItem("tipo", res.tipo);

          // redirecionar
          this.router.navigate(['/home']);
        },
        error: () => {
          this.erro = "Email ou senha incorretos";
        }
      });
  }
}
