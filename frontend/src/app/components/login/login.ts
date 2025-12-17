import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/services/usuario';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  // ADICIONE CommonModule e RouterModule AQUI ABAIXO
  imports: [FormsModule, CommonModule, RouterModule], 
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
    // O 'res' é exatamente esse Object que você mandou no print
    console.log('Resposta do login:', res);

    // Salvamos o objeto completo. Isso garante que o 'tipo_usuario' chegue nos outros componentes.
    localStorage.setItem('usuario', JSON.stringify(res));
    
    // Mantemos esses por compatibilidade se você já os usa
    localStorage.setItem('id_usuario', res.id_usuario.toString());
    localStorage.setItem('tipo_usuario', res.tipo_usuario);

    // Redireciona para a lista de reservas onde a mágica vai acontecer
    this.router.navigate(['/lista-reservas']);
  },
  error: () => {
    this.erro = 'Email ou senha incorretos';
  }
});
}
}