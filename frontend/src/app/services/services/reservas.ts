import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private api = 'http://localhost:3000/reservas'; // base da API

  constructor(private http: HttpClient) {}

  // ======================================
  // SOLICITAR RESERVA (para comunidade)
  // ======================================
  solicitarReserva(id_item: number, id_usuario: number): Observable<any> {
    return this.http.post(`${this.api}`, {
      id_item,
      id_usuario
    });
  }

  // ======================================
  // LISTAR RESERVAS
  // ======================================

  // Listar todas as reservas (funcionário)
  listarTodasReservas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}`);
  }

  // Listar apenas as reservas do usuário logado (comunidade)
  listarMinhasReservas(id_usuario: number): Observable<any[]> {
    if (!id_usuario) return of([]); // retorna array vazio se não tiver id
    return this.http.get<any[]>(`${this.api}/usuario/${id_usuario}`);
  }

  // ======================================
  // ATUALIZAR STATUS (aprovado/negado) - funcionário
  // ======================================
  atualizarStatusReserva(idReserva: number, status: 'aprovado' | 'negado'): Observable<any> {
    return this.http.put(`${this.api}/${idReserva}/status`, { status });
  }
}
