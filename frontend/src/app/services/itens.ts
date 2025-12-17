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



solicitarReserva(dados: any) {
  return this.http.post("http://localhost:3000/reservas", dados);
}

cadastrarItem(item: any) {
  return this.http.post(this.apiUrl, item);
}
// No seu ItensService
listarItemPorId(id: number | string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

// O atualizar já está correto, mas vamos garantir o tipo do ID
// No seu ItensService
atualizarItem(id: any, dados: any): Observable<any> {
  // Verifique se a URL termina com /itens/ID
  return this.http.put(`${this.apiUrl}/${id}`, dados); 
}
excluirItem(id: number | string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}


