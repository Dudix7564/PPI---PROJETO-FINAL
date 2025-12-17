import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuarioString = localStorage.getItem('usuario');

    if (!usuarioString) {
      // Se não estiver logado, vai para login
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const usuario = JSON.parse(usuarioString);

      // Qualquer usuário logado pode acessar
      if (usuario.tipo === 'funcionario' || usuario.tipo === 'comunidade') {
        return true;
      }

      // Caso o tipo seja estranho
      alert('Acesso restrito.');
      this.router.navigate(['/']);
      return false;
    } catch (e) {
      // Se houver erro ao parsear
      this.router.navigate(['/login']);
      return false;
    }
  }
}
