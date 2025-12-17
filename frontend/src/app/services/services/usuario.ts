import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000'; // Coloque a URL do seu backend aqui

  constructor(private http: HttpClient) {}

  // Função para fazer login
  fazerLogin(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, senha });
  }
}
