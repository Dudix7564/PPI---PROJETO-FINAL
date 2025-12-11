import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  private apiUrl = 'http://localhost:3000/itens'; // URL do seu backend Node

  constructor(private http: HttpClient) {}

  listarItens(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
listarItemPorId(id: number) {
  return this.http.get(`http://localhost:3000/itens/${id}`);
}
buscarItemPorId(id: any) {
  return this.http.get(`http://localhost:3000/itens/${id}`);
}

solicitarReserva(dados: any) {
  return this.http.post("http://localhost:3000/reservas", dados);
}


}


