import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  getUsuario() {
    return JSON.parse(localStorage.getItem('usuario') || 'null');
  }

  estaLogado(): boolean {
    return this.getUsuario() !== null;
  }

  ehFuncionario(): boolean {
    return this.getUsuario()?.tipo === 'funcionario';
  }

  ehComunidade(): boolean {
    return this.getUsuario()?.tipo === 'comunidade';
  }

  sair() {
    localStorage.removeItem('usuario');
  }
}



