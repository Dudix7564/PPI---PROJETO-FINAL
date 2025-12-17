import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/services/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  fazerLogin() {
  if (!this.email || !this.senha) {
    this.erro = 'Preencha todos os campos';
    return;
  }

  this.usuarioService.fazerLogin(this.email, this.senha).subscribe({
    next: (res) => {

      console.log('Resposta do login:', res);

      // Salva o id do usuário
      localStorage.setItem('id_usuario', res.id_usuario);
      localStorage.setItem('tipo_usuario', res.tipo_usuario);

      // Salva o objeto completo do usuário

      this.router.navigate(['/listar-itens']);
    },
    error: () => {
      this.erro = 'Email ou senha incorretos';
    }
  });
}
}